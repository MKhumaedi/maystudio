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

  // 🔥 DETECT ADMIN PAGE
  const isAdminPage = path === "/admin";

  // 🔥 ADMIN PAGE (NO NAVBAR, NO FOOTER)
  if (isAdminPage) {
    return (
      <>
        <Toaster position="top-right" />
        <AdminPage />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Toaster position="top-right" />

      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Navbar />

        {path === "/profile" ? (
          <Profile />
        ) : path === "/settings" ? (
          <Settings />
        ) : path === "/templates" ? (
          <Templates />
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

        <Footer />
      </div>
    </>
  );
}

export default App;