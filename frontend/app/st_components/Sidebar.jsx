"use client";
import { LayoutDashboard, Bed, CreditCard, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gradient-to-b from-indigo-900 to-purple-900 text-white p-5">
      <h1 className="text-2xl font-bold mb-10">Student Panel</h1>

      <nav className="space-y-6">

        <Link href="/overview" className="flex items-center gap-3 hover:text-pink-400">
          <LayoutDashboard size={20} />
          Overview
        </Link>

        <Link href="/my_room" className="flex items-center gap-3 hover:text-pink-400">
          <Bed size={20} />
          My Room
        </Link>


        <Link href="/st_dashboard" className="flex items-center gap-3 hover:text-pink-400">
          <CreditCard size={20} />
          Payments
        </Link>


        <Link href="/st_complaints" className="flex items-center gap-3 hover:text-pink-400">
          <MessageSquare size={20} />
          Complaints
        </Link>

        <button className="bg-purple-600 px-4 py-2 rounded-lg mt-4">
          + Add Complaint
        </button>

      </nav>
    </div>
  );
}