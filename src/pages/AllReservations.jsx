import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AllReservations = () => {
  const [Bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchAllBookings();
  }, []); // ✅ fixed infinite loop

  const fetchAllBookings = async () => {
    try {
      const fetchBookings = await axios.get("http://localhost:8080/hotel/booking");
      setBookings(fetchBookings.data);
    } catch (error) {
      console.error("Error fetching all bookings", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 to-yellow-200 p-8">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center text-green-800 mb-10 drop-shadow-lg"
      >
        All Reservations
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="overflow-x-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-xl"
      >
        <table className="min-w-full text-center border-collapse">
          <thead className="bg-blue-600 text-white text-lg">
            <tr>
              <th className="py-4 px-6">#</th>
              <th className="py-4 px-6">Booking ID</th>
              <th className="py-4 px-6">User ID</th>
              <th className="py-4 px-6">Room ID</th>
              <th className="py-4 px-6">Check-In</th>
              <th className="py-4 px-6">Check-Out</th>
              <th className="py-4 px-6">Status</th>
            </tr>
          </thead>

          <motion.tbody
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.08 },
              },
            }}
          >
            {Bookings.map((booking, index) => (
              <motion.tr
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="hover:bg-green-100 transition"
              >
                <td className="py-4 px-6 font-semibold">{index + 1}</td>
                <td className="py-4 px-6 text-blue-700 font-bold">{booking.bookingId}</td>
                <td className="py-4 px-6">{booking.userId}</td>
                <td className="py-4 px-6">{booking.roomId}</td>
                <td className="py-4 px-6">{new Date(booking.checkInDate).toLocaleDateString()}</td>
                <td className="py-4 px-6">{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-4 py-1 rounded-full text-white font-semibold shadow-md ${
                      booking.status.toLowerCase() === "confirmed"
                        ? "bg-green-500"
                        : booking.status.toLowerCase() === "cancelled"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default AllReservations;
