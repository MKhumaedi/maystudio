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

  // 🔥 CLOSE DROPDOWN SAAT CLICK LUAR
  useEffect(() => {
    const handleClickOutside = () => setOpen(false);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  // 🔥 LOGOUT
  const handleLogout = async () => {
    await Backendless.UserService.logout();
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="flex justify-end items-center mb-6 relative">

      {/* USER */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className="flex items-center gap-3 cursor-pointer"
      >
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm">
          {user.email?.charAt(0).toUpperCase()}
        </div>

        <span className="text-sm">{user.email}</span>
      </div>

      {/* DROPDOWN */}
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute right-0 top-12 w-48 bg-[#0f0f1a] border border-white/10 rounded-xl shadow-lg p-2 z-50"
        >

          <button
            onClick={() => navigate("/profile")}
            className="block w-full text-left px-4 py-2 hover:bg-white/5 rounded-lg"
          >
            Profile
          </button>

          <button
            onClick={() => navigate("/settings")}
            className="block w-full text-left px-4 py-2 hover:bg-white/5 rounded-lg"
          >
            Settings
          </button>

          {/* 🔥 ONLY ADMIN */}
          {user?.role?.toLowerCase() === "admin" && (
            <button
              onClick={() => navigate("./")}
              className="block w-full text-left px-4 py-2 hover:bg-white/5 rounded-lg"
            >
              View Website
            </button>
          )}

          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-red-400 hover:bg-white/5 rounded-lg"
          >
            Logout
          </button>

        </div>
      )}
    </div>
  );
}