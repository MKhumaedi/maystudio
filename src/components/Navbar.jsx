import { useLocation, useNavigate, Link } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

import Backendless from "../lib/backendless";

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
  const [user, setUser] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);

  // ✅ LOAD USER (ANTI ERROR)
  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await Backendless.UserService.getCurrentUser();
        setUser(currentUser || null);
      } catch (error) {
        console.log("User belum login / error", error);
        setUser(null);
      }
    };

    loadUser();
  }, []);

  // ✅ LOGOUT AMAN
  const handleLogout = async () => {
    try {
      await Backendless.UserService.logout();
      setUser(null);
      setOpenProfile(false);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
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
          <Link to="./" className="font-bold text-lg z-10">
            Maystudio
          </Link>

          {/* MENU DESKTOP */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 gap-8 text-sm">
            {navigation.map((item) =>
              item.url.startsWith("/") ? (
                <Link key={item.id} to={item.url} className="hover:text-purple-400 transition">
                  {item.title}
                </Link>
              ) : (
                <a key={item.id} href={item.url} className="hover:text-purple-400 transition">
                  {item.title}
                </a>
              )
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="ml-auto flex items-center gap-3 relative">
            {user ? (
              <>
                {/* PROFILE CLICK */}
                <div
                  onClick={() => setOpenProfile(!openProfile)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <img
                    src={
                      user?.profileImage ||
                      `https://ui-avatars.com/api/?name=${user?.name || user?.email || "User"}`
                    }
                    alt="profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="hidden sm:block text-sm">
                    {user?.name || user?.email || "User"}
                  </span>
                </div>

                {/* ✅ DROPDOWN (FIXED) */}
                {openProfile && user && (
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

                    {/* ✅ DASHBOARD FIX */}
                    <button
                      onClick={() => navigate("/admin")}
                      className="w-full px-4 py-2 text-left hover:bg-white/10"
                    >
                      Dashboard
                    </button>

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
                <button
                  onClick={() => setModalType("register")}
                  className="hidden lg:block text-white/50 hover:text-white"
                >
                  New account
                </button>

                <Button
                  className="hidden lg:flex"
                  onClick={() => setModalType("login")}
                >
                  Sign in
                </Button>
              </>
            )}
          </div>

          {/* MOBILE BUTTON */}
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
            {navigation.map((item) =>
              item.url.startsWith("/") ? (
                <Link key={item.id} to={item.url} className="text-xl">
                  {item.title}
                </Link>
              ) : (
                <a key={item.id} href={item.url} className="text-xl">
                  {item.title}
                </a>
              )
            )}

            <div className="w-1/2 h-[1px] bg-white/10 my-6" />

            {user ? (
              <div className="flex flex-col items-center gap-4">
                <img
                  src={`https://ui-avatars.com/api/?name=${user?.name || user?.email || "User"}`}
                  className="w-16 h-16 rounded-full"
                />
                <p>{user?.name || user?.email}</p>

                <button onClick={() => navigate("/profile")}>Profile</button>
                <button onClick={() => navigate("/settings")}>Settings</button>
                <button onClick={() => navigate("/admin")}>Dashboard</button>

                <button onClick={handleLogout} className="text-red-400">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button onClick={() => setModalType("register")}>
                  New account
                </button>
                <button onClick={() => setModalType("login")}>
                  Sign in
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL */}
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