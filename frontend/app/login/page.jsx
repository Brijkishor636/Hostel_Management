// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// const url = process.env.NEXT_PUBLIC_BACKEND_URL

// export default function LoginPage() {
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     role: "student",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const res = await fetch(`${url}/api/v1/user/signin`, {
//       method: "POST",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: formData.email,
//         password: formData.password,
//         role: formData.role,
//       }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       alert(data.message || "Login failed");
//       return;
//     }
//     console.log(data);

//     if (data.dashboard === "/admin/dashboard") {
//       router.push("/admin");
//     } else if (data.dashboard === "/warden/dashboard") {
//       router.push("/warden");
//     } else {
//       router.push("/st_dashboard");
//     }

//   } catch (error) {
//     console.error("Login error:", error);
//     alert("Server error");
//   }
// };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] text-white px-4">

//       <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(99,102,241,0.25)] p-8">

//         <h2 className="text-2xl font-bold text-center mb-2">
//           Hostel Management
//         </h2>

//         <p className="text-center text-gray-400 text-sm mb-6">
//           Login to your dashboard
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-5">

//           <div>
//             <label className="text-gray-400 text-sm">Role</label>

//             <div className="relative mt-1">

//               <select
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 className="w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/40 text-gray-600"
//               >
//                 <option value="admin">Admin</option>
//                 <option value="warden">Warden</option>
//                 <option value="student">Student</option>
//               </select>
//             </div>
//           </div>

//           {/* Email */}
//           <div>
//             <label className="text-gray-400 text-sm">Email</label>

//             <div className="relative mt-1">
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Enter your email"
//                 onChange={handleChange}
//                 required
//                 className="w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
//               />
//             </div>
//           </div>

//           {/* Password */}
//           <div>
//             <label className="text-gray-400 text-sm">Password</label>

//             <div className="relative mt-1 mb-4">

//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Enter password"
//                 onChange={handleChange}
//                 required
//                 className="w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
//               />
//             </div>
//           </div>

//           {/* Login Button */}
//           <button
//             type="submit"
//             className="w-full py-3 rounded-lg font-medium bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(99,102,241,0.6)] transition-all duration-300"
//           >
//             Login to Dashboard
//           </button>
//         </form>

//         <p className="text-center text-sm text-gray-400 mt-6">
//           Don’t have an account?
//           <a href="/signup" className="text-indigo-400 hover:underline ml-1">
//             Sign up
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }









"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"
import { toast } from "react-toastify";
import UserContext from "../../context/UserContext";


const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.email.trim() === "") {
    toast.warning("Please enter email !!", { position: "top-center" });
    return;
  }

  if (formData.password.trim() === "") {
    toast.warning("Please enter password !!", { position: "top-center" });
    return;
  }

  try {
    const res = await axios.post(
      `${url}/api/v1/user/signin`,
      { ...formData },
      { withCredentials: true }
    );

    // console.log(res);
    setUser(res.data.user);

    toast.success("Logged in..", { position: "top-center" });

    const role = res.data.role?.toLowerCase();

    if (role === "admin") router.push("/admin");
    else if (role === "warden") router.push("/warden");
    else router.push("/student");

  } catch (err) {
    console.error(err);
    toast.error("Error during login!!", {
      position: "top-right"
    });
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] text-white px-4">
      
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(99,102,241,0.25)] p-8">
        
        <h2 className="text-2xl font-bold text-center mb-2">
          Hostel Management
        </h2>

        <p className="text-center text-gray-400 text-sm mb-6">
          Login to your dashboard
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="text-gray-400 text-sm">Email</label>

            <div className="relative mt-1">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500/40"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-400 text-sm">Password</label>

            <div className="relative mt-1 mb-4">
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500/40"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg cursor-pointer font-medium bg-gradient-to-r from-indigo-500 to-purple-500 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(99,102,241,0.6)] transition-all duration-300"
          >
            Login to Dashboard
          </button>

        </form>

        {/* <p className="text-center text-sm text-gray-400 mt-6">
          Don’t have an account?
          <a href="/signup" className="text-indigo-400 hover:underline ml-1">
            Sign up
          </a>
        </p> */}

      </div>

    </div>
  );
}

