import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const { user } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.location.reload();
  };

  const userInitial = (user?.displayName || user?.email || "?")
    .charAt(0)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-20 w-full bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white grid place-items-center font-bold">SZ</div>
          <span className="hidden sm:block text-gray-700 font-semibold">StudyZone</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="w-64 rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-9 h-9 rounded-full bg-gray-100 border border-gray-300 grid place-items-center text-sm text-gray-700">
            {user?.photoURL ? (
              // eslint-disable-next-line jsx-a11y/alt-text
              <img src={user.photoURL} className="w-9 h-9 rounded-full object-cover" />
            ) : (
              <span>{userInitial}</span>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="ml-1 rounded-md bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 px-3 py-1.5 text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

