"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiLogOut } from "react-icons/fi";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";

const userEmail = "vedavrat";

export const Navbar = () => {
  const [showProfile, setShowProfile] = useState(false);
  const router = useRouter();
  const profileRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) => pathname === path;

  const handleLogout = () => {
    Cookies.remove("auth_token");
    router.push("/auth/login");
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex">
            <Link
              href="/dashboard"
              className={`flex items-center px-4 ${
                isActive("/dashboard")
                  ? "text-blue-600 font-medium border-b-2 border-blue-600"
                  : "text-gray-900 hover:text-gray-600"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/companies"
              className={`flex items-center px-4 ${
                isActive("/companies")
                  ? "text-blue-600 font-medium border-b-2 border-blue-600"
                  : "text-gray-900 hover:text-gray-600"
              }`}
            >
              Companies
            </Link>
          </div>

          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <FiUser className="mr-2" />
              Profile
            </button>

            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1"
                >
                  <div className="px-4 py-2 text-sm text-gray-700">
                    {userEmail}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FiLogOut className="mr-2" />
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
};
