import { useState, useEffect } from "react";
import Backendless from "../lib/backendless";
import toast from "react-hot-toast";

export default function AuthModal({
  isOpen,
  onClose,
  type,
  setModalType,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔥 RESET FORM SAAT CLOSE
  useEffect(() => {
    if (!isOpen) {
      setName("");
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // ✅ LOGIN
  const handleLogin = async () => {
    try {
      if (!email || !password) {
        return toast.error("Email & Password wajib diisi");
      }

      await Backendless.UserService.login(email, password, true);

      const currentUser = await Backendless.UserService.getCurrentUser();

      localStorage.setItem("user", JSON.stringify(currentUser));
      window.dispatchEvent(new Event("storage"));

      toast.success("Login berhasil 🚀");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  // ✅ REGISTER + ROLE MEMBER
  const handleRegister = async () => {
    try {
      if (!name || !email || !password) {
        return toast.error("Semua field wajib diisi");
      }

      const user = new Backendless.User();

      user.name = name;
      user.email = email;
      user.password = password;

      // 🔥 WAJIB → ROLE DEFAULT
      user.role = "Member";

      await Backendless.UserService.register(user);

      // 🔥 AUTO LOGIN
      await Backendless.UserService.login(email, password, true);

      const currentUser = await Backendless.UserService.getCurrentUser();

      localStorage.setItem("user", JSON.stringify(currentUser));
      window.dispatchEvent(new Event("storage"));

      toast.success("Register berhasil 🎉");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center">
      
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative z-10 w-[380px] p-6 rounded-2xl border border-white/10 bg-[#0f0f1a]">
        
        <h2 className="text-center text-xl text-white mb-6">
          {type === "login" ? "Login" : "Register"}
        </h2>

        <div className="space-y-4">
          {type === "register" && (
            <input
              placeholder="Nama"
              className="w-full p-3 rounded bg-white/5 text-white outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            placeholder="Email"
            className="w-full p-3 rounded bg-white/5 text-white outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded bg-white/5 text-white outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={type === "login" ? handleLogin : handleRegister}
          className="w-full mt-5 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded"
        >
          {type === "login" ? "Login" : "Register"}
        </button>

        <p className="text-center text-sm text-white/50 mt-4">
          {type === "login" ? "Belum punya akun?" : "Sudah punya akun?"}
          <button
            onClick={() =>
              setModalType(type === "login" ? "register" : "login")
            }
            className="ml-2 text-purple-400 hover:underline"
          >
            {type === "login" ? "Daftar" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}