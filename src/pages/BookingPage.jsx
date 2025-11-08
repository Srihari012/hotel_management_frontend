import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, MapPin, Hotel } from "lucide-react";
import fallbackImage from "../assets/notAvailable.png";

const BookingPage = () => {
  const [branches, setBranches] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [hotelList, setHotelList] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState("");
  const [expandedRoom, setExpandedRoom] = useState(null);
  const [hotelName, setHotelName] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, type: "", message: "" });

  const showPopup = (type, message) => {
    setPopup({ show: true, type, message });
    setTimeout(() => setPopup({ show: false, type: "", message: "" }), 2500);
  };

  const handleBooking = (room) => {
    axios
      .post("https://hotel-management-backend-7yq5.onrender.com/hotel/booking/bookroom", {
        userId: JSON.parse(localStorage.getItem("user")).userId,
        roomId: room.roomId,
        roomNo: room.roomNo,
        branchName: hotelName,
        branchId: selectedHotel,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        status: "Confirmed",
      })
      .then(() => {
        showPopup("success", "✅ Booking Successful!");
        setExpandedRoom(null);
      })
      .catch((error) => {
        console.error("Error during booking:", error);
        showPopup("error", "❌ Booking Failed. Please try again.");
      });
  };

  const fetchBranches = async () => {
    try {
      const response = await axios.get("https://hotel-management-backend-7yq5.onrender.com/hotel/branch");
      setBranches(response.data);
    } catch (error) {
      console.error("Error fetching branches:", error);
      showPopup("error", "⚠️ Failed to fetch branches.");
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
    const filtered = branches.filter((b) => b.location === location);
    setHotelList(filtered);
    setSelectedHotel("");
  };

  const handleSearchRooms = async () => {
    if (!selectedHotel || !checkIn || !checkOut) {
      showPopup("warning", "⚠️ Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        "https://hotel-management-backend-7yq5.onrender.com/hotel/room/availablerooms",
        {
          params: {
            branchId: selectedHotel,
            checkIn: checkIn,
            checkOut: checkOut,
          },
        }
      );
      setRooms(response.data);
      if (response.data.length === 0)
        showPopup("warning", "⚠️ No rooms available for selected dates.");
    } catch (error) {
      console.error("Error fetching rooms:", error);
      showPopup("error", "❌ Failed to fetch rooms.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-br from-yellow-100 to-gray-200 px-4 py-10">
      <motion.div
        className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-xl text-center"
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl font-bold mb-8 text-gray-800 font-serif"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Book Your Stay
        </motion.h1>

        {/* Location Select */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <label className="font-semibold mb-2 flex items-center gap-2 text-gray-700">
            <MapPin className="text-yellow-500" /> Select Location
          </label>
          <select
            value={selectedLocation}
            onChange={(e) => handleLocationChange(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">-- Select Location --</option>
            {[...new Set(branches.map((b) => b.location))].map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Hotel Select */}
        {selectedLocation && (
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="font-semibold mb-2 flex items-center gap-2 text-gray-700">
              <Hotel className="text-yellow-500" /> Select Hotel
            </label>
            <select
              value={selectedHotel}
              onChange={(e) => {
                setSelectedHotel(e.target.value);
                setHotelName(e.target.options[e.target.selectedIndex].text);
              }}
              className="w-full p-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">-- Select Hotel --</option>
              {hotelList.map((hotel) => (
                <option key={hotel.branchId} value={hotel.branchId}>
                  {hotel.name}
                </option>
              ))}
            </select>
          </motion.div>
        )}

        {/* Dates */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between gap-6 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-col w-full">
            <label className="font-semibold mb-2 text-gray-700 flex items-center gap-2">
              <CalendarDays className="text-yellow-500" /> Check-in
            </label>
            <input
              type="date"
              className="p-3 border rounded-xl bg-gray-50"
              min={new Date().toISOString().split("T")[0]}
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="font-semibold mb-2 text-gray-700 flex items-center gap-2">
              <CalendarDays className="text-yellow-500" /> Check-out
            </label>
            <input
              type="date"
              className="p-3 border rounded-xl bg-gray-50"
              min={checkIn || new Date().toISOString().split("T")[0]}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </motion.div>

        <motion.button
          onClick={handleSearchRooms}
          className="mt-2 px-8 py-3 bg-yellow-500 text-black font-semibold rounded-xl shadow-md hover:bg-yellow-400 transition"
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
        >
          Search Rooms
        </motion.button>
      </motion.div>

      {/* 🔹 Loading Animation */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="flex flex-col items-center justify-center mt-16 text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-4"
              transition={{ repeat: Infinity, duration: 1 }}
            ></motion.div>
            <p className="text-lg font-semibold">Fetching available rooms...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rooms grid */}
      {!loading && rooms.length > 0 && (
        <motion.div
          className="mt-12 w-full max-w-6xl bg-white rounded-3xl shadow-xl p-10 relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-10 text-gray-800 font-serif text-center">
            Available Rooms
          </h2>

          <motion.div
            layout
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 transition-all duration-300 ${
              expandedRoom ? "blur-sm pointer-events-none" : ""
            }`}
          >
            {rooms.map((room) => (
              <motion.div
                key={room.roomId}
                layout
                layoutId={`room-card-${room.roomId}`}
                onClick={() => setExpandedRoom(room)}
                className="bg-white rounded-2xl shadow-md overflow-hidden border cursor-pointer hover:shadow-2xl transition-all"
                whileHover={{ y: -6, scale: 1.02 }}
              >
                <motion.img
                  src={room.imageUrl || fallbackImage}
                  className="w-full h-48 object-cover"
                  onError={(e) => (e.target.src = fallbackImage)}
                  layoutId={`room-img-${room.roomId}`}
                />

                <div className="p-6">
                  <h3 className="text-xl font-semibold">
                    Room {room.roomNo} • {room.name}
                  </h3>
                  <p className="text-gray-700 text-sm mt-1">
                    Type: {room.type}
                  </p>
                  <p className="text-gray-900 font-semibold text-xl mt-2">
                    ₹{room.price}
                    <span className="text-sm text-gray-500"> / night</span>
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Expanded Room Modal */}
          <AnimatePresence>
            {expandedRoom && (
              <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                  className="absolute inset-0 backdrop-blur-lg bg-black/40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setExpandedRoom(null)}
                />
                <motion.div
                  layoutId={`room-card-${expandedRoom.roomId}`}
                  className="relative bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                >
                  <motion.img
                    layoutId={`room-img-${expandedRoom.roomId}`}
                    src={expandedRoom.imageUrl || fallbackImage}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-8">
                    <h2 className="text-3xl font-bold">
                      Room {expandedRoom.roomNo} • {expandedRoom.name}
                    </h2>
                    <p className="text-gray-700 mt-3">
                      {expandedRoom.description}
                    </p>
                    {expandedRoom.amenities?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {expandedRoom.amenities.map((a, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-yellow-200 text-yellow-900 text-xs font-medium rounded-full"
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="text-2xl font-semibold mt-5">
                      ₹{expandedRoom.price}
                      <span className="text-gray-500 text-sm"> / night</span>
                    </p>
                    <div className="flex items-center gap-4 mt-6">
                      <button
                        onClick={() => setExpandedRoom(null)}
                        className="py-3 px-5 bg-black text-white rounded-xl text-lg"
                      >
                        Close
                      </button>
                      <button
                        onClick={() => handleBooking(expandedRoom)}
                        disabled={expandedRoom.status === "Occupied"}
                        className={`py-3 px-5 rounded-xl text-lg font-semibold transition ${
                          expandedRoom.status === "Vacant"
                            ? "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                            : "bg-gray-400 text-gray-200 cursor-not-allowed"
                        }`}
                      >
                        {expandedRoom.status === "Vacant"
                          ? "Book Now"
                          : "Booked"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* ✅ Popup */}
      <AnimatePresence>
        {popup.show && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
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

export default BookingPage;
