"use client";
import FeatureCard from "./FeatureCard";
import {
  FaBed,
  FaUsers,
  FaClipboardList,
  FaUserFriends,
  FaMoneyBillWave,
  FaChartLine
} from "react-icons/fa";

export default function FeaturesSection() {

  const features = [
    {
      icon: <FaBed />,
      title: "Room Allocation",
      desc: "Assign rooms intelligently and avoid overbooking with real-time occupancy tracking."
    },
    {
      icon: <FaUsers />,
      title: "Student Management",
      desc: "Maintain student records, registration numbers and hostel assignments effortlessly."
    },
    {
      icon: <FaClipboardList />,
      title: "Complaint Tracking",
      desc: "Resolve student complaints faster with organized ticket tracking."
    },
    {
      icon: <FaUserFriends />,
      title: "Visitor Logs",
      desc: "Track visitor entries and exits securely with digital logs."
    },
    {
      icon: <FaMoneyBillWave />,
      title: "Fee Management",
      desc: "Monitor payments, dues and receipts with full transparency."
    },
    {
      icon: <FaChartLine />,
      title: "Dashboard Analytics",
      desc: "Visualize hostel performance with smart analytics and reports."
    }
  ];

  return (
    <section className="relative py-20 bg-[#020617] text-white overflow-hidden">

      <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-indigo-600/20 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Everything you need to manage your hostel efficiently,
            securely and effortlessly.
          </p>
        </div>

        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} />
          ))}
        </div>

        <div className="sm:hidden flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-hide">
          {features.map((f, i) => (
            <div key={i} className="min-w-[85%] snap-center">
              <FeatureCard {...f} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
