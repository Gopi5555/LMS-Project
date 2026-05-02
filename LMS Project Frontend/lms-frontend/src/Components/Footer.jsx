import React from "react";
import { FaGlobe, FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import "../styles/footer.css";
function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* About */}
                <div className="footer-section">
                    <h3>Vcube</h3>
                    <p>
                        Build skills that matter with hands-on training, live projects, and career-focused programs.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <a href="/">Home</a>
                    <a href="/dashboard">Dashboard</a>
                    <a href="/courses">Courses</a>

                </div>

                {/* Contact */}
                <div className="footer-section">
                    <h4>Contact</h4>
                    <p>Email: support@lms.com</p>
                    <p>Phone: +91 9876543210</p>
                    <p>Location: India</p>
                </div>

                <div className="footer-section">
                    <h4>Follow Us</h4>
                    <div className="social-icons">
                        <a href="https://vcubesoftsolutions.com" target="_blank" rel="noopener noreferrer">
                            <FaGlobe />
                        </a>
                        <a href="https://www.facebook.com/VCubeSoftwareSolutions" target="_blank" rel="noopener noreferrer">
                            <FaFacebook />
                        </a>
                        <a href="https://www.instagram.com/vcube.in" target="_blank" rel="noopener noreferrer">
                            <FaInstagram />
                        </a>
                        <a href="https://x.com/_vcube" target="_blank" rel="noopener noreferrer">
                            <FaTwitter />
                        </a>
                        <a href="https://in.linkedin.com/company/v-cube-software-solutions-pvt-ltd-official" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin />
                        </a>
                    </div>
                </div>

            </div>
            <div className="footer-bottom">
                <p>© 2026 Vcube Software Solutions | All Rights Reserved</p>
            </div>

        </footer>
    );
}
export default Footer;