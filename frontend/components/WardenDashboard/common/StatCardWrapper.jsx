"use client";
import React from "react";
import StatCard from "./StatCard";
import { Users, BedDouble, ClipboardList, AlertCircle } from "lucide-react";

const StatCardWrapper = ({ totalStudents, totalRooms, occupiedRooms }) => {
  return (
    <>
      <StatCard
        link={"/warden/students"}
        title="Total Students"
        value={totalStudents}
        icon={<Users size={24} />}
        trend="+4%"
        color="violet"
      />

      <StatCard
        link={"/warden/rooms"}
        title="Rooms Occupied"
        value={`${occupiedRooms} / ${totalRooms}`}
        icon={<BedDouble size={24} />}
        trend="+2%"
        color="blue"
      />

      <StatCard
        link={"/warden/complaints"}
        title="Pending Complaints"
        value="7"
        icon={<AlertCircle size={24} />}
        trend="-1%"
        color="rose"
      />

      <StatCard
        link={"#!"}
        title="Attendance Today"
        value={`${totalStudents} Present`}
        icon={<ClipboardList size={24} />}
        trend="+3%"
        color="emerald"
      />
    </>
  );
};

export default StatCardWrapper;