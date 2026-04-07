"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import InputField from "../../ui/InputField";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // ✅ added
import "react-toastify/dist/ReactToastify.css"; // ✅ added

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

const wardenSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
  mobNo: z.string().min(10, "Invalid mobile number"),
});

export default function CreateWardenPage() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(wardenSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      mobNo: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${url}/api/v1/admin/create-warden`,
        data,
        {
          withCredentials: true,
        }
      );

      console.log("Warden Created:", res.data);
      reset();
      toast.success("Warden account created successfully!"); // ✅ replaced
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong"); // ✅ replaced
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-2 md:p-5 lg:p-8 bg-slate-950 text-slate-100">
      <div className="w-full md:max-w-4xl lg:max-w-7xl animate-in fade-in zoom-in duration-500">
        <div className="bg-slate-900 border border-slate-800 hover:shadow-md rounded-3xl shadow-xl p-8 md:p-12">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-8">
            <h1 className="text-3xl font-extrabold text-white tracking-tight text-center md:text-left">
              New Warden
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
              <InputField
                label="Full Name"
                placeholder="e.g. Sarah Jenkins"
                {...register("name")}
                error={errors.name?.message}
              />

              <InputField
                label="Email Address"
                type="email"
                placeholder="e.g. warden.sarah@university.edu"
                {...register("email")}
                error={errors.email?.message}
              />

              <InputField
                label="Mobile Number"
                placeholder="e.g. 9876543210"
                {...register("mobNo")}
                error={errors.mobNo?.message}
              />

              <InputField
                label="Password"
                isPassword
                placeholder="••••••••"
                {...register("password")}
                error={errors.password?.message}
              />
            </div>

            <div className="mt-6 md:mt-8 pt-6 border-t border-slate-800 flex justify-center lg:justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full lg:w-auto cursor-pointer lg:min-w-[180px] rounded-xl bg-violet-600 px-6 py-3 font-bold text-white shadow-md transition-all hover:bg-violet-700 active:bg-violet-800 disabled:opacity-60 disabled:hover:bg-violet-600"
              >
                <div className="flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span>Processing...</span>
                    </>
                  ) : (
                    "Register Warden"
                  )}
                </div>
              </button>
            </div>
          </form>
        </div>

        <p className="text-center text-slate-600 text-sm mt-4 md:mt-8">
          System Access Only. Need help?{" "}
          <span className="text-violet-500 cursor-pointer hover:underline">
            Contact Support
          </span>
        </p>
      </div>

      {/* ✅ Toast container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}