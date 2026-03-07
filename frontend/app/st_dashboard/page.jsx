import Sidebar from "../st_components/Sidebar";
import Navbar from "../st_components/Navbar";
import StatCard from "../st_components/StatCard";
import RevenueChart from "../st_components/RevenueChart";

export default function StDashboard()
 {
  return (
    <div className="flex bg-gray-950 min-h-screen">
      
      <Sidebar />

      <div className="flex-1 p-8 space-y-8">

        <Navbar />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard title="Room Number" value="A-101" />
          <StatCard title="Monthly Rent" value="₹4,000" />
          <StatCard title="Pending Dues" value="₹1,500" />
          <StatCard title="Open Complaints" value="2" />
        </div>

        <RevenueChart />

      </div>
    </div>
  );
}
