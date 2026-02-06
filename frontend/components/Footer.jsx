"use client";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative text-gray-300 overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#312e81] opacity-95"></div>

      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-60"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">

        <div>
          <h2 className="text-2xl font-bold text-white mb-4">HostelFlow</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Smart hostel management platform to manage students, rooms,
            complaints and payments effortlessly.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-indigo-400 transition cursor-pointer">Home</li>
            <li className="hover:text-indigo-400 transition cursor-pointer">Features</li>
            <li className="hover:text-indigo-400 transition cursor-pointer">Dashboard</li>
            <li className="hover:text-indigo-400 transition cursor-pointer">Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: support@hostelflow.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Address: Katihar, Bihar, India</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <div className="p-3 rounded-full bg-white/10 hover:bg-indigo-600 transition cursor-pointer shadow-md hover:shadow-indigo-500/50">
              <FaFacebookF />
            </div>
            <div className="p-3 rounded-full bg-white/10 hover:bg-pink-600 transition cursor-pointer shadow-md hover:shadow-pink-500/50">
              <FaInstagram />
            </div>
            <div className="p-3 rounded-full bg-white/10 hover:bg-blue-600 transition cursor-pointer shadow-md hover:shadow-blue-500/50">
              <FaLinkedinIn />
            </div>
            <div className="p-3 rounded-full bg-white/10 hover:bg-gray-700 transition cursor-pointer shadow-md hover:shadow-gray-500/50">
              <FaGithub />
            </div>
          </div>
        </div>

      </div>

      <div className="relative border-t border-white/10 text-center py-6 text-sm text-gray-400 backdrop-blur-md">
        © {new Date().getFullYear()} HostelFlow. All rights reserved. |
        <span className="hover:text-indigo-400 transition cursor-pointer ml-1">
          Privacy Policy
        </span>
      </div>
    </footer>
  );
}
