import { useLocation } from "react-router-dom";

import Benefits from "./sections/Benefits";
import Collaboration from "./sections/Collaboration";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Pricing from "./sections/Pricing";
import Roadmap from "./sections/Roadmap";
import Services from "./sections/Services";
import About from "./sections/About";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import Templates from "./sections/Templates";
import AdminPage from "./pages/AdminPage";

import { Toaster } from "react-hot-toast";

function App() {
  const location = useLocation();
  const path = location.pathname;

  const isAdminPage = path.startsWith("/admin");

  return (
    <>
      <Toaster position="top-right" />

      {/* ✅ FIX DISINI */}
      <div
        className={`overflow-hidden ${
          isAdminPage
            ? "" // ❌ TANPA PADDING
            : "pt-[4.75rem] lg:pt-[5.25rem]" // ✅ PUBLIC PAGE
        }`}
      >

        {!isAdminPage && <Navbar />}

        {path === "/profile" ? (
          <Profile />
        ) : path === "/settings" ? (
          <Settings />
        ) : path === "/templates" ? (
          <Templates />
        ) : path === "/admin" ? (
          <AdminPage />
        ) : (
          <>
            <Hero />
            <Benefits />
            <Collaboration />
            <Services />
            <Pricing />
            <Roadmap />
            <About />
          </>
        )}

        {!isAdminPage && <Footer />}
      </div>
    </>
  );
}

export default App;