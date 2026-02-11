"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/components/constants";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const sidebarContent = (
    <>
      <div className="text-right px-4 py-4 border-b border-white/10">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-white/10 text-gray-300 transition"
        >
          {collapsed ? (
            <ChevronRight size={18} />
          ) : (
            <ChevronLeft size={18} />
          )}
        </button>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const href =
            item.id === "dashboard" ? "/admin" : `/admin/${item.id}`;

          let isActive = false;
          if (item.id === "dashboard") {
            isActive = pathname === "/admin";
          } else {
            isActive = pathname.startsWith(href);
          }

          return (
            <Link
              key={item.id}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`
                flex items-center gap-3 px-3 py-3 rounded-xl
                transition-all duration-300 group
                ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500/10 to-purple-600/10 text-white shadow-[0_0_8px_rgba(99,102,241,0.35)]"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }
              `}
            >
              <span className="text-lg group-hover:scale-110 transition">
                {item.icon}
              </span>

              {!collapsed && (
                <span className="font-medium whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </>
  );

  return (
    <>
      <aside
        className={`
          hidden lg:flex flex-col
          backdrop-blur-md
          border-r border-white/10
          transition-all duration-300
          ${collapsed ? "w-20" : "w-64"}
        `}
        style={{
          background:
            "linear-gradient(180deg, #020617 0%, #0f172a 40%, #1e1b4b 100%)",
        }}
      >
        {sidebarContent}
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />

            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="fixed inset-y-0 left-0 w-64 border-r border-white/10 z-50 flex flex-col backdrop-blur-md"
              style={{
                background:
                  "linear-gradient(180deg, #020617 0%, #0f172a 40%, #1e1b4b 100%)",
              }}
            >
              <div className="flex justify-end p-4">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={22} />
                </button>
              </div>

              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
