"use client";
import React, { useState } from "react";
import Button from "../ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { usePathname } from "next/navigation";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function AddChargeModal({ open, onClose, studentId, onSuccess }) {
  const pathname = usePathname();
  const role = pathname.split("/")[1];

  const [form, setForm] = useState({
    type: "MESS",
    baseAmount: "",
    frequency: 1,
  });

  const handleAdd = async () => {
    if (!form.baseAmount) return;

    try {
      const res1 = await axios.post(
        `${url}/api/v1/${role}/charge`,
        {
          chargeTypeId: form.type,
          baseAmount: Number(form.baseAmount),
          frequency: "CUSTOM",
          interval: form.frequency,
        },
        { withCredentials: true }
      );

      const charge = res1.data;

      await axios.post(
        `${url}/api/v1/${role}/invoice`,
        {
          studentId,
          chargeId: charge.id,
        },
        { withCredentials: true }
      );

      onSuccess();
      onClose();
      setForm({ type: "MESS", baseAmount: "", frequency: 1 });

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
          <motion.div className="bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] p-6 rounded-2xl w-full max-w-md space-y-5 border border-white/10">

            <h3 className="text-lg font-semibold text-white">Add Charge</h3>

            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full p-3 rounded-lg bg-[#020617] border border-white/10 text-gray-200"
            >
              <option value="MESS">Mess</option>
              <option value="MAINTENANCE">Maintenance</option>
              <option value="FINE">Fine</option>
            </select>

            <input
              type="number"
              placeholder="Base Amount"
              value={form.baseAmount}
              onChange={(e) =>
                setForm({ ...form, baseAmount: e.target.value })
              }
              className="w-full p-3 rounded-lg bg-[#020617] border border-white/10 text-gray-200"
            />

            <select
              value={form.frequency}
              onChange={(e) =>
                setForm({ ...form, frequency: Number(e.target.value) })
              }
              className="w-full p-3 rounded-lg bg-[#020617] border border-white/10 text-gray-200"
            >
              <option value={12}>Monthly</option>
              <option value={4}>Quarterly</option>
              <option value={2}>Half-Yearly</option>
              <option value={1}>Yearly</option>
            </select>

            <p className="text-sm text-gray-400">
              Total: ₹{(form.baseAmount || 0) * form.frequency}
            </p>

            <div className="flex gap-3">
              <Button onClick={handleAdd} className="w-full bg-indigo-600">
                Add
              </Button>
              <Button onClick={onClose} className="w-full bg-white/10">
                Cancel
              </Button>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}