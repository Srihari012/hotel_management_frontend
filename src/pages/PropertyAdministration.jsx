import React, { useEffect, useState } from "react";
import axios from "axios";
import AddBranch from "../components/AddBranch";
import DeleteConfirmation from "../components/DeleteConfirmation";
import UpdateBranch from "../components/UpdateBranch";
import { useNavigate } from "react-router-dom";
import leftarrow from "../assets/leftarrow.png";
import { motion } from "framer-motion";
import locationIcon from "../assets/location.png";
import addIcon from "../assets/addicon.png";

const PropertyAdministration = () => {
  const navigate = useNavigate();

  const [isAddBranchOpen, setIsAddBranchOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState(null);
  const [isUpdateBranchOpen, setIsUpdateBranchOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleAddBranch = () => setIsAddBranchOpen(!isAddBranchOpen);
  const toggleDeleteConfirm = () => setIsDeleteConfirmOpen(!isDeleteConfirmOpen);
  const toggleUpdateBranch = () => setIsUpdateBranchOpen(!isUpdateBranchOpen);

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://hotel-management-backend-7yq5.onrender.com/hotel/branch"
      );
      setBranches(response.data);
    } catch (error) {
      console.error("Error fetching branches:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://hotel-management-backend-7yq5.onrender.com/hotel/branch?branchId=${selectedBranchId}`
      );
      setBranches(branches.filter((b) => b.branchId !== selectedBranchId));
      setSelectedBranchId(null);
      toggleDeleteConfirm();
    } catch (error) {
      console.error("Error deleting branch:", error);
    }
  };

  return (
    <div className="h-screen w-screen p-6 bg-gray-300">
      <div
        className="flex flex-row justify-start items-center gap-3 mb-6 cursor-pointer"
        onClick={() => window.history.back()}
      >
        <img
          src={leftarrow}
          alt="Back"
          className="h-13 w-18 bg-gray-400 p-2 px-3 rounded"
        />
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center h-[70vh]">
          <motion.div
            className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"
            transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
          ></motion.div>
          <p className="text-gray-700 text-lg mt-4 font-serif italic">
            Loading branches...
          </p>
        </div>
      ) : (
        <div
          className="grid gap-6 
                      grid-cols-1 
                      sm:grid-cols-2 
                      md:grid-cols-3 
                      lg:grid-cols-4 
                      xl:grid-cols-5"
        >
          {branches.map((branch, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white p-4 gap-4 flex flex-col justify-evenly items-center cursor-pointer hover:opacity-90 rounded-xl shadow-lg h-full"
            >
              <img
                src={branch.imageUrl}
                alt={branch.name}
                className="h-40 w-40 mt-6 rounded-xl object-cover"
              />
              <p className="text-gray-700 font-serif font-bold text-2xl italic">
                {branch.name}
              </p>
              <p className="text-gray-500 font-serif text-lg italic flex flex-row gap-2 items-center">
                <img src={locationIcon} alt="location" className="h-6" />
                {branch.location}
              </p>
              <div className="w-full flex justify-evenly gap-4">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white p-[7px] rounded w-full"
                  onClick={() => {
                    setIsUpdateBranchOpen(true);
                    setSelectedBranch(branch);
                  }}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white p-[7px] rounded w-full"
                  onClick={() => {
                    setSelectedBranchId(branch.branchId);
                    toggleDeleteConfirm();
                  }}
                >
                  Delete
                </button>
              </div>
              <button
                className="bg-emerald-500 hover:bg-emerald-600 text-white p-[7px] rounded w-full mt-2"
                onClick={() => {
                  navigate("/administration/rooms", { state: { branch } });
                }}
              >
                Manage Rooms
              </button>
            </motion.div>
          ))}

          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={toggleAddBranch}
            className="bg-gray-500 p-4 gap-5 flex flex-col justify-evenly items-center cursor-pointer hover:opacity-90 rounded-xl shadow-md"
          >
            <img src={addIcon} alt="Add Icon" className="h-40 w-40 mt-6" />
            <p className="text-white font-serif font-bold text-2xl italic">
              Add New Branch
            </p>
          </motion.div>
        </div>
      )}

      {isAddBranchOpen && (
        <AddBranch onClose={toggleAddBranch} fetchBranches={fetchBranches} />
      )}

      {isDeleteConfirmOpen && (
        <DeleteConfirmation
          toggleDeleteConfirm={toggleDeleteConfirm}
          handleDelete={handleDelete}
        />
      )}

      {isUpdateBranchOpen && (
        <UpdateBranch
          toggleUpdateBranch={toggleUpdateBranch}
          selectedBranch={selectedBranch}
          fetchBranches={fetchBranches}
        />
      )}
    </div>
  );
};

export default PropertyAdministration;
