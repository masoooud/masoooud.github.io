export default function SectionHeading({ id, children, className = '' }) {
  return (
    <div className={`mb-10 ${className}`}>
      <h2
        id={id}
        className="text-3xl font-bold text-slate-800 dark:text-slate-100 inline-block"
      >
        {children}
      </h2>
      <span
        aria-hidden="true"
        className="block mt-2 h-1 w-16 rounded-full bg-accent dark:bg-accent-dark"
      />
    </div>
  );
}
