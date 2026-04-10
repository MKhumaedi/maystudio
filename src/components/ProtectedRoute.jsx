import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Backendless from "../lib/backendless";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const check = async () => {
      try {
        const user = await Backendless.UserService.getCurrentUser();

        if (user?.role === "admin") {
          setAllowed(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    check();
  }, []);

  if (loading) return <div className="text-white p-10">Loading...</div>;

  if (!allowed) return <Navigate to="/" />;

  return children;
}