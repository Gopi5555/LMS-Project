import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

function Navbar({ children }) {
    return (
        <div className="app-layout">
            <Header/>
            <main className="main-content">
                {children}
            </main>
            <Footer />
        </div>
    );
}
export default Navbar;