import React, { useState } from "react";
import axios from "axios";

const AddBranch = ({ onClose }) => {
  const [branch, setBranch] = useState({
    name: "",
    location: "",
    address: "",
    contactNumber: "",
    imageUrl: ""
  });

  const handleChange = (e) => {
    setBranch({ ...branch, [e.target.name]: e.target.value });
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "hotel-management"); // Cloudinary preset
    data.append("cloud_name", "dyixwovtl");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dyixwovtl/image/upload",
        data
      );
      setBranch({ ...branch, imageUrl: res.data.url });
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Failed to upload image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/hotel/branch", branch);
      alert("Branch added successfully!");
      onClose(); 
    } catch (error) {
      console.error("Error adding branch:", error);
      alert("Failed to add branch");
    }
  };

  return (
    <div className="absolute top-0 left-0 z-20 flex items-center justify-center w-full h-full backdrop-blur bg-black/60">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px] sm:w-[500px]">
        <h2 className="text-2xl font-bold mb-6">Add New Branch</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Branch Name"
            value={branch.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={branch.location}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
          <textarea
            name="address"
            placeholder="Address"
            value={branch.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            rows="3"
            required
          ></textarea>
          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            value={branch.contactNumber}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
          <input
            type="file"
            name="imageUrl"
            accept="image/*"
            onChange={handleUpload}
            className="w-full border border-gray-300 rounded-lg p-2"
          />

          {/* Show preview if image uploaded */}
          {branch.imageUrl && (
            <img
              src={branch.imageUrl}
              alt="Branch Preview"
              className="w-full h-40 object-cover rounded-lg mt-2"
            />
          )}

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Save Branch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBranch;
