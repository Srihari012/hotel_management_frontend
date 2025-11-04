import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const AddBranch = ({ onClose, fetchBranches }) => {
  const [branch, setBranch] = useState({
    name: "",
    location: "",
    address: "",
    contactNumber: "",
    imageUrl: "",
  });

  const [uploading, setUploading] = useState(false);
  const [popup, setPopup] = useState({ show: false, type: "", message: "" });

  const showPopup = (type, message) => {
    setPopup({ show: true, type, message });
    setTimeout(() => setPopup({ show: false, type: "", message: "" }), 2500);
  };

  const handleChange = (e) => {
    setBranch({ ...branch, [e.target.name]: e.target.value });
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
      setBranch({ ...branch, imageUrl: res.data.secure_url });
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

    if (!branch.name || !branch.location || !branch.address || !branch.contactNumber) {
      showPopup("warning", "⚠️ Please fill all required fields.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/hotel/branch", branch);
      showPopup("success", "✅ Branch added successfully!");
      setTimeout(() => {
        fetchBranches();
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error adding branch:", error);
      showPopup("error", "❌ Failed to add branch. Try again.");
    }
  };

  return (
    <div className="absolute top-0 left-0 z-20 flex items-center justify-center w-full h-full backdrop-blur bg-black/60">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white p-8 rounded-2xl shadow-lg w-[400px] sm:w-[500px]"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Branch</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <input
            type="file"
            name="imageUrl"
            accept="image/*"
            onChange={handleUpload}
            className="w-full border border-gray-300 rounded-lg p-2"
          />

          {uploading && (
            <p className="text-blue-600 text-sm italic">Uploading image...</p>
          )}

          {branch.imageUrl && (
            <img
              src={branch.imageUrl}
              alt="Branch Preview"
              className="w-full h-40 object-cover rounded-lg mt-2 border"
            />
          )}

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Save Branch
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

export default AddBranch;
