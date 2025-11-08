import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import leftarrow from "../assets/leftarrow.png";
import profileIcon from "../assets/profile.png";

const Sidebar = ({ toggleMenu, username }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const [popup, setPopup] = useState({ show: false, message: "" });

  const showPopup = (message) => {
    setPopup({ show: true, message });
    setTimeout(() => setPopup({ show: false, message: "" }), 1800);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.setItem("isAuthenticated", "false");
    showPopup("👋 Logged out successfully!");
    setTimeout(() => {
      window.location.reload();
    }, 1200);
  };

  return (
    <>
      {/* Background Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={toggleMenu}
        className="fixed top-0 left-0 w-full h-full backdrop-blur bg-black/40 z-10"
      ></motion.div>

      {/* Sidebar */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 90, damping: 15 }}
        className="fixed top-0 right-0 w-80 sm:w-96 h-full bg-gray-200 z-20 p-6 flex flex-col rounded-l-2xl shadow-2xl"
      >
        <img
          src={leftarrow}
          alt="close"
          className="h-8 w-8 mb-8 cursor-pointer"
          onClick={toggleMenu}
        />

        <div className="flex flex-col items-center">
          <motion.img
            src={profileIcon}
            alt="profile"
            className="h-24 w-24 mb-3 rounded-full bg-white shadow-md"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          />
          <h2 className="text-center text-gray-800 font-bold text-2xl mb-10">
            {username}
          </h2>
        </div>

        <ul className="flex flex-col gap-6 text-lg font-semibold text-gray-700">
          <li
            className="cursor-pointer hover:text-gray-900 transition"
            onClick={() => navigate("/MyReservations")}
          >
            My Reservations
          </li>

          {role === "ADMIN" && (
            <>
              <li
                className="cursor-pointer hover:text-gray-900 transition"
                onClick={() => navigate("/administration")}
              >
                Property Administration
              </li>
              <li
                className="cursor-pointer hover:text-gray-900 transition"
                onClick={() => navigate("/allreservations")}
              >
                All Reservations
              </li>
              <li
                className="cursor-pointer hover:text-gray-900 transition"
                onClick={() => navigate("/reports")}
              >
                Reports
              </li>
            </>
          )}
        </ul>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-600 rounded-lg mt-auto p-3 text-white font-bold shadow-md hover:bg-red-700 transition"
          onClick={handleLogout}
        >
          Logout
        </motion.button>
      </motion.div>

      {/* Logout Popup */}
      <AnimatePresence>
        {popup.show && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-8 right-8 px-6 py-4 bg-green-600 rounded-xl shadow-xl text-white font-semibold z-50"
          >
            {popup.message}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
