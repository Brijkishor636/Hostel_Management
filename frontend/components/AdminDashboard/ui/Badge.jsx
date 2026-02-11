export default function Badge({ children, variant = "info" }) {
  const variants = {
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    error: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    info: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  };

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
