import React from "react";
import "../styles/services.css";

function Services() {
  return (
    <>
      <div className="services-container">

        {/* 🔥 Header */}
        <h1 className="services-title">Our Services</h1>
        <p className="services-subtitle">
          We provide industry-focused training and career support to help you
          succeed in the IT industry.
        </p>

        {/* 🔥 Services Grid */}
        <div className="services-grid">

          <div className="service-card">
            <h3>💻 Real-Time Projects</h3>
            <p>
              Gain hands-on experience by working on live projects similar to real
              industry environments.
            </p>
          </div>

          <div className="service-card">
            <h3>👨‍🏫 Expert Training</h3>
            <p>
              Learn from experienced professionals with strong industry knowledge
              and practical teaching methods.
            </p>
          </div>

          <div className="service-card">
            <h3>📚 Job-Oriented Courses</h3>
            <p>
              Master in-demand technologies like Java, Python, Data Science, and more.
            </p>
          </div>

          <div className="service-card">
            <h3>🧪 Hands-on Practice</h3>
            <p>
              Practice with assignments, coding sessions, and real-time scenarios.
            </p>
          </div>

          <div className="service-card">
            <h3>🎯 Placement Assistance</h3>
            <p>
              Get resume support, mock interviews, and guidance to crack MNC jobs.
            </p>
          </div>

          <div className="service-card">
            <h3>🌐 Flexible Learning</h3>
            <p>
              Choose between classroom and online training with flexible schedules.
            </p>
          </div>

        </div>

        {/* 🔥 Why Choose Us */}
        <div className="why-section">
          <h2>Why Choose Vcube?</h2>

          <div className="why-grid">
            <div>✔ Real-Time Trainers</div>
            <div>✔ Live Projects</div>
            <div>✔ Internship Support</div>
            <div>✔ 100% Placement Assistance</div>
          </div>
        </div>

      </div>
    </>
  );
}

export default Services;