import React from "react";
import Link from "next/link";

export const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-md w-100">
      <div className="container mx-auto flex  items-center gap-5 max-w-xl">
        <Link href="/" className="text-white hover:text-gray-400 transition duration-300 ease-in-out pointer">
            Home
        </Link>
        <Link href="/feed" className="text-white hover:text-gray-400 transition duration-300 ease-in-out pointer">
            Feed
        </Link>
      </div>
    </nav>
  );
};
