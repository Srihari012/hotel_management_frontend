import React from 'react';

const Navbar = ({toggleMenu}) => {

  return (
    <div className="bg-gray-300 h-[13%] w-screen rounded flex items-center px-6 z-0">

      <img 
        src="src/assets/logo.png" 
        alt="logo" 
        className="h-20 w-auto sm:mr-10" 
      />

      <ul className="flex space-x-8 text-gray-800 font-bold text-lg sm:gap-8">
        <li className="cursor-pointer hover:text-blue-800">Home</li>
        <li className="cursor-pointer hover:text-blue-800">Locations</li>
        <li className="cursor-pointer hover:text-blue-800">Contact</li>
        <li className="cursor-pointer hover:text-blue-800">Services</li>
      </ul>

      <img
        src="src/assets/menu.png"
        alt="menu"
        className="h-12 w-auto ml-auto mr-3 cursor-pointer"
        onClick={toggleMenu}
      />
    </div>
  );
};

export default Navbar;
