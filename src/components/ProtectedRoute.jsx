import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Backendless from "../lib/backendless";

export default function ProtectedRoute({ children, role }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const user = await Backendless.UserService.getCurrentUser();

        // ❌ BELUM LOGIN
        if (!user) {
          navigate("/");
          return;
        }

        // ❌ ROLE TIDAK SESUAI
        if (role && user.role?.toLowerCase() !== role.toLowerCase()) {
          navigate("/");
          return;
        }

      } catch (err) {
        console.error(err);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, [navigate, role]);

  if (loading) {
    return (
      <div className="text-white p-10">
        Checking access...
      </div>
    );
  }

  return children;
}