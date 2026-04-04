"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import InputField from "../../ui/InputField"; 


const studentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
  mobNo: z.string().regex(/^[0-9+\s-]{10,}$/, "Invalid mobile number"),
  regNo: z.string().min(1, "Registration number is required"),
  roomNo: z.string().min(3, "Room number must be at least 3 characters").optional().or(z.literal("")),
});

export default function CreateStudentPage() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      mobNo: "",
      regNo: "",
      roomNo: "",
    }
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Student Created:", data);
      reset();
      alert("Student created successfully!");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Minimal Deep Velvet background
    <div className="min-h-screen w-full flex items-center justify-center p-2 md:p-5 lg:p-8 bg-slate-950 text-slate-100">
      <div className="w-full md:max-w-4xl lg:max-w-7xl animate-in fade-in zoom-in duration-500">
        
        {/* Simple minimal container */}
        <div className="bg-slate-900 border border-slate-800 hover:shadow-md rounded-3xl shadow-xl p-8 md:p-12">
          
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-8">
            
            {/* Minimal Title */}
            <h1 className="text-3xl font-extrabold text-white tracking-tight text-center md:text-left">
              New Student
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
              
              {/* Column 1 */}
              <InputField
                label="Full Name"
                placeholder="e.g. John Doe"
                {...register("name")}
                error={errors.name?.message}
              />

              <InputField
                label="Email Address"
                type="email"
                placeholder="e.g. john.doe@university.edu"
                {...register("email")}
                error={errors.email?.message}
              />

              <InputField
                label="Registration Number"
                placeholder="e.g. S1234567"
                {...register("regNo")}
                error={errors.regNo?.message}
              />

              {/* Column 2 */}
              <InputField
                label="Mobile Number"
                placeholder="e.g. +1 (555) 123-4567"
                {...register("mobNo")}
                error={errors.mobNo?.message}
              />

              {/* Password and Room No (Still in grid, responsive) */}
              <InputField
                label="Password"
                isPassword
                placeholder="••••••••"
                {...register("password")}
                error={errors.password?.message}
              />
              
              <InputField
                label="Room Number (Optional)"
                placeholder="e.g. Dorm A-204"
                {...register("roomNo")}
                error={errors.roomNo?.message}
              />
            </div>

            {/* Submit Button Area - Minimal placement */}
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
                    "Register Student"
                  )}
                </div>
              </button>
            </div>
          </form>
        </div>
        
        {/* Footer */}
        <p className="text-center text-slate-600 text-sm mt-4 md:mt-8">
          System Access Only. Need help? <span className="text-violet-500 cursor-pointer hover:underline">Contact Support</span>
        </p>
      </div>
    </div>
  );
}