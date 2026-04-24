"use client";
import { useState, useEffect } from "react";
import Card from "../ui/Cards";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import {
  Search,
  Filter,
  Plus,
  ShieldCheck,
  X as CloseIcon,
  Download,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import axios from "axios";

const WardenManagement = () => {
  const [search, setSearch] = useState("");
  const [wardens, setWardens] = useState([]);

  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const role = "admin";

  useEffect(() => {
    async function fetchWardens() {
      try {
        const res = await axios.get(`${url}/api/v1/${role}/wardens`, {
          withCredentials: true,
        });
        setWardens(res?.data || []);
      } catch (error) {
        console.error("Error fetching wardens:", error);
      }
    }
    fetchWardens();
  }, [url, role]);

  const filteredWardens = wardens.filter((warden) =>
    warden.name.toLowerCase().includes(search.toLowerCase())
  );

  const clearSearch = () => setSearch("");

  const deleteWarden = async (id) => {
    try {
      await axios.delete(
        `${url}/api/v1/${role}/warden/${id}`,
        { withCredentials: true }
      );
      setWardens((prev) => prev.filter((w) => w.id !== id));
    } catch (err) {
      console.error("Error deleting warden", err);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] text-white p-6 space-y-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-xl sm:text-3xl font-bold flex items-center gap-3">
            <ShieldCheck className="text-indigo-400 w-6 h-6 sm:w-8 sm:h-8" />
            Warden Directory
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Manage wardens and their availability.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <Button
            onClick={() => router.push(`/admin/wardens/inactive-wardens`)}
            className="cursor-pointer"
          >
            Inactive Wardens
          </Button>

          <Button
            onClick={() => router.push(`/admin/wardens/create`)}
            size="lg"
            className="shadow-indigo-500/20 cursor-pointer"
          >
            <Plus size={20} /> Add New Warden
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col lg:flex-row items-center gap-4 p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500/20 via-purple-300/20 to-indigo-500/20">
        <div className="flex flex-col lg:flex-row items-center gap-4 w-full bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-2">

          <div className="relative flex-1 w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />

            <input
              type="text"
              placeholder="Search wardens..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent border border-white/10 rounded-xl py-3 pl-10 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500/40 placeholder:text-gray-500"
            />

            <div className="absolute inset-y-0 right-2 flex items-center">
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

          <div className="flex w-full lg:w-auto gap-2">
            <button className="flex items-center justify-center px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300">
              <Filter size={16} />
            </button>

            <button className="flex items-center justify-center px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-400 to-gray-400 text-white">
              <Download size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <Card className="!p-0 overflow-hidden border-white/10 bg-white/5 backdrop-blur-md">

        {/* Desktop */}
        <div className="overflow-x-auto hidden md:block">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-gray-400 text-[11px]">
              <tr>
                <th className="px-8 py-5">Warden Info</th>
                <th className="px-6 py-5">Email</th>
                <th className="px-6 py-5">Phone</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-8 py-5 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {filteredWardens.map((warden) => (
                <tr
                  key={warden.id}
                  onClick={() => router.push(`/admin/wardens/${warden.id}`)}
                  className="cursor-pointer hover:bg-white/5 transition"
                >
                  <td className="px-8 py-5">{warden.name}</td>
                  <td className="px-6 py-5">{warden.email}</td>
                  <td className="px-6 py-5">{warden.mobNo}</td>
                  <td className="px-6 py-5">
                    <Badge variant={warden.isActive ? "success" : "destructive"}>
                      {warden.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </td>

                  <td className="px-8 py-5 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteWarden(warden.id);
                      }}
                      className="px-3 py-1 rounded-lg text-xs bg-red-500/20 text-red-400 hover:bg-red-500/30 cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="md:hidden space-y-3 p-3">
          {filteredWardens.map((warden) => (
            <div
              key={warden.id}
              onClick={() => router.push(`/admin/wardens/${warden.id}`)}
              className="p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/5"
            >
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
                <p className="truncate">Email: {warden.email}</p>
                <p>Phone: {warden.mobNo}</p>

                <Badge variant={warden.isActive ? "success" : "destructive"}>
                  {warden.isActive ? "Active" : "Inactive"}
                </Badge>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteWarden(warden.id);
                  }}
                  className="mt-2 px-3 py-1 rounded-lg text-xs bg-red-500/20 text-red-400 hover:bg-red-500/30 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-white/10 flex justify-between text-xs text-gray-500 bg-white/5">
          <p>
            {filteredWardens.length} / {wardens.length}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default WardenManagement;