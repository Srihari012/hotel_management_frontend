import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const RegistrationPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popup, setPopup] = useState({ show: false, type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const showPopup = (type, message) => {
    setPopup({ show: true, type, message });
    setTimeout(() => setPopup({ show: false, type: "", message: "" }), 2500);
  };

  const handleRegister = async () => {
    if (!username || !email || !password) {
      showPopup("warning", "⚠️ All fields are required!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showPopup("warning", "⚠️ Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      showPopup("warning", "⚠️ Password must be at least 6 characters long.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "https://hotel-management-backend-7yq5.onrender.com/hotel/user/register",
        { username, email, password }
      );

      if (response.status === 201) {
        showPopup("success", "✅ Registration Successful! Please login.");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        showPopup("error", "❌ Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response?.data?.message) {
        showPopup("error", `❌ ${error.response.data.message}`);
      } else {
        showPopup("error", "❌ Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-[url('/src/assets/registrationpage.jpg')] bg-cover bg-center relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-300/90 rounded-2xl flex flex-col p-8 gap-4 shadow-2xl w-[90%] max-w-md"
      >
        <h1 className="text-center italic text-4xl font-serif mb-3 text-gray-800">
          Register
        </h1>

        <input
          type="text"
          className="bg-white p-4 rounded-2xl focus:ring-2 focus:ring-sky-600 outline-none"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          className="bg-white p-4 rounded-2xl focus:ring-2 focus:ring-sky-600 outline-none"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="bg-white p-4 rounded-2xl focus:ring-2 focus:ring-sky-600 outline-none"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <motion.button
          whileHover={!loading ? { scale: 1.05 } : {}}
          whileTap={!loading ? { scale: 0.95 } : {}}
          disabled={loading}
          onClick={handleRegister}
          className={`p-4 rounded-2xl text-white font-serif font-semibold transition flex items-center justify-center gap-2 ${
            loading
              ? "bg-sky-700 cursor-not-allowed opacity-80"
              : "bg-sky-900 hover:bg-sky-800"
          }`}
        >
          {loading ? (
            <>
              <motion.div
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                transition={{ repeat: Infinity, duration: 1 }}
              ></motion.div>
              Signing up...
            </>
          ) : (
            "Sign Up"
          )}
        </motion.button>

        <p className="text-sm text-gray-700 mt-2 text-center">
          Already have an account?{" "}
          <span
            className="text-blue-600 hover:underline italic cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Sign In
          </span>
        </p>
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

export default RegistrationPage;
