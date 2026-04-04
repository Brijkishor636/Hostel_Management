"use client";
import { useState } from "react";
import Card from "../ui/Cards";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import {
  Search,
  Filter,
  MoreVertical,
  Plus,
  ShieldCheck,
  X as CloseIcon,
  Download,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const MOCK_WARDENS = [
  {
    id: "W1",
    name: "Rahul Sharma",
    email: "rahul@hostel.com",
    phone: "9876543210",
    assignedBlock: "Block A",
    status: "Active",
  },
  {
    id: "W2",
    name: "Amit Kumar",
    email: "amit@hostel.com",
    phone: "9123456780",
    assignedBlock: "Block B",
    status: "Inactive",
  },
];

const WardenManagement = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filteredWardens = MOCK_WARDENS.filter(
    (w) =>
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.assignedBlock.toLowerCase().includes(search.toLowerCase())
  );

  const clearSearch = () => setSearch("");

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] text-white p-6 space-y-10">

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-xl sm:text-3xl font-bold flex items-center gap-3">
            <ShieldCheck className="text-indigo-400 w-6 h-6 sm:w-8 sm:h-8" />
            Warden Directory
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Manage wardens, their assigned blocks, and availability.
          </p>
        </div>

        <Button
          onClick={() => router.push("/admin/wardens/create")}
          size="lg"
          className="shadow-indigo-500/20 cursor-pointer"
        >
          <Plus size={20} /> Add New Warden
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-4 p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500/20 via-purple-300/20 to-indigo-500/20">
        <div className="flex flex-col lg:flex-row items-center gap-4 w-full bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-2">

          <div className="relative flex-1 w-full group">
            <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />

            <input
              type="text"
              placeholder="Search wardens..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent border border-white/10 rounded-xl py-2 md:py-3.5 pl-10 md:pl-12 pr-10 text-sm md:text-base focus:outline-none focus:ring-1 focus:ring-indigo-500/40 placeholder:text-gray-500"
            />

            <div className="absolute inset-y-0 right-2 md:right-4 flex items-center">
              <AnimatePresence>
                {search && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={clearSearch}
                    className="p-1 hover:bg-white/10 rounded-lg text-gray-400"
                  >
                    <CloseIcon size={14} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex w-full lg:w-auto gap-2 md:gap-3">
            <button className="flex-1 md:flex-none flex items-center justify-center px-3 md:px-4 py-2 md:py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300">
              <Filter size={16} />
              <span className="hidden lg:inline ml-2">Filters</span>
            </button>

            <button className="flex-1 md:flex-none flex items-center justify-center px-3 md:px-4 py-2 md:py-3 rounded-xl bg-gradient-to-r from-indigo-400 to-gray-400 text-white">
              <Download size={16} />
              <span className="hidden lg:inline ml-2">Export CSV</span>
            </button>
          </div>
        </div>
      </div>

      <Card className="!p-0 overflow-hidden border-white/10 bg-white/5 backdrop-blur-md">

        <div className="overflow-x-auto hidden md:block">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-gray-400 text-[11px]">
              <tr>
                <th className="px-8 py-5">Warden Info</th>
                <th className="px-6 py-5">Block</th>
                <th className="px-6 py-5">Email</th>
                <th className="px-6 py-5">Phone</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-8 py-5 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {filteredWardens.map((warden) => (
                <tr key={warden.id}>
                  <td className="px-8 py-5">{warden.name}</td>
                  <td className="px-6 py-5">{warden.assignedBlock}</td>
                  <td className="px-6 py-5">{warden.email}</td>
                  <td className="px-6 py-5">{warden.phone}</td>
                  <td className="px-6 py-5">
                    <Badge variant={warden.status === "Active" ? "success" : "error"}>
                      {warden.status}
                    </Badge>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <MoreVertical size={20} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-3 p-3">
          {filteredWardens.map((warden) => (
            <div key={warden.id} className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  {warden.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">{warden.name}</p>
                  <p className="text-xs text-gray-400">#{warden.id}</p>
                </div>
              </div>

              <div className="mt-3 text-sm space-y-2">
                <p>Block: {warden.assignedBlock}</p>
                <p className="truncate">Email: {warden.email}</p>
                <p>Phone: {warden.phone}</p>
                <Badge variant={warden.status === "Active" ? "success" : "error"}>
                  {warden.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 md:px-8 py-4 md:py-5 border-t border-white/10 flex flex-col sm:flex-row lg:flex-row items-center lg:items-center justify-between gap-4 text-xs text-gray-500 bg-white/5">
          <p className="w-full text-left sm:w-auto lg:w-auto lg:flex lg:items-center lg:h-full">
            {filteredWardens.length} / {MOCK_WARDENS.length}
          </p>

          <div className="flex gap-2 w-full sm:w-auto lg:w-auto lg:items-center">
            <button className="flex-1 sm:flex-none px-4 py-2 bg-white/5 rounded-lg">
              Prev
            </button>
            <button className="flex-1 sm:flex-none px-4 py-2 bg-white/5 rounded-lg">
              Next
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WardenManagement;