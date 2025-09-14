import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-900 w-full p-4 text-lg md:text-xl text-[#3BFFFF] font-semibold flex justify-between items-center">
      <Link to="/" className="hover:text-yellow-300 transition">Send Email</Link>
      <Link to="/history" className="hover:text-yellow-300 transition">History</Link>
    </nav>
  );
};

export default Navbar;
