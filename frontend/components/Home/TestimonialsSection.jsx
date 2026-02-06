"use client";
import { useEffect, useState } from "react";
import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    name: "Rohit Sharma",
    role: "Hostel Owner",
    avatar: "/avatar1.jpg",
    quote: "Managing rooms and payments became effortless."
  },
  {
    name: "Priya Verma",
    role: "Warden",
    avatar: "/avatar2.jpg",
    quote: "Complaint tracking is extremely helpful."
  },
  {
    name: "Aman Gupta",
    role: "Student",
    avatar: "/avatar3.jpg",
    quote: "Checking payments anytime is very easy."
  },
  {
    name: "Neha Singh",
    role: "Hostel Owner",
    avatar: "/avatar4.jpg",
    quote: "Analytics dashboard is amazing."
  },
  {
    name: "Vikas Kumar",
    role: "Student",
    avatar: "/avatar5.jpg",
    quote: "Interface is smooth and modern."
  }
];

export default function TestimonialsSection() {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  // Detect screen size
  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };

    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) =>
        (prev + 1) % testimonials.length
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const visibleTestimonials = [];
  for (let i = 0; i < visibleCount; i++) {
    visibleTestimonials.push(
      testimonials[(startIndex + i) % testimonials.length]
    );
  }

  return (
    <section className="relative pb-24 pt-10 bg-[#020617] text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <h2 className="text-4xl font-bold mb-6">
          What People Say
        </h2>
        <p className="text-gray-400 mb-12">
          Trusted by hostel owners, wardens and students.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700">
          {visibleTestimonials.map((item, i) => (
            <TestimonialCard key={i} {...item} />
          ))}
        </div>

      </div>
    </section>
  );
}
