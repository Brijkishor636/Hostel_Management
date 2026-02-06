"use client";
import FAQItem from "./FAQItem";

export default function FAQs() {
  return (
    <div className="bg-gray-200 text-gray-800 rounded-3xl p-10 shadow-xl">
      <h3 className="text-2xl font-bold mb-8 text-center">
        Frequently Asked Questions
      </h3>

      <div className="space-y-4">
        <FAQItem
          question="Is it easy to set up?"
          answer="Yes, the system is designed for quick setup with minimal technical knowledge."
        />

        <FAQItem
          question="Can multiple hostels use it?"
          answer="Absolutely. Each hostel has its own isolated dashboard and data."
        />

        <FAQItem
          question="Is student data secure?"
          answer="Yes, we use encrypted authentication and role-based access control."
        />

        <FAQItem
          question="Can I manage rooms easily?"
          answer="Yes, room allocation and occupancy tracking are fully automated."
        />
      </div>
    </div>
  );
}
