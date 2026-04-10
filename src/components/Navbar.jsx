import { useLocation, useNavigate, Link } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import { useAuth } from "../context/AuthProvider";

import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg.jsx";
import AuthModal from "./AuthModal";

const navigation = [
  { id: "0", title: "About", url: "#about" },
  { id: "1", title: "Features", url: "#features" },
  { id: "2", title: "Pricing", url: "#pricing" },
  { id: "3", title: "How to use", url: "#how-to-use" },
  { id: "4", title: "Roadmap", url: "#roadmap" },
  { id: "5", title: "Template", url: "/templates" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [openNavigation, setOpenNavigation] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);

  // ✅ AMBIL DARI AUTH PROVIDER (NO API CALL)
  const { user, logout } = useAuth();

  const isAdmin = user?.role?.toLowerCase() === "admin";

  // 🔥 NAVIGATION FIX
  const handleNavigate = (item) => {
    if (item.url.startsWith("#")) {
      if (location.pathname !== "/") {
        navigate("/");

        setTimeout(() => {
          const el = document.querySelector(item.url);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 300);
      } else {
        const el = document.querySelector(item.url);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(item.url);
    }
  };

  const handleLogout = async () => {
    await logout(); // 🔥 pakai context
    setOpenProfile(false);
    navigate("/");
  };

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-[9999] border-b border-white/10 bg-[#0b0b15]/90 backdrop-blur">
        <div className="relative flex items-center px-5 lg:px-10 py-4 text-white">

          {/* LOGO */}
          <Link to="/" className="font-bold text-lg z-10">
            Maystudio
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 gap-8 text-sm">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item)}
                className="hover:text-purple-400 transition"
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* RIGHT */}
          <div className="ml-auto flex items-center gap-3 relative">
            {user ? (
              <>
                <div
                  onClick={() => setOpenProfile(!openProfile)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <img
                    src={`https://ui-avatars.com/api/?name=${user?.name || user?.email}`}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="hidden sm:block text-sm">
                    {user?.name || user?.email}
                  </span>
                </div>

                {openProfile && (
                  <div className="absolute right-0 top-12 w-44 bg-[#0f0f1a] border border-white/10 rounded-lg overflow-hidden">

                    <button
                      onClick={() => navigate("/profile")}
                      className="w-full px-4 py-2 text-left hover:bg-white/10"
                    >
                      Profile
                    </button>

                    <button
                      onClick={() => navigate("/settings")}
                      className="w-full px-4 py-2 text-left hover:bg-white/10"
                    >
                      Settings
                    </button>

                    {isAdmin && (
                      <button
                        onClick={() => navigate("/admin")}
                        className="w-full px-4 py-2 text-left hover:bg-white/10"
                      >
                        Dashboard
                      </button>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-red-400 hover:bg-white/10"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                <button onClick={() => setModalType("register")}>
                  New account
                </button>

                <Button onClick={() => setModalType("login")}>
                  Sign in
                </Button>
              </>
            )}
          </div>

          {/* MOBILE */}
          <Button className="ml-3 lg:hidden" onClick={toggleNavigation}>
            <MenuSvg openNavigation={openNavigation} />
          </Button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {openNavigation && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 top-[70px] bg-[#0b0b15]/95 backdrop-blur-xl flex flex-col items-center pt-12 gap-6 text-white z-[9998]"
          >
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  handleNavigate(item);
                  setOpenNavigation(false);
                }}
                className="text-xl"
              >
                {item.title}
              </button>
            ))}

            <div className="w-1/2 h-[1px] bg-white/10 my-6" />

            {user && (
              <>
                <button onClick={() => navigate("/profile")}>Profile</button>
                <button onClick={() => navigate("/settings")}>Settings</button>

                {isAdmin && (
                  <button onClick={() => navigate("/admin")}>
                    Dashboard
                  </button>
                )}

                <button onClick={handleLogout} className="text-red-400">
                  Logout
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal
        isOpen={modalType !== null}
        type={modalType}
        setModalType={setModalType}
        onClose={() => setModalType(null)}
      />
    </>
  );
};

export default Navbar;