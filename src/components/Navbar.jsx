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
    <div className="bg-gray-300 h-[13%] w-full rounded-xl flex items-center px-2 sm:px-4 z-0 overflow-hidden">
      <img
        src={logo}
        alt="logo"
        className="h-20 sm:h-15 md:h-25 w-auto sm:mr-10"
      />

      <ul className="flex flex-wrap space-x-4 sm:space-x-8 md:space-x-12 text-gray-800 font-bold text-base sm:text-lg ml-[3%]">
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
        className="h-10 sm:h-12 w-auto ml-auto mr-3 cursor-pointer"
        onClick={toggleMenu}
      />
    </div>
  );
};

export default Navbar;
