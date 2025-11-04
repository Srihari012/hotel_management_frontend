import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";

const Sidebar = ({toggleMenu,username}) => {

  const navigate = useNavigate()
  const role = JSON.parse(localStorage.getItem('user')).role;

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.setItem('isAuthenticated', 'false');
    window.location.reload();
  }

  return (
    <div>
        <div 
            className='fixed top-0 left-0 w-full h-full backdrop-blur bg-white/30 z-10'
            onClick={toggleMenu}>
        </div>
        <div className='fixed top-0 right-0 w-90 h-full bg-gray-300 z-20 p-6 flex flex-col rounded'>
            <img
                src="src/assets/leftarrow.png"
                alt="close"
                className='h-8 w-auto ml-0 mr-auto mb-10 cursor-pointer'
                onClick={toggleMenu}
            />

            <img 
                src="src/assets/profile.png" 
                alt="profile"
                className='mx-20'
            />

            <h2 className='text-center text-gray-800 font-bold text-2xl mt-4 mb-10'>{username}</h2>

            <ul>
                <li 
                    className='mb-6 text-gray-700 font-semibold text-lg cursor-pointer hover:text-gray-900' 
                    onClick={() => navigate('/MyReservations')}>
                        My Reservations
                </li>
                {role === "ADMIN" && (
                    <>
                    <li
                        className="mb-6 text-gray-700 font-semibold text-lg cursor-pointer hover:text-gray-900"
                        onClick={() => navigate("/administration")}
                    >
                        Property Administration
                    </li>
                    <li
                        className="mb-6 text-gray-700 font-semibold text-lg cursor-pointer hover:text-gray-900"
                        onClick={() => navigate("/allreservations")}
                    >
                        All Reservations
                    </li>
                    <li
                        className="mb-6 text-gray-700 font-semibold text-lg cursor-pointer hover:text-gray-900"
                        onClick={() => navigate("/reports")}
                    >
                        Reports
                    </li>
                    </>
                )}
            </ul>



            <button 
                className='bg-red-600 rounded mt-auto p-3 text-white font-bold'
                onClick={handleLogout}
            >
                Logout
            </button>
            
        </div>
    </div>
  )
}

export default Sidebar