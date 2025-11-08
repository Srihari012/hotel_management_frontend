import axios from "axios";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const UpdateBranch = ({ toggleUpdateBranch, selectedBranch, fetchBranches }) => {
  const [branch, setBranch] = useState(selectedBranch);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, type: "", message: "" });

  const showPopup = (type, message) => {
    setPopup({ show: true, type, message });
    setTimeout(() => setPopup({ show: false, type: "", message: "" }), 2500);
  };

  const handleChange = (e) => {
    setBranch({ ...branch, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(
        "https://hotel-management-backend-7yq5.onrender.com/hotel/branch",
        branch
      );
      if (response.status === 200) {
        showPopup("success", "✅ Branch updated successfully!");
        setTimeout(() => {
          fetchBranches();
          toggleUpdateBranch();
        }, 1500);
      }
    } catch (error) {
      console.error("Error updating branch:", error);
      showPopup("error", "❌ Failed to update branch. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute top-0 left-0 z-20 flex items-center justify-center w-full h-full backdrop-blur bg-black/60">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white p-8 rounded-2xl shadow-lg w-[300px] sm:w-[400px] z-40"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Update Branch
        </h2>

        <form className="space-y-4" onSubmit={handleUpdate}>
          <input
            type="text"
            name="name"
            placeholder="Branch Name"
            value={branch.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={branch.location}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            name="address"
            placeholder="Address"
            value={branch.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            rows="3"
            required
          ></textarea>
          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            value={branch.contactNumber}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            required
          />

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={toggleUpdateBranch}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded-lg text-white font-semibold transition flex items-center justify-center gap-2 ${
                loading
                  ? "bg-blue-400 cursor-not-allowed opacity-80"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? (
                <>
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                    transition={{ repeat: Infinity, duration: 1 }}
                  ></motion.div>
                  Updating...
                </>
              ) : (
                "Update Branch"
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

export default UpdateBranch;
