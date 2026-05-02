import { useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import Footer from "./Footer";

function Navbar({ children }) {

  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="app-container">

      {/* HEADER */}
      <Header toggleSidebar={toggleSidebar} />

      {/* BODY */}
      <div className="body-container">

        {/* ✅ ALWAYS SHOW SIDEBAR */}
        <SideBar isOpen={isOpen} />

        {/* MAIN */}
        <main className={`main ${isOpen ? "shift" : ""}`}>
          {children}
        </main>

      </div>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}

export default Navbar;