"use client";

import { useState } from "react";

export default function LoginPage() {

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-cyan-400">

      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">

        <h2 className="text-2xl font-bold text-center mb-6">
          Log In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border p-3 rounded-md focus:outline-none focus:border-blue-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border p-3 rounded-md focus:outline-none focus:border-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
          >
            Log In
          </button>

        </form>

        <p className="text-center text-sm mt-4">
          Don't have an account?
          <a href="/signup" className="text-blue-600 ml-1 hover:underline">
            Sign Up
          </a>
        </p>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t"></div>
          <span className="mx-3 text-gray-400 text-sm">or</span>
          <div className="flex-grow border-t"></div>
        </div>

        <button className="w-full border py-3 rounded-md hover:bg-gray-50">
          Sign in with Google
        </button>

      </div>

    </div>
  );
}