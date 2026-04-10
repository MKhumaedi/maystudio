import { createContext, useContext, useEffect, useState } from "react";
import Backendless from "../lib/backendless";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // INIT USER
  useEffect(() => {
    const init = async () => {
      try {
        const currentUser = await Backendless.UserService.getCurrentUser();

        if (currentUser) {
          setUser(currentUser);
          localStorage.setItem("user", JSON.stringify(currentUser));
        } else {
          setUser(null);
          localStorage.removeItem("user");
        }
      } catch (err) {
        console.error(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    init();

    // 🔥 GLOBAL SYNC
    const syncUser = () => {
      const stored = localStorage.getItem("user");
      setUser(stored ? JSON.parse(stored) : null);
    };

    window.addEventListener("authChanged", syncUser);

    return () => {
      window.removeEventListener("authChanged", syncUser);
    };
  }, []);

  // LOGIN
  const login = async (email, password) => {
    const res = await Backendless.UserService.login(email, password, true);

    setUser(res);
    localStorage.setItem("user", JSON.stringify(res));

    window.dispatchEvent(new Event("authChanged"));

    return res;
  };

  // 🔥 LOGOUT FIX
  const logout = async () => {
    try {
      await Backendless.UserService.logout();
    } catch (err) {
      console.warn(err);
    }

    setUser(null);
    localStorage.removeItem("user");

    window.dispatchEvent(new Event("authChanged"));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);