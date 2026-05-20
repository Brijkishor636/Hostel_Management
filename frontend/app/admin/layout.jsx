"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../../components/AdminDashboard/layout/Sidebar";
import Navbar from "../../components/AdminDashboard/layout/Navbar";
import ChatBot from "../../components/ChatBot";

export default function AdminLayout({ children }) {
 const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="relative flex w-full flex-1 text-white">

      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        baseRoute={"/admin"}
      />

      <main className="flex flex-1 flex-col">

        <Navbar setMobileOpen={setMobileOpen} title={"Admin Panel"}/>

        <div className="flex-1 w-full">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {children}
          </motion.div>
        </div>
          <ChatBot/>
      </main>
    </div>
  );
}
