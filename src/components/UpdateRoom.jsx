import React, { useState } from "react";
import axios from "axios";

const amenitiesList = [
  "WiFi",
  "AC",
  "TV",
  "Mini-bar",
  "Private Terrace",
  "Ocean View Balcony",
  "Jacuzzi",
  "Private Pool",
];

const roomTypes = [
  "Standard",
  "Superior",
  "Deluxe",
  "Junior Suite",
  "Suite",
  "Executive",
  "Presidential Suite",
];

const statusOptions = ["Available", "Occupied", "Unavailable"];

const UpdateRoom = ({ selectedRoom, toggleUpdateRoom, fetchRooms }) => {
  const [room, setRoom] = useState({
    roomId: selectedRoom?.roomId || "",
    roomNo: selectedRoom?.roomNo || "",
    branchId: selectedRoom?.branchId || "",
    name: selectedRoom?.name || "",
    type: selectedRoom?.type || "Standard",
    price: selectedRoom?.price || "",
    description: selectedRoom?.description || "",
    amenities: selectedRoom?.amenities || [],
    imageUrl: selectedRoom?.imageUrl || "",
    status: selectedRoom?.status || "Available",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.put('http://localhost:8080/hotel/room',room);
        if (response.status === 200) {
            alert("Room updated successfully!");
            fetchRooms();
            toggleUpdateRoom();
        } else {
            alert("Failed to update room");
        }
    } catch (err) {
        console.error(err);
        alert("Error updating room");
    }
    };

  const handleChange = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };

  const handleAmenityChange = (amenity) => {
    setRoom((prev) => {
      const updated = prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity];
      return { ...prev, amenities: updated };
    });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full backdrop-blur-sm bg-black/60 z-50 flex items-center justify-center overflow-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] sm:w-[500px] relative">
        <h2 className="text-2xl font-bold text-center mb-4">Update Room</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Room No */}
          <input
            type="text"
            name="roomNo"
            value={room.roomNo}
            onChange={handleChange}
            placeholder="Room Number"
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />

          {/* Room Name */}
          <input
            type="text"
            name="name"
            value={room.name}
            onChange={handleChange}
            placeholder="Room Name"
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />

          {/* Room Type */}
          <select
            name="type"
            value={room.type}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
          >
            {roomTypes.map((type, idx) => (
              <option key={idx} value={type}>
                {type}
              </option>
            ))}
          </select>

          {/* Price */}
          <input
            type="number"
            name="price"
            value={room.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />

          {/* Description */}
          <textarea
            name="description"
            value={room.description}
            onChange={handleChange}
            placeholder="Description"
            rows="3"
            className="w-full border border-gray-300 rounded-lg p-2"
          />

          {/* Amenities */}
          <div>
            <p className="font-semibold mb-1">Select Amenities:</p>
            <div className="grid grid-cols-2 gap-2">
              {amenitiesList.map((amenity, idx) => (
                <label key={idx} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={room.amenities.includes(amenity)}
                    onChange={() => handleAmenityChange(amenity)}
                  />
                  {amenity}
                </label>
              ))}
            </div>
          </div>

          {/* Image URL */}
          <input
            type="text"
            name="imageUrl"
            value={room.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full border border-gray-300 rounded-lg p-2"
          />

          {/* Status Dropdown */}
          <select
            name="status"
            value={room.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
          >
            {statusOptions.map((status, idx) => (
              <option key={idx} value={status}>
                {status}
              </option>
            ))}
          </select>

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              onClick={toggleUpdateRoom}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Update Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateRoom;
