"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Loader2, Plus, Trash2 } from "lucide-react";
import InputField from "../../ui/InputField";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";

export default function CreateRoomPage() {
  const [isLoading, setIsLoading] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const role = pathname.split("/")[1];

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      rooms: [{ roomNo: "", capacity: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "rooms",
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_URL;

      const formattedData = {
        rooms: data.rooms.map((r) => ({
          roomNo: r.roomNo,
          capacity: Number(r.capacity),
        })),
      };

      const res = await fetch(`${url}/api/v1/${role}/rooms/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formattedData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.msg || "Failed");
      }

      reset();
      toast.success("Rooms created successfully");

    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error creating rooms");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6 text-white">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">

        <div className="mb-4">
          <button
            onClick={() => router.back()}
            className="px-3 py-1 bg-violet-600 hover:bg-violet-700 rounded-lg text-sm"
          >
            ← Back
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          
          <h1 className="text-2xl font-bold text-center">Create Rooms</h1>

          <div className="flex flex-col gap-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-3">

                <InputField
                  label={`Room ${index + 1}`}
                  placeholder="Room Number (e.g. 101)"
                  {...register(`rooms.${index}.roomNo`, {
                    required: "Room number is required",
                    minLength: {
                      value: 3,
                      message: "Minimum 3 characters",
                    },
                  })}
                  error={errors.rooms?.[index]?.roomNo?.message}
                />

                <InputField
                  label="Capacity"
                  type="number"
                  placeholder="e.g. 2"
                  {...register(`rooms.${index}.capacity`, {
                    required: "Capacity is required",
                    min: {
                      value: 1,
                      message: "Minimum 1",
                    },
                  })}
                  error={errors.rooms?.[index]?.capacity?.message}
                />

                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="mt-6 p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => append({ roomNo: "", capacity: "" })}
            className="flex items-center gap-2 justify-center p-2 bg-white/5 rounded-lg hover:bg-white/10"
          >
            <Plus size={18} />
            Add Room
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 rounded-xl bg-violet-600 px-6 py-3 font-bold hover:bg-violet-700 disabled:opacity-60"
          >
            {isLoading ? (
              <div className="flex justify-center items-center gap-2">
                <Loader2 className="animate-spin" size={18} />
                Creating...
              </div>
            ) : (
              "Create Rooms"
            )}
          </button>

        </form>
      </div>
    </div>
  );
}