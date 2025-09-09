import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AddBranch from '../components/AddBranch'
import DeleteConfirmation from '../components/DeleteConfirmation';
import UpdateBranch from '../components/UpdateBranch';
import { useNavigate } from 'react-router-dom';

const PropertyAdministration = () => {

  const navigate = useNavigate();

  const [isAddBranchOpen, setIsAddBranchOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState(null);
  const [isUpdateBranchOpen, setIsUpdateBranchOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const [branches, setBranches] = useState([]);

  const toggleAddBranch = () => {
    setIsAddBranchOpen(!isAddBranchOpen);
  };

  const toggleDeleteConfirm = () => {
    setIsDeleteConfirmOpen(!isDeleteConfirmOpen);
  };

  const toggleUpdateBranch = () => {
    setIsUpdateBranchOpen(!isUpdateBranchOpen);
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await axios.get('http://localhost:8080/hotel/branch');
      setBranches(response.data);
    } catch (error) {
      console.error('Error fetching branches:', error);
      alert('Failed to fetch branches');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/hotel/branch?branchId=${selectedBranchId}`);
      setBranches(branches.filter(branch => branch.branchId !== selectedBranchId))
      setSelectedBranchId(branch.branchId)
    } catch (error) {
      console.error("Error deleting branch:", error);
    }
  };


  return (
    <div className="h-screen w-screen p-6 bg-gray-300">
      <div className="grid gap-6 
                      grid-cols-1 
                      sm:grid-cols-2 
                      md:grid-cols-3 
                      lg:grid-cols-4 
                      xl:grid-cols-5">
        
        {branches.map((branch,index) => (
          <div
            key={index}
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
            <p className="text-gray-500 font-serif text-lg italic flex flex-row gap-2">
              <img src="src/assets/location.png" alt="location icon" className='h-6' />
              {branch.location}
            </p>
            <div className="w-full flex justify-evenly gap-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white p-[7px] rounded w-full"
                onClick={() => {
                  setIsUpdateBranchOpen(true)
                  setSelectedBranch(branch)
                }}
              >
                Update
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white p-[7px] rounded w-full" 
                onClick={() =>{
                  toggleDeleteConfirm()
                  setSelectedBranchId(branch.id)}}>
                Delete
              </button>
            </div>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white p-[7px] rounded w-full mt-2"
              onClick={() => {
                navigate('/administration/rooms', { state: { branch}});
              }}>
              Manage Rooms
            </button>
          </div>
        ))}

        <div
          className="bg-gray-500 p-4 gap-5 flex flex-col justify-evenly items-center cursor-pointer hover:opacity-90 rounded-xl"
          onClick={toggleAddBranch}
        >
          <img src="src/assets/addicon.png" alt="Add Icon" className="h-40 w-40 mt-6" />
          <p className="text-white font-serif font-bold text-2xl italic">
            Add New Branch
          </p>
        </div>
      </div>

      {isAddBranchOpen && <AddBranch onClose={toggleAddBranch} />}

      {isDeleteConfirmOpen && <DeleteConfirmation toggleDeleteConfirm={toggleDeleteConfirm} handleDelete={handleDelete}/> }

      {isUpdateBranchOpen && <UpdateBranch toggleUpdateBranch={toggleUpdateBranch} selectedBranch={selectedBranch} fetchBranches={fetchBranches}/>}
    </div>
  );
};

export default PropertyAdministration;
