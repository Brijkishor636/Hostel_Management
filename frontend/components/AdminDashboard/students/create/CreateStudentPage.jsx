"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import InputField from "../../ui/InputField";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import Button from "../../ui/Button";

export default function CreateStudentPage() {
  const [isLoading, setIsLoading] = useState(false);

  const pathname = usePathname();
  const role = pathname.split("/")[1];
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      mobNo: "",
      regNo: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_URL;

      const res = await fetch(
        `${url}/api/v1/${role}/create-student`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.msg || "Failed");
      }

      reset();
      toast.success("Student created successfully..", {
        position: "top-center",
      });

    } catch (error) {
      console.error(error);
      toast.error(error.message || "error during creating!!", {
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-2 md:p-5 lg:p-8 bg-slate-950 text-slate-100">
      <div className="w-full md:max-w-4xl lg:max-w-7xl animate-in fade-in zoom-in duration-500">
        <div className="flex justify-between items-center mb-6">
              <Button size="sm" className="bg-indigo-300 hover:bg-indigo-700 text-white" onClick={() => router.back()}>
                ← Back
              </Button>
          </div>
        <div className="bg-slate-900 border border-slate-800 hover:shadow-md rounded-3xl shadow-xl p-8 md:p-12">
          
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-8">
            
            <h1 className="text-3xl font-extrabold text-white tracking-tight text-center md:text-left">
              New Student
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
              
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

              <InputField
                label="Mobile Number"
                placeholder="e.g. +1 (555) 123-4567"
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
                className="w-full lg:w-auto cursor-pointer lg:min-w-[180px] rounded-xl bg-violet-600 px-6 py-3 font-bold text-white shadow-md transition-all hover:bg-violet-700 active:bg-violet-800 disabled:opacity-60"
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

        <p className="text-center text-slate-600 text-sm mt-4 md:mt-8">
          System Access Only. Need help?{" "}
          <span className="text-violet-500 cursor-pointer hover:underline">
            Contact Support
          </span>
        </p>
      </div>
    </div>
  );
}