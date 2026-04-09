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
  const [loading, setLoading] = useState(false);

  // 🔥 RESET FORM
  useEffect(() => {
    if (!isOpen) {
      setName("");
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // ================= LOGIN =================
  const handleLogin = async () => {
    try {
      if (!email || !password) {
        return toast.error("Email & Password wajib diisi");
      }

      setLoading(true);

      // 🔥 LOGIN
      const user = await Backendless.UserService.login(
        email,
        password,
        true
      );

      // 🔥 SIMPAN USER
      localStorage.setItem("user", JSON.stringify(user));
      window.dispatchEvent(new Event("storage"));

      toast.success("Login berhasil 🚀");
      onClose();
    } catch (err) {
      console.error("LOGIN ERROR:", err);

      // 🔥 HANDLE ERROR SESSION
      if (
        err.message.includes("multiple concurrent logins") ||
        err.message.includes("User already logged in")
      ) {
        toast.error("User sudah login di device lain ❌");
      } else {
        toast.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // ================= REGISTER =================
  const handleRegister = async () => {
    try {
      if (!name || !email || !password) {
        return toast.error("Semua field wajib diisi");
      }

      setLoading(true);

      const user = new Backendless.User();

      user.name = name;
      user.email = email;
      user.password = password;

      // 🔥 FIX: role harus lowercase
      user.role = "member";

      await Backendless.UserService.register(user);

      // 🔥 AUTO LOGIN
      const loggedInUser = await Backendless.UserService.login(
        email,
        password,
        true
      );

      localStorage.setItem("user", JSON.stringify(loggedInUser));
      window.dispatchEvent(new Event("storage"));

      toast.success("Register berhasil 🎉");
      onClose();
    } catch (err) {
      console.error("REGISTER ERROR:", err);
      toast.error(err.message);
    } finally {
      setLoading(false);
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
          disabled={loading}
          className="w-full mt-5 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded"
        >
          {loading
            ? "Loading..."
            : type === "login"
            ? "Login"
            : "Register"}
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