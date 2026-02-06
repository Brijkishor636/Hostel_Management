"use client";
import { FaBuilding, FaUserPlus, FaCogs } from "react-icons/fa";
import StepItem from "./StepItem";
import FAQs from "./FAQs";

export default function HowItWorks() {
  return (
    <section className="relative pb-24 pt-16 bg-[#020617] text-white overflow-hidden">

      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-indigo-600/20 blur-3xl rounded-full"></div>
      <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-purple-600/20 blur-3xl rounded-full"></div>
      <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-indigo-600/20 blur-3xl rounded-full"></div>
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-purple-600/20 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 relative">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            How It <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Get started in just a few simple steps and manage your hostel effortlessly.
          </p>
        </div>

        <div className="hidden md:block absolute left-0 right-0 top-[290px] h-[2px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent"></div>

        <div className="hidden md:grid grid-cols-3 gap-12 relative z-10">
          <StepItem
            icon={<FaBuilding />}
            title="Register Hostel"
            desc="Create your hostel profile and set up basic information quickly."
          />
          <StepItem
            icon={<FaUserPlus />}
            title="Add Students & Rooms"
            desc="Register students, create rooms, and assign beds effortlessly."
          />
          <StepItem
            icon={<FaCogs />}
            title="Manage Everything Easily"
            desc="Monitor complaints, payments, and analytics from one dashboard."
          />
        </div>

        <div className="md:hidden flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-hide">
          <div className="min-w-[85%] snap-center">
            <StepItem
              icon={<FaBuilding />}
              title="Register Hostel"
              desc="Create your hostel profile and set up basic information quickly."
            />
          </div>

          <div className="min-w-[85%] snap-center">
            <StepItem
              icon={<FaUserPlus />}
              title="Add Students & Rooms"
              desc="Register students, create rooms, and assign beds effortlessly."
            />
          </div>

          <div className="min-w-[85%] snap-center">
            <StepItem
              icon={<FaCogs />}
              title="Manage Everything Easily"
              desc="Monitor complaints, payments, and analytics from one dashboard."
            />
          </div>
        </div>

        <div className="mt-24">
          <FAQs />
        </div>

      </div>
    </section>
  );
}
