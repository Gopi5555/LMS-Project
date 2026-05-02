import React from "react";
import "../styles/about.css";
import HomeNavbar from "../Components/HomeNavbar";
import Footer from "../Components/Footer";

function AboutPage() {
    return (
        <><HomeNavbar />
            <div className="about-container">

                {/* 🔥 Title */}
                <h1 className="about-title">
                    Welcome to Vcube Software Solutions
                </h1>

                <p className="about-subtitle">
                    Empower your career with industry-ready training, real-time projects,
                    and expert mentorship designed to help you succeed in the IT industry.
                </p>

                {/* 🔥 Features */}
                <div className="about-grid">

                    <div className="about-card">
                        <h4>💻 Real-Time Projects</h4>
                        <p>Work on live industry projects to gain practical experience.</p>
                    </div>

                    <div className="about-card">
                        <h4>👨‍🏫 Expert Trainers</h4>
                        <p>Learn from experienced professionals with real industry exposure.</p>
                    </div>

                    <div className="about-card">
                        <h4>📚 Job-Oriented Courses</h4>
                        <p>Master in-demand technologies like Java, Python, Data Science, and more.</p>
                    </div>

                    <div className="about-card">
                        <h4>🧪 Hands-on Practice</h4>
                        <p>Get practical knowledge with assignments, labs, and coding sessions.</p>
                    </div>

                    <div className="about-card">
                        <h4>🎯 Placement Assistance</h4>
                        <p>Resume building, mock interviews, and placement support.</p>
                    </div>

                    <div className="about-card">
                        <h4>🌐 Flexible Learning</h4>
                        <p>Classroom & online training with flexible batch timings.</p>
                    </div>

                </div>

                {/* 🔥 Roles / Services */}
                <div className="roles-section">

                    <h2>🚀 Our Services</h2>

                    <div className="roles-grid">

                        <div className="role-card">
                            <h4>🎓 Training Programs</h4>
                            <ul>
                                <li>Java Full Stack Development</li>
                                <li>Python Full Stack Development</li>
                                <li>Data Science & AI</li>
                                <li>Cyber Security</li>
                            </ul>
                        </div>

                        <div className="role-card">
                            <h4>💼 Career Support</h4>
                            <ul>
                                <li>Resume Preparation</li>
                                <li>Mock Interviews</li>
                                <li>Internship Opportunities</li>
                                <li>100% Placement Assistance</li>
                            </ul>
                        </div>

                    </div>

                </div>

            </div>
            <Footer />
        </>
    );
}

export default AboutPage;