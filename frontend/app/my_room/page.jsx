import Sidebar from "../st_components/Sidebar";
import Navbar from "../st_components/Navbar";

export default function MyRoom() {

  const room = {
    roomNumber: "A-101",
    block: "A Block",
    floor: "1st Floor",
    capacity: 2,
    occupants: ["Nishant Kumar", "Rahul Kumar"],
    rent: "₹4,000",
    facilities: ["WiFi", "Study Table", "Fan", "Bed", "Cupboard"],
    status: "Occupied"
  };

  return (
    <div className="flex bg-gray-950 min-h-screen text-white">

      <Sidebar />

      <div className="flex-1 p-8">

        <Navbar />

        <h1 className="text-2xl font-bold mb-6">My Room Details</h1>

        <div className="bg-gray-900 p-6 rounded-xl space-y-3">

          <p><b>Room Number:</b> {room.roomNumber}</p>
          <p><b>Block:</b> {room.block}</p>
          <p><b>Floor:</b> {room.floor}</p>
          <p><b>Capacity:</b> {room.capacity} Students</p>

          <p><b>Occupants:</b></p>
          <ul className="list-disc ml-6">
            {room.occupants.map((student, index) => (
              <li key={index}>{student}</li>
            ))}
          </ul>

          <p><b>Monthly Rent:</b> {room.rent}</p>

          <p><b>Facilities:</b></p>
          <ul className="list-disc ml-6">
            {room.facilities.map((facility, index) => (
              <li key={index}>{facility}</li>
            ))}
          </ul>

          <p><b>Status:</b> {room.status}</p>

        </div>

      </div>

    </div>
  );
}