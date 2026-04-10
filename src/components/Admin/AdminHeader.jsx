import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Backendless from "../../lib/backendless";

export default function AdminHeader() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // 🔥 LOAD USER
  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await Backendless.UserService.getCurrentUser();
        setUser(currentUser);
      } catch {
        setUser(null);
      }
    };

    loadUser();
  }, []);

  // 🔥 CLICK OUTSIDE (FIX)
  useEffect(() => {
    const handleClickOutside = () => {
      setOpen(false);
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // 🔥 LOGOUT
  const handleLogout = async () => {
    try {
      await Backendless.UserService.logout();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return null;

  return (
    <div className="flex justify-end items-center mb-6 relative">

      {/* 🔥 AVATAR */}
      <div
        onClick={(e) => {
          e.stopPropagation(); // ✅ FIX BUG
          setOpen(!open);
        }}
        className="flex items-center gap-2 cursor-pointer"
      >
        <img
          src={`https://ui-avatars.com/api/?name=${user?.email || "User"}`}
          className="w-8 h-8 rounded-full"
        />
        <span className="text-sm">{user?.email}</span>
      </div>

      {/* 🔥 DROPDOWN */}
      {open && (
        <div
          onClick={(e) => e.stopPropagation()} // ✅ FIX BUG
          className="absolute right-0 top-12 w-44 bg-[#0f0f1a] border border-white/10 rounded-lg overflow-hidden shadow-lg z-50"
        >

          {/* PROFILE */}
          <button
            onClick={() => {
              navigate("/profile");
              setOpen(false);
            }}
            className="w-full px-4 py-2 text-left hover:bg-white/10"
          >
            Profile
          </button>

          {/* SETTINGS */}
          <button
            onClick={() => {
              navigate("/settings");
              setOpen(false);
            }}
            className="w-full px-4 py-2 text-left hover:bg-white/10"
          >
            Settings
          </button>

          {/* PUBLIC WEBSITE */}
          <button
            onClick={() => {
              navigate("/");
              setOpen(false);
            }}
            className="w-full px-4 py-2 text-left hover:bg-white/10 text-blue-400"
          >
            View Website
          </button>

          <div className="border-t border-white/10" />

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left text-red-400 hover:bg-white/10"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}