import React from "react";

import logo from "../assets/logo.png";
import menuIcon from "../assets/menu.png";

const Navbar = ({ toggleMenu }) => {
  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gray-300 h-[13%] w-screen rounded-xl flex items-center px-6 z-0">
      <img
        src={logo}
        alt="logo"
        className="h-30 w-auto sm:mr-10"
      />

      <ul className="flex space-x-8 text-gray-800 font-bold text-lg sm:gap-8 ml-[3%]">
        <li
          className="cursor-pointer hover:text-blue-800"
          onClick={() => handleScroll("about")}
        >
          About Us
        </li>
        <li
          className="cursor-pointer hover:text-blue-800"
          onClick={() => handleScroll("services")}
        >
          Services
        </li>
        <li
          className="cursor-pointer hover:text-blue-800"
          onClick={() => handleScroll("contact")}
        >
          Contact
        </li>
      </ul>

      <img
        src={menuIcon}
        alt="menu"
        className="h-12 w-auto ml-auto mr-3 cursor-pointer"
        onClick={toggleMenu}
      />
    </div>
  );
};

export default Navbar;
