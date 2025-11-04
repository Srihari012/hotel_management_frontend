import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const LoginPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  // 🔹 Popup State
  const [popup, setPopup] = useState({ show: false, type: "", message: "" });

  // Function to show popup
  const showPopup = (type, message) => {
    setPopup({ show: true, type, message });
    setTimeout(() => setPopup({ show: false, type: "", message: "" }), 2500);
  };

  const handleLogin = async () => {
    if (!username || !Password) {
      showPopup("warning", "⚠️ Please enter both username and password.");
      return;
    }

    axios
      .post("http://localhost:8080/hotel/user/login", {
        username: username,
        password: Password,
      })
      .then((response) => {
        if (response.status === 200) {
          const res = response.data;
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("user", JSON.stringify(res));

          showPopup("success", "✅ Login Successful!");
          setTimeout(() => navigate("/home"), 1800); // navigate after success animation
        } else {
          showPopup("error", "❌ Login failed. Please check your credentials.");
        }
      })
      .catch((error) => {
        console.error("Login Error:", error);
        const msg =
          error.response?.data ||
          "❌ Login failed. Please check your credentials.";
        showPopup("error", msg);
      });
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-[url('/src/assets/loginpage.jpg')] bg-cover bg-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-300/90 rounded-2xl flex flex-col p-8 gap-4 shadow-2xl w-[90%] max-w-md"
      >
        <h1 className="text-center italic text-4xl font-serif mb-3 text-gray-800">
          Sign In
        </h1>

        <input
          type="text"
          className="bg-white p-4 rounded-2xl focus:ring-2 focus:ring-sky-600 outline-none"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="bg-white p-4 rounded-2xl focus:ring-2 focus:ring-sky-600 outline-none"
          placeholder="Password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <motion.button
          onClick={handleLogin}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-sky-900 hover:bg-sky-800 p-4 rounded-2xl text-white font-serif font-semibold transition"
        >
          Log In
        </motion.button>

        <p className="text-sm text-gray-700 mt-2 text-center">
          Don’t have an account?{" "}
          <span
            className="text-blue-600 hover:underline italic cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Create one
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

export default LoginPage;
