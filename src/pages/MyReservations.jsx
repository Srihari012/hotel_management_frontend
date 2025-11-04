import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, User2 } from "lucide-react";

const MyReservations = () => {
  const [user, setUser] = useState(null);
  const [myReservations, setMyReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 New states for popup
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      console.warn("User not found in localStorage");
      setLoading(false);
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    const fetchReservations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/hotel/booking/myreservations/${parsedUser.userId}`
        );
        setMyReservations(response.data);
      } catch (error) {
        console.error("Error loading reservations", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  // 🔹 When user clicks "Cancel Booking"
  const handleCancelClick = (bookingId) => {
    setSelectedBookingId(bookingId);
    setShowConfirm(true);
  };

  // 🔹 Confirm cancellation
  const confirmCancelBooking = async () => {
    try {
      await axios.put(
        `http://localhost:8080/hotel/booking/cancel/${selectedBookingId}`
      );

      // ✅ Update the state immediately
      setMyReservations((prev) =>
        prev.map((b) =>
          b.bookingId === selectedBookingId
            ? { ...b, status: "cancelled" }
            : b
        )
      );
    } catch (error) {
      console.error("Failed to cancel booking", error);
    } finally {
      setShowConfirm(false);
      setSelectedBookingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6">
      {/* PROFILE */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-5 mb-8 bg-white/40 backdrop-blur-lg shadow-lg p-5 rounded-2xl"
      >
        <div className="h-16 w-16 bg-white rounded-full shadow flex items-center justify-center">
          <User2 size={35} className="text-blue-600" />
        </div>

        <div>
          <h2 className="text-2xl font-bold">{user?.username}</h2>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </motion.div>

      {/* RESERVATIONS */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white/50 backdrop-blur-lg p-6 rounded-2xl shadow-xl"
      >
        <h3 className="text-2xl font-semibold mb-5">My Reservations</h3>

        {loading ? (
          <p className="text-gray-700 text-lg">Loading reservations...</p>
        ) : myReservations.length === 0 ? (
          <p className="text-gray-700 text-lg">No reservations found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {myReservations.map((res, i) => (
              <motion.div
                key={res.bookingId}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition ${
                  res.status === "cancelled"
                    ? "bg-red-50 border-red-300 opacity-80"
                    : "bg-white"
                }`}
              >
                <div className="flex justify-between items-center">
                  <h4
                    className={`font-bold text-xl ${
                      res.status === "cancelled"
                        ? "text-red-600"
                        : "text-blue-700"
                    }`}
                  >
                    Booking #{res.bookingId}
                  </h4>
                  <span
                    className={`inline-block px-4 py-1 rounded-full text-white text-sm font-semibold ${
                      res.status === "cancelled"
                        ? "bg-red-500"
                        : "bg-green-600"
                    }`}
                  >
                    {res.status}
                  </span>
                </div>

                {/* Booking Details */}
                <div
                  className={`mt-3 space-y-2 ${
                    res.status === "cancelled"
                      ? "text-red-700"
                      : "text-gray-700"
                  }`}
                >
                  <p className="flex items-center gap-2">
                    🏨 <span className="font-semibold">Hotel:</span>{" "}
                    {res.branchName}
                  </p>

                  <p className="flex items-center gap-2">
                    🔢 <span className="font-semibold">Room No:</span>{" "}
                    {res.roomNo}
                  </p>

                  <p className="flex items-center gap-2">
                    <CalendarDays size={20} />
                    <span className="font-semibold">Check-in:</span>{" "}
                    {res.checkInDate}
                  </p>

                  <p className="flex items-center gap-2">
                    <CalendarDays size={20} />
                    <span className="font-semibold">Check-out:</span>{" "}
                    {res.checkOutDate}
                  </p>
                </div>

                {/* Cancel Button */}
                <button
                  className={`bg-red-600 p-2 px-6 mt-4 rounded-lg font-serif text-white font-bold hover:bg-red-700 transition ${
                    res.status === "cancelled"
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  onClick={() => handleCancelClick(res.bookingId)}
                  disabled={res.status === "cancelled"}
                >
                  Cancel Booking
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* 🔥 Animated Confirmation Popup */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-white p-8 rounded-2xl shadow-2xl w-96 text-center"
            >
              <div className="text-red-600 text-4xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Cancel Booking
              </h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to cancel this booking?
              </p>

              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmCancelBooking}
                  className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition"
                >
                  Yes, Cancel
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="bg-gray-300 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-400 transition"
                >
                  No, Go Back
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyReservations;
