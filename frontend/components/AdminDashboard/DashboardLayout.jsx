"use client";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#020617] text-white overflow-hidden">

      <Sidebar />

      <div className="flex-1 flex flex-col relative overflow-hidden">

        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-600/20 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-purple-600/20 blur-3xl rounded-full"></div>

        <Topbar />

        <main className="p-6 overflow-y-auto relative z-10">
          {children}
        </main>

      </div>
    </div>
  );
}
