import { useEffect, useRef, useState } from 'react';

export function useScrollSpy(sectionIds, options = {}) {
  const [activeId, setActiveId] = useState(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (frameRef.current) cancelAnimationFrame(frameRef.current);
        frameRef.current = requestAnimationFrame(() => {
          // Find the entry closest to the top of the viewport that is intersecting
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          if (visible.length > 0) {
            setActiveId(visible[0].target.id);
          }
        });
      },
      {
        rootMargin: options.rootMargin ?? '-20% 0px -60% 0px',
        threshold: options.threshold ?? 0,
        ...options,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [sectionIds, options.rootMargin, options.threshold]);

  return activeId;
}
