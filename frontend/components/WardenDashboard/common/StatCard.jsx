"use client";
import React from "react";
import Card from "../../AdminDashboard/ui/Cards";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const colorMap = {
  violet: "bg-violet-500/10 text-violet-400",
  blue: "bg-blue-500/10 text-blue-400",
  emerald: "bg-emerald-500/10 text-emerald-400",
  rose: "bg-rose-500/10 text-rose-400",
};

const StatCard = ({ title, value, icon, trend, color, link }) => (
  <Link href={link}>
    <Card className="flex flex-col gap-4 cursor-pointer bg-white/5 backdrop-blur-md border border-white/10 hover:shadow-[0_0_25px_rgba(99,102,241,0.25)] transition duration-300">
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-xl ${colorMap[color]}`}>
          {icon}
        </div>
        <div className="flex items-center gap-1 text-emerald-400 text-sm font-medium">
          {trend} <ArrowUpRight size={14} />
        </div>
      </div>

      <div>
        <p className="text-gray-400 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold mt-1 text-white">{value}</h3>
      </div>
    </Card>
  </Link>
);

export default StatCard;