"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import Button from "../../ui/Button";
import { toast } from "react-toastify";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function CreateNoticePage() {
  const router = useRouter();
  const pathname = usePathname();
  const role = pathname.split("/")[1];

  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "GENERAL",
    expiresAt: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(
        `${url}/api/v1/${role}/notices`,
        form,
        { withCredentials: true }
      );
      toast.success("Notice created successfully");
      router.push(`/${role}/notices`);
    } catch (e) {
      console.error(e);
      toast.error("Failed to create notice");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] text-white p-4 sm:p-6">

      <div className="max-w-2xl mx-auto space-y-6">

        {/* BACK BUTTON */}
        <div className="flex items-center">
          <Button
            size="sm"
            className="bg-indigo-300 hover:bg-indigo-700 text-white"
            onClick={() => router.back()}
          >
            ← Back
          </Button>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold">
          Create New Notice
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 space-y-5"
        >

          <div>
            <label className="text-sm text-gray-300">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="Enter notice title"
              className="w-full mt-1 bg-[#020617]/80 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500/40"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Enter notice description"
              className="w-full mt-1 bg-[#020617]/80 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500/40"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full mt-1 bg-[#020617]/80 border border-white/10 rounded-lg px-4 py-2 text-sm"
            >
              <option value="GENERAL">General</option>
              <option value="URGENT">Urgent</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-300">
              Expiry Date (optional)
            </label>
            <input
              type="date"
              name="expiresAt"
              value={form.expiresAt}
              onChange={handleChange}
              className="w-full mt-1 bg-[#020617]/80 border border-white/10 rounded-lg px-4 py-2 text-sm"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => router.back()}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              size="sm"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Notice"}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}