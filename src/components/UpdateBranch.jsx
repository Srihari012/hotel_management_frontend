import axios from 'axios';
import React, { useState } from 'react'

const UpdateBranch = ({toggleUpdateBranch,selectedBranch,fetchBranches}) => {
    
  const [branch, setBranch] =useState(selectedBranch);
    
  const handleChange = async (e) => {
    await setBranch({ ...branch, [e.target.name]: e.target.value });
  }; 

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.put('http://localhost:8080/hotel/branch', branch);
        if (response.status === 200) {
        alert("Branch updated successfully");
        fetchBranches();
        toggleUpdateBranch();
        }
    } catch (error) {
        console.error(error);
        alert("Failed to update branch");
    }
  };

  return (
    <div className='absolute top-0 left-0 z-20 flex items-center justify-center w-full h-full backdrop-blur bg-black/60'>
        <div className='bg-white p-8 rounded-2xl shadow-lg w-[300px] sm:w-[400px] z-40'>
            <h2 className='text-2xl font-bold mb-6'>Update Branch</h2>
            <form className="space-y-4">
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
                <div className="flex justify-between mt-6">
                    <button
                    type="button"
                    className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                    onClick={toggleUpdateBranch}
                    >
                        Cancel
                    </button>
                    <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                    onClick={handleUpdate}
                    >
                        Update Branch
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default UpdateBranch