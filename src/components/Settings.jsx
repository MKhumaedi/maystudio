import { useState, useEffect } from "react";
import Backendless from "../lib/backendless";

const Settings = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    profileImage: "",
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await Backendless.UserService.getCurrentUser();

        if (currentUser) {
          setUser({
            name: currentUser.name || "",
            email: currentUser.email || "",
            password: "",
            role: currentUser.role || "member", // ✅ dari database
            profileImage: currentUser.profileImage || "",
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadUser();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const currentUser = await Backendless.UserService.getCurrentUser();

      if (!currentUser) return;

      currentUser.name = user.name;
      currentUser.email = user.email;

      if (user.password) {
        currentUser.password = user.password;
      }

      // ❌ ROLE TIDAK DIUBAH (biar aman)

      const updatedUser = await Backendless.UserService.update(currentUser);

      // optional: sync ke localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));
      window.dispatchEvent(new Event("storage"));

      alert("Profile updated!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 text-white">
      
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-semibold mb-8 text-left">Settings</h1>

        <div className="bg-[#0f0f1a] border border-white/10 rounded-2xl p-6 shadow-lg">

          {/* PROFILE */}
          <div className="flex items-center gap-4 mb-6">
            <img
              src={
                user.profileImage ||
                `https://ui-avatars.com/api/?name=${user.name || "User"}`
              }
              alt="profile"
              className="w-14 h-14 rounded-full border border-white/20"
            />
            <div>
              <p className="font-medium">{user.name || "User"}</p>
              <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full">
                {user.role || "User"}
              </span>
            </div>
          </div>

          {/* INPUT */}
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full px-4 py-3 rounded-lg bg-[#1a1a2e] border border-white/10 focus:outline-none focus:border-purple-500"
            />

            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg bg-[#1a1a2e] border border-white/10 focus:outline-none focus:border-purple-500"
            />

            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg bg-[#1a1a2e] border border-white/10 focus:outline-none focus:border-purple-500"
            />

            {/* 🔥 ROLE READ ONLY */}
            <select
              name="role"
              value={user.role}
              disabled
              className="w-full px-4 py-3 rounded-lg bg-[#1a1a2e] border border-white/10 opacity-70 cursor-not-allowed"
            >
              <option value="member">member</option>
              <option value="admin">admin</option>
            </select>
          </div>

          <button
            onClick={handleSubmit}
            className="mt-6 w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;