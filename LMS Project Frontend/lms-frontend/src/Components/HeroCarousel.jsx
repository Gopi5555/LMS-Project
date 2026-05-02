import { useState, useEffect } from "react";
import img1 from "../assets/images/vcube 1.jpg";
import img2 from "../assets/images/vcube 2.jpg";
import img3 from "../assets/images/vcube 3.jpg";

function HeroCarousel() {
    const images = [img1, img2, img3];

    const [current, setCurrent] = useState(0);
    const [showInfo, setShowInfo] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]); // ✅ fix

    return (
        <section className="hero">
            <img src={images[current]} alt="slide" className="hero-bg" />

            <div className="hero-overlay">
                <div className="hero-content">

                    <h1>Transform Your Career with Vcube</h1>
                    <p>Industry-focused training with real-time projects</p>

                    {/* 🔹 Button */}
                    <button
                        className="primary-btn"
                        onClick={() => setShowInfo(!showInfo)}
                    >
                        {showInfo ? "Hide Info" : "Know More"}
                    </button>

                    {/* 🔹 Animated Content */}
                    <div className={`hero-info ${showInfo ? "show" : ""}`}>
                        <p>
                            Vcube provides real-time training with industry experts,
                            hands-on projects, internships, and 100% placement assistance.
                        </p>

                        <ul>
                            <li>✔ Java Fullstack Training</li>
                            <li>✔ Python & Data Science</li>
                            <li>✔ Mock Interviews</li>
                            <li>✔ Resume Building</li>
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default HeroCarousel;