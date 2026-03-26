import { useEffect, useState } from "react";
import Backendless from "../lib/backendless";
import toast from "react-hot-toast";

export default function Settings() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await Backendless.UserService.getCurrentUser();

        if (!currentUser) {
          setUser(null);
        } else {
          setUser(currentUser);
          setName(currentUser.name || "");
          setEmail(currentUser.email || "");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const handleUpdate = async () => {
    try {
      if (!user) return;

      user.name = name;
      user.email = email;

      if (password) user.password = password;

      const updatedUser = await Backendless.UserService.update(user);

      localStorage.setItem("user", JSON.stringify(updatedUser));
      window.dispatchEvent(new Event("storage"));

      toast.success("Profile updated 🚀");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  if (loading) return <div className="text-white p-10">Loading...</div>;

  if (!user)
    return (
      <div className="text-white p-10">
        Kamu belum login ❌
      </div>
    );

  return (
    <div className="min-h-screen text-white p-10">
      <h1 className="text-3xl mb-6">Settings</h1>

      <div className="bg-[#0f0f1a] p-6 rounded-xl border border-white/10 w-[400px] space-y-4">
        
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded bg-white/5 text-white"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded bg-white/5 text-white"
        />

        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded bg-white/5 text-white"
          placeholder="New Password"
        />

        <button
          onClick={handleUpdate}
          className="w-full py-3 bg-purple-500 rounded"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}