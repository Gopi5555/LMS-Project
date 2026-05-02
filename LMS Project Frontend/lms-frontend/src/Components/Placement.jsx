import React from "react";
import "../styles/placement.css";
import HomeNavbar from "./HomeNavbar";
import Footer from "./Footer";

function Placement() {

  const students = [
    { name: "Ravi Kumar", company: "TCS", role: "Java Developer" },
    { name: "Priya Sharma", company: "Infosys", role: "Python Developer" },
    { name: "Rahul Reddy", company: "Wipro", role: "Data Analyst" },
    { name: "Sneha Patel", company: "Accenture", role: "Full Stack Developer" }
  ];

  return (
    <><HomeNavbar />
      <div className="placement-page">

        {/* 🔹 Header */}
        <div className="placement-header">
          <h1>Our Placements</h1>
          <p>We build careers, not just skills 🚀</p>
        </div>

        {/* 🔹 Stats */}
        <section className="placement-stats">
          <div>🎓 Students Trained: 32,000+</div>
          <div>💼 Placed Students: 3,800+</div>
          <div>🏢 Hiring Companies: 100+</div>
          <div>📍 Locations: 10</div>
        </section>

        {/* 🔹 Placed Students */}
        <section className="placed-students">
          <h2>Recently Placed Students</h2>

          <div className="student-grid">
            {students.map((s, index) => (
              <div className="student-card" key={index}>
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="student"
                />
                <h3>{s.name}</h3>
                <p>{s.role}</p>
                <span>{s.company}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 🔹 Hiring Partners */}
        <section className="partners">
          <h2>Our Hiring Partners</h2>

          <div className="partner-logos">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/TCS_New_Logo.png" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg" />
          </div>
        </section>

        {/* 🔹 Placement Process */}
        <section className="process">
          <h2>Our Placement Process</h2>

          <div className="process-steps">
            <div>1️⃣ Training</div>
            <div>2️⃣ Real-Time Projects</div>
            <div>3️⃣ Resume Building</div>
            <div>4️⃣ Mock Interviews</div>
            <div>5️⃣ Job Placement</div>
          </div>
        </section>

        {/* 🔹 CTA */}
        <section className="placement-cta">
          <h2>Start Your Career Today</h2>
          <button>Join Now</button>
        </section>

      </div>
      <Footer />
    </>
  );
}

export default Placement;