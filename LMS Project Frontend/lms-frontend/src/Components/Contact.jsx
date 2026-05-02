import React, { useState } from "react";
import {
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaFacebook,
    FaInstagram,
    FaTwitter,
    FaWhatsapp,
    FaClock
} from "react-icons/fa";
import "../styles/contact.css";
import HomeNavbar from "./HomeNavbar";
import Footer from "./Footer";

function Contact() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [status, setStatus] = useState("");

    // 🔹 Handle Input
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 🔹 Submit
    const handleSubmit = (e) => {
        e.preventDefault();

        // Simple validation
        if (!formData.name || !formData.email) {
            setStatus("❌ Please fill required fields");
            return;
        }

        // Simulate API
        setTimeout(() => {
            setStatus("✅ Message sent successfully!");
            setFormData({ name: "", email: "", subject: "", message: "" });
        }, 1000);
    };

    return (<>
        <HomeNavbar />

        <div className="contact-page">

            {/* 🔹 Header */}
            <div className="contact-header">
                <h1>Contact Us</h1>
                <p>We are here to help you build your career 🚀</p>
            </div>

            {/* 🔹 Main Section */}
            <div className="contact-container">

                {/* 🔹 Left - Contact Info */}
                <div className="contact-info">

                    <h2>Get in Touch</h2>

                    <p><FaMapMarkerAlt /> Hyderabad, KPHB, India</p>
                    <p><FaPhone /> +91 7675070124</p>
                    <p><FaEnvelope /> contact@vcubegroup.com</p>
                    <p><FaClock /> Mon - Sat: 9 AM - 7 PM</p>

                    {/* 🔹 WhatsApp */}
                    <a
                        href="https://wa.me/917675070124"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whatsapp-btn"
                    >
                        <FaWhatsapp /> Chat on WhatsApp
                    </a>

                    {/* 🔹 Social */}
                    <div className="social-icons">
                        <FaFacebook />
                        <FaInstagram />
                        <FaTwitter />
                    </div>

                </div>

                {/* 🔹 Right - Form */}
                <div className="contact-form">

                    <h2>Send Message</h2>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name *"
                            value={formData.name}
                            onChange={handleChange}
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email *"
                            value={formData.email}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            value={formData.subject}
                            onChange={handleChange}
                        />

                        <textarea
                            name="message"
                            placeholder="Your Message"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                        ></textarea>

                        <button type="submit">Send Message</button>

                        {/* 🔹 Status Message */}
                        {status && <p className="status">{status}</p>}
                    </form>

                </div>

            </div>

            {/* 🔹 Google Map */}
            <div className="map">
                <iframe
                    title="map"
                    src="https://maps.google.com/maps?q=KPHB%20Hyderabad&t=&z=13&ie=UTF8&iwloc=&output=embed"
                ></iframe>
            </div>

        </div>
        <Footer />
    </>
    );
}

export default Contact;