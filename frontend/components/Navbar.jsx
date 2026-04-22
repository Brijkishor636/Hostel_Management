"use client";
import { useContext, useState } from "react";
import Link from "next/link";
import { Menu, X, User, LogOut } from "lucide-react";
import UserContext from "../context/UserContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { user, setUser } = useContext(UserContext);
  const userRole = user?.role;
  const role = userRole?.toLowerCase();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/logout`,
        {},
        { withCredentials: true }
      );

      setUser(null);
      toast.warn("logged out", {position: "bottom-right"})
      router.push("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20 shadow-[0_8px_20px_rgba(0,0,0,0.12)]
    hover:shadow-[0_10px_30px_rgba(0,0,0,0.16)] transition-shadow duration-300">
      
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        <Link href={"/"} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
            H
          </div>
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            HostelFlow
          </h1>
        </Link>

        {user && (
          <div className="hidden md:flex gap-10 text-gray-700 font-medium">
            {["Dashboard","Rooms","Students","Complaints"].map((item,i)=>(
              <Link
                key={i}
                href={item === "Dashboard" ? `/${role}` : `/${role}/${item.toLowerCase()}`}
                className="relative group"
              >
                {item}
                <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-gradient-to-r from-pink-500 to-purple-600 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>
        )}

        <div className="hidden md:flex gap-4 relative">
          {!user ? (
            <Link href={"/login"} className="px-5 py-2 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow-md hover:scale-105 transition">
              Login
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(true)}
                className="w-10 h-10 cursor-pointer rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center text-white shadow-lg hover:scale-105 transition-all duration-300"
              >
                <User size={18} />
              </button>

              {profileOpen && (
                <div
                  onMouseLeave={() => setProfileOpen(false)}
                  className="absolute right-0 mt-3 w-48 bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] border border-white/30 overflow-hidden animate-fadeIn"
                >
                  <Link
                    href={`/${role}/profile`}
                    className="block px-5 py-3 text-gray-700 font-medium transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 hover:text-purple-700"
                  >
                    Profile
                  </Link>

                  <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-5 py-3 text-red-500 font-medium flex items-center gap-2 transition-all duration-300 hover:bg-gradient-to-r hover:from-red-500/10 hover:to-pink-500/10 hover:text-red-600"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white/90 backdrop-blur-lg px-6 py-4 space-y-3 shadow-lg">
          
          {user && ["Dashboard","Rooms","Students","Complaints"].map((item,i)=>(
            <Link
              key={i}
              href={item === "Dashboard" ? `/${role}` : `/${role}/${item.toLowerCase()}`}
              className="block text-gray-700 font-medium hover:text-purple-600"
              onClick={() => setOpen(false)}
            >
              {item}
            </Link>
          ))}

          {!user ? (
            <button className="w-full mt-3 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold">
              Login
            </button>
          ) : (
            <>
              <Link
                href={`/${role}/profile`}
                className="block text-gray-700 font-medium hover:text-purple-600"
                onClick={() => setOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full mt-2 py-2 rounded-xl bg-red-500 text-white font-semibold flex items-center justify-center gap-2"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}