"use client";
import RoleCard from "./RoleCard";

export default function RoleSection() {
  return (
    <section className="relative pb-24 pt-14 bg-[#020617] text-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Tailored Dashboards For Everyone
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Each role gets a personalized dashboard designed
            to simplify hostel operations and enhance productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <RoleCard
            title="Admin"
            desc="Complete control over rooms, students, payments, and hostel analytics."
            img="/admin.jpg"
            btnText="Explore Admin"
          />

          <RoleCard
            title="Warden"
            desc="Monitor student activities, complaints, and visitor logs effortlessly."
            img="/warden.jpg"
            btnText="Explore Warden"
          />

          <RoleCard
            title="Student"
            desc="Access room details, payments, complaints and personal dashboard."
            img="/student.jpg"
            btnText="Explore Student"
          />

        </div>
      </div>
    </section>
  );
}
