import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/* ── Node definitions ───────────────────────────────────────── */
// Layout: left→right mirrors the request journey:
//   Clients → Edge (CDN/LB) → Gateway → Auth/Service → Data/Workers
const NODES = [
  { id: 'client',  label: 'CLIENT',      rx: 0.08, ry: 0.22 },
  { id: 'mobile',  label: 'MOBILE',      rx: 0.08, ry: 0.56 },
  { id: 'cdn',     label: 'CDN',         rx: 0.26, ry: 0.08 },
  { id: 'lb',      label: 'LOAD BAL.',   rx: 0.26, ry: 0.40 },
  { id: 'gateway', label: 'API GATEWAY', rx: 0.46, ry: 0.26 },
  { id: 'auth',    label: 'AUTH',        rx: 0.46, ry: 0.58 },
  { id: 'service', label: 'SERVICE',     rx: 0.64, ry: 0.18 },
  { id: 'db',      label: 'DATABASE',    rx: 0.84, ry: 0.20 },
  { id: 'cache',   label: 'CACHE',       rx: 0.84, ry: 0.42 },
  { id: 'queue',   label: 'MSG QUEUE',   rx: 0.64, ry: 0.60 },
  { id: 'worker',  label: 'WORKER',      rx: 0.74, ry: 0.80 },
  { id: 'storage', label: 'STORAGE',     rx: 0.84, ry: 0.64 },
];

const EDGES = [
  ['client',  'cdn'],
  ['client',  'lb'],
  ['mobile',  'cdn'],
  ['mobile',  'lb'],
  ['cdn',     'gateway'],
  ['lb',      'gateway'],
  ['lb',      'auth'],
  ['gateway', 'auth'],
  ['gateway', 'service'],
  ['auth',    'service'],
  ['service', 'db'],
  ['service', 'cache'],
  ['service', 'queue'],
  ['service', 'storage'],
  ['queue',   'worker'],
  ['worker',  'db'],
];

/* ── Per-edge traffic config (realistic load distribution) ─── */
// Requests are dense at the client and thin out toward the database.
// speed = [min, max] progress-per-frame at 60 fps.
const EDGE_CONFIG = {
  'client→cdn':      { count: 5, speed: [0.0032, 0.0055] }, // browser static assets
  'client→lb':       { count: 7, speed: [0.0028, 0.0048] }, // browser API traffic
  'mobile→cdn':      { count: 4, speed: [0.0030, 0.0052] }, // mobile static assets
  'mobile→lb':       { count: 6, speed: [0.0025, 0.0045] }, // mobile API traffic
  'cdn→gateway':     { count: 3, speed: [0.0030, 0.0050] }, // CDN misses → origin
  'lb→gateway':      { count: 5, speed: [0.0025, 0.0042] }, // LB routes to gateway
  'lb→auth':         { count: 3, speed: [0.0022, 0.0040] }, // pre-auth check via LB
  'gateway→auth':    { count: 4, speed: [0.0020, 0.0038] }, // every request validates token
  'gateway→service': { count: 3, speed: [0.0022, 0.0040] }, // public/passthrough routes
  'auth→service':    { count: 4, speed: [0.0020, 0.0038] }, // auth'd requests reach service
  'service→db':      { count: 2, speed: [0.0010, 0.0022] }, // cache-miss only hits DB
  'service→cache':   { count: 3, speed: [0.0032, 0.0050] }, // write-through updates
  'service→queue':   { count: 2, speed: [0.0012, 0.0025] }, // async jobs enqueued
  'service→storage': { count: 1, speed: [0.0008, 0.0018] }, // blob/file uploads
  'queue→worker':    { count: 2, speed: [0.0015, 0.0025] }, // worker polls queue
  'worker→db':       { count: 1, speed: [0.0010, 0.0020] }, // worker persists results
};

/* ── Per-node health stats ──────────────────────────────────── */
const NODE_STATS = {
  mobile: {
    status: '200 OK',
    healthy: true,
    rows: [
      { label: 'Active Users', value: '14.2k' },
      { label: 'Avg Latency', value: '189ms'  },
      { label: 'OS Split',    value: '58% iOS' },
      { label: 'Error Rate',  value: '0.31%'  },
    ],
  },
  lb: {
    status: '200 OK',
    healthy: true,
    rows: [
      { label: 'Active Conn', value: '22.1k' },
      { label: 'Req/s',       value: '18.3k' },
      { label: 'Healthy',     value: '4 / 4' },
      { label: 'p99 Latency', value: '6ms'   },
    ],
  },
  auth: {
    status: '200 OK',
    healthy: true,
    rows: [
      { label: 'Token/s',     value: '9.4k'  },
      { label: 'Cache Hit',   value: '91.2%' },
      { label: 'p95 Latency', value: '12ms'  },
      { label: 'Error Rate',  value: '0.04%' },
    ],
  },
  worker: {
    status: '200 OK',
    healthy: true,
    rows: [
      { label: 'Jobs/s',      value: '840'   },
      { label: 'Avg Duration',value: '210ms' },
      { label: 'Replicas',    value: '6'     },
      { label: 'Fail Rate',   value: '0.12%' },
    ],
  },
  storage: {
    status: '200 OK',
    healthy: true,
    rows: [
      { label: 'Used',        value: '14.8 TB'},
      { label: 'Ops/s',       value: '1.2k'  },
      { label: 'Throughput',  value: '340MB/s'},
      { label: 'Durability',  value: '11 9s'  },
    ],
  },
  client: {
    status: '200 OK',
    healthy: true,
    rows: [
      { label: 'Avg Load',   value: '142ms' },
      { label: 'Sessions',   value: '8.4k'  },
      { label: 'Uptime',     value: '99.7%' },
      { label: 'Error Rate', value: '0.20%' },
    ],
  },
  cdn: {
    status: '200 OK',
    healthy: true,
    rows: [
      { label: 'Cache Hit',  value: '94.1%' },
      { label: 'Served',     value: '48 TB' },
      { label: 'Bandwidth',  value: '2.1Gb/s' },
      { label: 'Error Rate', value: '0.01%' },
    ],
  },
  gateway: {
    status: '200 OK',
    healthy: true,
    rows: [
      { label: 'Req/s',      value: '12.4k' },
      { label: 'p95 Latency',value: '48ms'  },
      { label: 'Uptime',     value: '99.9%' },
      { label: 'Error Rate', value: '0.01%' },
    ],
  },
  service: {
    status: '200 OK',
    healthy: true,
    rows: [
      { label: 'CPU',        value: '34%'   },
      { label: 'Memory',     value: '1.2 GB'},
      { label: 'Req/s',      value: '9.8k'  },
      { label: 'Error Rate', value: '0.03%' },
    ],
  },
  db: {
    status: '200 OK',
    healthy: true,
    rows: [
      { label: 'Queries/s',  value: '4.2k'  },
      { label: 'Avg Query',  value: '3ms'   },
      { label: 'Connections',value: '120'   },
      { label: 'Pool Usage', value: '61%'   },
    ],
  },
  cache: {
    status: '200 OK',
    healthy: true,
    rows: [
      { label: 'Hit Rate',   value: '89%'   },
      { label: 'Mem Used',   value: '2.1 GB'},
      { label: 'Ops/s',      value: '28.6k' },
      { label: 'Evictions',  value: '0/s'   },
    ],
  },
  queue: {
    status: '200 OK',
    healthy: true,
    rows: [
      { label: 'Msg/s',      value: '3.1k'  },
      { label: 'Queue Depth',value: '204'   },
      { label: 'Consumers',  value: '8'     },
      { label: 'Ack Rate',   value: '99.9%' },
    ],
  },
};

/* ── Tooltip card ───────────────────────────────────────────── */
function NodeTooltip({ nodeId, anchorPct }) {
  const stats = NODE_STATS[nodeId];
  const node  = NODES.find(n => n.id === nodeId);
  if (!stats || !node) return null;

  // Flip tooltip to left side when anchor is in the right 40% of screen
  const flipX = anchorPct.rx > 0.60;
  // Flip tooltip above when anchor is in bottom 35% of screen
  const flipY = anchorPct.ry > 0.65;

  return (
    <motion.div
      key={nodeId}
      initial={{ opacity: 0, scale: 0.88, y: flipY ? 6 : -6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.88, y: flipY ? 6 : -6 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="absolute z-20 pointer-events-none"
      style={{
        left:      `${anchorPct.rx * 100}%`,
        top:       `${anchorPct.ry * 100}%`,
        transform: `translate(${flipX ? 'calc(-100% - 16px)' : '16px'}, ${flipY ? 'calc(-100% - 16px)' : '16px'})`,
        minWidth:  '196px',
      }}
    >
      {/* Card */}
      <div
        className="rounded-xl border border-emerald-500/25
          bg-slate-900/90 dark:bg-navy-950/92
          backdrop-blur-md shadow-2xl overflow-hidden"
        style={{ boxShadow: '0 0 0 1px rgba(16,185,129,0.10), 0 16px 40px rgba(0,0,0,0.55)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-emerald-500/15">
          <span className="font-mono text-[11px] text-slate-400 tracking-widest uppercase">
            {node.label}
          </span>
          {/* Status badge */}
          <motion.div
            className="flex items-center gap-1.5 px-2 py-0.5 rounded-full
              border border-emerald-500/30 bg-emerald-500/10"
            animate={{ opacity: [0.80, 1, 0.80] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"
              style={{ boxShadow: '0 0 6px 2px rgba(52,211,153,0.70)' }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.3, repeat: Infinity }}
            />
            <span className="font-mono text-[10px] text-emerald-400 font-semibold leading-none">
              {stats.status}
            </span>
          </motion.div>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 gap-px bg-emerald-500/8 p-px m-2 rounded-lg overflow-hidden">
          {stats.rows.map(row => (
            <div
              key={row.label}
              className="bg-slate-900/80 dark:bg-navy-950/80 px-2.5 py-2"
            >
              <div className="font-mono text-[9px] text-slate-500 uppercase tracking-widest leading-none mb-1">
                {row.label}
              </div>
              <div className="font-mono text-[14px] font-bold text-emerald-400 leading-none">
                {row.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main component ─────────────────────────────────────────── */
export default function DataFlowBg({ mousePosRef }) {
  const canvasRef      = useRef(null);
  const containerRef   = useRef(null);
  const prefersReduced = useReducedMotion();
  const [hoveredId, setHoveredId]       = useState(null);
  const [anchorPct, setAnchorPct]       = useState({ rx: 0, ry: 0 });

  /* ── Hover detection on the container ─────────────────────── */
  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const rx = (e.clientX - rect.left) / rect.width;
    const ry = (e.clientY - rect.top)  / rect.height;

    let closest = null;
    let closestPx = Infinity;
    for (const node of NODES) {
      const dx = (node.rx - rx) * rect.width;
      const dy = (node.ry - ry) * rect.height;
      const d  = Math.hypot(dx, dy);
      if (d < 30 && d < closestPx) { closestPx = d; closest = node; }
    }

    const newId = closest?.id ?? null;
    if (newId !== hoveredId) {
      setHoveredId(newId);
      if (closest) setAnchorPct({ rx: closest.rx, ry: closest.ry });
    }
  }, [hoveredId]);

  const handleMouseLeave = useCallback(() => setHoveredId(null), []);

  /* ── Canvas animation ──────────────────────────────────────── */
  useEffect(() => {
    if (prefersReduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    function resize() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function nodePos(id) {
      const n = NODES.find(x => x.id === id);
      return { x: n.rx * canvas.width, y: n.ry * canvas.height };
    }

    function spawnParticles() {
      particles = [];
      for (const [from, to] of EDGES) {
        const key = `${from}\u2192${to}`;
        const cfg = EDGE_CONFIG[key] ?? { count: 2, speed: [0.0018, 0.0036] };
        const [sMin, sMax] = cfg.speed;
        for (let k = 0; k < cfg.count; k++) {
          particles.push({
            edge:  [from, to],
            t:     Math.random(),           // stagger along the edge on spawn
            speed: sMin + Math.random() * (sMax - sMin),
          });
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mousePosRef?.current;
      const pulse = mouse ? 1.6 : 1;

      /* edges */
      for (const [from, to] of EDGES) {
        const a = nodePos(from);
        const b = nodePos(to);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = 'rgba(16,185,129,0.10)';
        ctx.lineWidth   = 1;
        ctx.stroke();
      }

      /* particles */
      for (const p of particles) {
        const a  = nodePos(p.edge[0]);
        const b  = nodePos(p.edge[1]);
        const px = a.x + (b.x - a.x) * p.t;
        const py = a.y + (b.y - a.y) * p.t;

        // Fade in over first 12 % of the edge, fade out over last 18 %
        const opacity = p.t < 0.12
          ? p.t / 0.12
          : p.t > 0.82
            ? (1 - p.t) / 0.18
            : 1;

        // Comet trail — gradient line from a point 8 % behind the dot
        const trailT = Math.max(0, p.t - 0.08);
        const tx = a.x + (b.x - a.x) * trailT;
        const ty = a.y + (b.y - a.y) * trailT;
        const trailGrad = ctx.createLinearGradient(tx, ty, px, py);
        trailGrad.addColorStop(0, 'rgba(52,211,153,0)');
        trailGrad.addColorStop(1, `rgba(52,211,153,${(0.50 * opacity).toFixed(2)})`);
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(px, py);
        ctx.strokeStyle = trailGrad;
        ctx.lineWidth   = 1.5;
        ctx.stroke();

        // Soft glow halo
        const g = ctx.createRadialGradient(px, py, 0, px, py, 7);
        g.addColorStop(0, `rgba(52,211,153,${(0.90 * opacity).toFixed(2)})`);
        g.addColorStop(1, 'rgba(52,211,153,0)');
        ctx.beginPath(); ctx.arc(px, py, 7, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();

        // Bright core
        ctx.beginPath(); ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(52,211,153,${opacity.toFixed(2)})`; ctx.fill();

        p.t += p.speed * pulse;
        if (p.t > 1) p.t = 0;
      }

      /* nodes */
      for (const node of NODES) {
        const nx = node.rx * canvas.width;
        const ny = node.ry * canvas.height;

        let proximity = 0;
        if (mouse) {
          proximity = Math.max(0, 1 - Math.hypot(nx - mouse.x, ny - mouse.y) / 180);
        }

        // extra pulse when this node is hovered
        const isHovered = node.id === (mousePosRef?._hoveredId ?? null);

        const glowR = 22 + proximity * 22;
        const glow  = ctx.createRadialGradient(nx, ny, 0, nx, ny, glowR);
        glow.addColorStop(0, `rgba(16,185,129,${0.14 + proximity * 0.28})`);
        glow.addColorStop(1, 'rgba(16,185,129,0)');
        ctx.beginPath(); ctx.arc(nx, ny, glowR, 0, Math.PI * 2);
        ctx.fillStyle = glow; ctx.fill();

        const nodeR = isHovered ? 8 : 6;
        ctx.beginPath(); ctx.arc(nx, ny, nodeR, 0, Math.PI * 2);
        ctx.fillStyle   = `rgba(16,185,129,${0.45 + proximity * 0.55})`;
        ctx.strokeStyle = `rgba(52,211,153,${0.55 + proximity * 0.45})`;
        ctx.lineWidth   = 1.5; ctx.fill(); ctx.stroke();

        ctx.fillStyle = `rgba(148,163,184,${0.45 + proximity * 0.40})`;
        ctx.font      = '9px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, nx, ny + 20);
      }

      animId = requestAnimationFrame(draw);
    }

    resize(); spawnParticles(); draw();
    const ro = new ResizeObserver(() => { resize(); spawnParticles(); });
    ro.observe(canvas);
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, [prefersReduced, mousePosRef]);

  if (prefersReduced) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      <AnimatePresence>
        {hoveredId && (
          <NodeTooltip
            key={hoveredId}
            nodeId={hoveredId}
            anchorPct={anchorPct}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
