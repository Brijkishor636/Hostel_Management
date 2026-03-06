"use client";
import Image from "next/image";
import heroImg from "../../assets/hostel_img.jpg"

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[90vh] overflow-hidden bg-[#020617] text-white flex items-center overflow-hidden">
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-indigo-600/20 blur-3xl rounded-full"></div>
            <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-indigo-600/20 blur-3xl rounded-full"></div>

      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] border border-indigo-600 rounded-full top-[-200px] left-[-200px]" />
        <div className="absolute w-[800px] h-[800px] border border-purple-600 rounded-full bottom-[-300px] right-[-300px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">

        <div>
          <div className="inline-flex items-center gap-2 bg-indigo-900/40 border border-indigo-500/30 px-4 py-2 rounded-full text-sm mb-6 backdrop-blur-md">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Smart Hostel Management System
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Manage Your Hostel <br />
            <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Smarter & Faster
            </span>
          </h1>

         
          <p className="text-gray-300 max-w-xl mb-8">
            Simplify room allocation, student management, payments and complaints —
            all in one powerful dashboard built for modern hostels.
          </p>

          <div className="flex gap-4 flex-wrap">
            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold shadow-lg hover:scale-105 transition">
              Get Started
            </button>
            <button className="px-6 py-3 rounded-xl border border-gray-500 hover:bg-gray-800 transition">
              Watch Demo
            </button>
          </div>
        </div>

       
        <div className="hidden md:flex justify-center relative">
          <div className="relative rounded-3xl border border-indigo-500/30 shadow-[0_0_50px_rgba(99,102,241,0.3)] overflow-hidden">
            <Image
              src={heroImg}   
              alt="Hero Image"
              width={500}
              height={500}
              className="rounded-3xl object-cover"
            />

            <div className="absolute bottom-6 left-6 bg-white text-gray-900 px-5 py-3 rounded-xl shadow-lg">
              <p className="text-2xl font-bold">120+</p>
              <p className="text-sm">Students Managed</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
