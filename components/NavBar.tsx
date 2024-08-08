import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { twMerge } from "tailwind-merge";

export const NavBar = () => {
  const router = useRouter();
  const activePage = router.pathname;
  return (
    <nav className="bg-gray-700 shadow-md w-100">
      <div className="container p-4 mx-auto flex  items-center gap-5 max-w-xl ">
        <Link
          href="/"
          className={twMerge(
            "text-white hover:text-gray-400 transition duration-300 ease-in-out pointer",
            activePage === "/" ? "text-orange-500" : ""
          )}
        >
          Home
        </Link>
        <Link
          href="/posts"
          className={twMerge(
            "text-white hover:text-gray-400 transition duration-300 ease-in-out pointer",
            activePage.includes("/posts") ? "text-orange-500" : ""
          )}
        >
          Feed
        </Link>
      </div>
    </nav>
  );
};
