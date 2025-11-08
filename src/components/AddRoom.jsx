import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

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

const AddRoom = ({ branchId, fetchRooms, toggleAddRoom }) => {
  const [room, setRoom] = useState({
    roomNo: "",
    branchId,
    name: "",
    type: "Standard",
    price: "",
    description: "",
    amenities: [],
    imageUrl: "",
    status: "Available",
  });

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [popup, setPopup] = useState({ show: false, type: "", message: "" });

  const showPopup = (type, message) => {
    setPopup({ show: true, type, message });
    setTimeout(() => setPopup({ show: false, type: "", message: "" }), 2500);
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

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "hotel-management");
    data.append("cloud_name", "dyixwovtl");

    try {
      setUploading(true);
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dyixwovtl/image/upload",
        data
      );
      setRoom({ ...room, imageUrl: res.data.secure_url });
      showPopup("success", "✅ Image uploaded successfully!");
    } catch (err) {
      console.error("Image upload failed:", err);
      showPopup("error", "❌ Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!room.roomNo || !room.name || !room.price) {
      showPopup("warning", "⚠️ Please fill in all required fields.");
      return;
    }

    try {
      setSaving(true);
      const response = await axios.post(
        "https://hotel-management-backend-7yq5.onrender.com/hotel/room",
        room
      );

      if (response.status === 201 || response.status === 200) {
        showPopup("success", "✅ Room added successfully!");
        setTimeout(() => {
          fetchRooms();
          toggleAddRoom();
        }, 1500);
      } else {
        showPopup("error", "❌ Failed to add room. Please try again.");
      }
    } catch (err) {
      console.error("Add room error:", err);
      showPopup("error", "❌ Something went wrong. Try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm bg-black/60 z-50 overflow-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl shadow-lg p-6 w-[90%] sm:w-[500px] relative"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Add New Room
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="roomNo"
            value={room.roomNo}
            onChange={handleChange}
            placeholder="Room Number"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="text"
            name="name"
            value={room.name}
            onChange={handleChange}
            placeholder="Room Name"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            required
          />

          <select
            name="type"
            value={room.type}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          >
            {roomTypes.map((type, idx) => (
              <option key={idx} value={type}>
                {type}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="price"
            value={room.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            required
          />

          <textarea
            name="description"
            value={room.description}
            onChange={handleChange}
            placeholder="Description"
            rows="3"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          />

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

          <div>
            <label className="block mb-2 font-semibold">Upload Image:</label>
            <input
              type="file"
              onChange={handleUpload}
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
            {uploading && (
              <div className="flex items-center gap-2 text-blue-600 text-sm mt-2 italic">
                <motion.div
                  className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"
                  transition={{ repeat: Infinity, duration: 1 }}
                ></motion.div>
                Uploading image...
              </div>
            )}
            {room.imageUrl && (
              <img
                src={room.imageUrl}
                alt="Room Preview"
                className="w-full h-40 object-cover rounded-lg mt-2 border"
              />
            )}
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={toggleAddRoom}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className={`px-4 py-2 rounded-lg text-white font-semibold transition flex items-center justify-center gap-2 ${
                saving
                  ? "bg-blue-400 cursor-not-allowed opacity-80"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {saving ? (
                <>
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                    transition={{ repeat: Infinity, duration: 1 }}
                  ></motion.div>
                  Saving...
                </>
              ) : (
                "Add Room"
              )}
            </button>
          </div>
        </form>
      </motion.div>

      <AnimatePresence>
        {popup.show && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className={`fixed bottom-8 right-8 px-6 py-4 rounded-xl shadow-xl text-white font-semibold z-50 ${
              popup.type === "success"
                ? "bg-green-600"
                : popup.type === "error"
                ? "bg-red-600"
                : "bg-yellow-500"
            }`}
          >
            {popup.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddRoom;
