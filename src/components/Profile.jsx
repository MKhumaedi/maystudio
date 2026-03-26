import { useEffect, useState } from "react";
import Backendless from "../lib/backendless";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await Backendless.UserService.getCurrentUser();

        if (!currentUser) {
          setUser(null);
        } else {
          setUser(currentUser);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) return <div className="text-white p-10">Loading...</div>;

  if (!user)
    return (
      <div className="text-white p-10">
        Kamu belum login ❌
      </div>
    );

  return (
    <div className="min-h-screen text-white p-10">
      <h1 className="text-3xl mb-6">Profile</h1>

      <div className="bg-[#0f0f1a] p-6 rounded-xl border border-white/10 w-[400px]">
        
        <div className="flex items-center gap-4 mb-6">
          <img
            src={`https://ui-avatars.com/api/?name=${user?.name}`}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-xl">{user?.name}</h2>
            <p className="text-white/50">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}