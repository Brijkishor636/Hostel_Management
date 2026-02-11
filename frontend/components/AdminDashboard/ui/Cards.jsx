"use client";
import { motion } from "framer-motion";

export default function Card({ children, className = "", onClick = undefined }) {
  return (
    <motion.div
      whileHover={onClick ? { y: -4, scale: 1.01 } : {}}
      onClick={onClick}
      className={`glass-card rounded-2xl p-6 shadow-xl transition-all ${className} ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      {children}
    </motion.div>
  );
}
