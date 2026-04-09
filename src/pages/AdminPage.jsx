import { useEffect, useState } from "react";
import Backendless from "../lib/backendless";

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const checkRole = async () => {
      try {
        const user = await Backendless.UserService.getCurrentUser();

        if (user && user.role === "admin") {
          setAllowed(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    checkRole();
  }, []);

  if (loading)
    return <div className="text-white p-10">Loading...</div>;

  if (!allowed)
    return (
      <div className="text-white p-10">
        Akses ditolak ❌ (Admin only)
      </div>
    );

  return (
    <div className="text-white p-10">
      <h1 className="text-3xl mb-4">Admin Dashboard 🔥</h1>
      <p>Selamat datang, admin MayStudio 🚀</p>
    </div>
  );
}