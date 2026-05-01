import Sidebar from "../../components/StudentDashboard/Sidebar";
import Navbar from "../../components/StudentDashboard/Navbar";

export default function Overview() {

  const student = {
    name: "Nishant Kumar",
    studentId: "STU1021",
    course: "B.Tech CSE",
    year: "3rd Year",
    phone: "9876543210",
    email: "nishant@gmail.com",
    room: "A-101",
    rent: "₹4,000",
    dues: "₹1,500",
    complaints: 2
  };

  

  return (
    <div className="flex bg-gray-950 min-h-screen text-white">

      <Sidebar />

      <div className="flex-1 p-8">
        <Navbar />

        <h1 className="text-2xl font-bold mb-6">Student Overview</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-gray-900 p-6 rounded-xl">
            <h2 className="text-lg font-semibold mb-3">Personal Information</h2>
            <p><b>Name:</b> {student.name}</p>
            <p><b>Student ID:</b> {student.studentId}</p>
            <p><b>Course:</b> {student.course}</p>
            <p><b>Year:</b> {student.year}</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl">
            <h2 className="text-lg font-semibold mb-3">Contact Details</h2>
            <p><b>Phone:</b> {student.phone}</p>
            <p><b>Email:</b> {student.email}</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl">
            <h2 className="text-lg font-semibold mb-3">Hostel Information</h2>
            <p><b>Room Number:</b> {student.room}</p>
            <p><b>Monthly Rent:</b> {student.rent}</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl">
            <h2 className="text-lg font-semibold mb-3">Account Status</h2>
            <p><b>Pending Dues:</b> {student.dues}</p>
            <p><b>Open Complaints:</b> {student.complaints}</p>
          </div>

        </div>

      </div>
    </div>
  );
}