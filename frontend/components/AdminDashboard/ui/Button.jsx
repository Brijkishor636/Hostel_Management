"use client";
import { motion } from "framer-motion";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  ...props
}) {
  const variants = {
    primary:
      "bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-900/20",
    secondary:
      "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700",
    danger:
      "bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-900/20",
    ghost: "bg-transparent hover:bg-slate-800 text-slate-400",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }} onClick={onClick}
      className={`rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
        variants[variant]
      } ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
