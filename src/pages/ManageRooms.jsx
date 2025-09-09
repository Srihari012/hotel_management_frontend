import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import locationIcon from "../assets/location.png";
import AddRoom from "../components/AddRoom";
import UpdateRoom from "../components/UpdateRoom";
import axios from "axios";
import RoomDeleteConfirmation from "../components/RoomDeleteConfirmation";

const ManageRooms = () => {
  const location = useLocation();
  const branch = location.state?.branch;

  const [rooms, setRooms] = useState([]);
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [showUpdateRoom, setShowUpdateRoom] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomDeleteConfirm, setRoomDeleteConfirm]= useState(false);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/hotel/room?branchId=${branch.branchId}`
      );
      const data = await response.json();
      setRooms(data);
    } catch (err) {
      console.error("Failed to fetch rooms:", err);
    }
  };

  const toggleAddRoom = () => {
    setShowAddRoom(!showAddRoom);
  };

  const toggleDeleteConfirm = () => {
    setRoomDeleteConfirm(!roomDeleteConfirm);
  };

  const toggleUpdateRoom = () => {
    setShowUpdateRoom(!showUpdateRoom);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/hotel/room/${selectedRoom}`);
      fetchRooms(); // refresh the list after delete
      toggleDeleteConfirm();
    } catch (error) {
      console.error("Error deleting room:", error);
      alert("Failed to delete room");
    }
  };

  const handleUpdate = (roomData) => {
    setSelectedRoom(roomData);
    setShowUpdateRoom(true);
  };

  return (
    <div className="container min-h-screen mx-auto p-1">
      <div className="fixed top-0 left-0 w-full bg-gray-400 rounded-b-2xl p-4 shadow-lg z-10">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-white font-extrabold">
            {branch.name}
          </h1>
          <div className="flex justify-center items-center gap-1 mt-2">
            <img src={locationIcon} alt="location-icon" className="h-5" />
            <h2 className="text-xl font-serif text-white italic">
              {branch.location}
            </h2>
          </div>
          <div className="mt-2 flex flex-col sm:flex-row sm:justify-center sm:gap-10 text-center">
            <p className="text-md font-serif text-white italic">
              {branch.address}
            </p>
            <p className="text-md font-serif text-white italic">
              Contact: {branch.contactNumber}
            </p>
          </div>
        </div>
      </div>

      <div className="fixed top-[150px] right-2 z-10">
        <button
          className="bg-blue-500 px-4 py-2 text-lg font-bold italic font-serif text-white rounded-lg shadow-md hover:bg-blue-600 transition"
          onClick={() => setShowAddRoom(true)}
        >
          Add Room
        </button>
      </div>

      <div className="mt-[220px] px-4 max-w-full">
        {rooms.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-[70vh]">
            <h2 className="text-3xl font-serif font-bold italic text-gray-600">
              No Rooms Available
            </h2>
            <p className="text-lg font-serif italic text-gray-500 mt-2">
              Click on "Add Room" to create a new room.
            </p>
          </div>
        ) : (
          <div className="space-y-4 max-w-7xl mx-auto">
            {rooms.map((room) => (
              <div
                key={room.roomId}
                className="overflow-hidden flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-100 border border-gray-200 rounded-xl shadow-md p-4 sm:p-5 hover:shadow-lg transition-shadow duration-300"
              >
                {/* Left: Room Details */}
                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6 w-full">
                  <p className="text-lg sm:text-xl font-bold text-gray-800">
                    #{room.roomNo}
                  </p>
                  <p className="text-base sm:text-lg font-semibold text-gray-700">
                    {room.name}
                  </p>
                  <p className="text-sm sm:text-md text-gray-600">
                    <span className="font-medium text-gray-800">Type:</span>{" "}
                    {room.type}
                  </p>
                  <p className="text-sm sm:text-md text-gray-600">
                    <span className="font-medium text-gray-800">Price:</span> ₹
                    {room.price}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-3 sm:mt-0 justify-center sm:justify-end flex-shrink-0">
                  <p
                    className={`mr-10 text-sm sm:text-md font-semibold px-3 py-1 rounded-full w-fit ${
                      room.status === "Available"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {room.status}
                  </p>

                  <div className="flex flex-row gap-3 justify-center sm:justify-end">
                    <button
                      onClick={() => handleUpdate(room)}
                      className="px-4 py-2 rounded-xl bg-blue-500 text-white font-medium shadow-md hover:bg-blue-600 hover:shadow-lg transition duration-200"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => {
                        toggleDeleteConfirm()
                        setSelectedRoom(room.roomId)
                      }}
                      className="px-4 py-2 rounded-xl bg-red-500 text-white font-medium shadow-md hover:bg-red-600 hover:shadow-lg transition duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showAddRoom && (
        <AddRoom
          branchId={branch.branchId}
          fetchRooms={fetchRooms}
          toggleAddRoom={toggleAddRoom}
        />
      )}

      {showUpdateRoom && (
        <UpdateRoom
          selectedRoom={selectedRoom}
          fetchRooms={fetchRooms}
          toggleUpdateRoom={toggleUpdateRoom}
        />
      )}

      {roomDeleteConfirm &&(
        <RoomDeleteConfirmation
        toggleDeleteConfirm={toggleDeleteConfirm}
        handleDelete={handleDelete}
      />)
      }
    </div>
  );
};

export default ManageRooms;
