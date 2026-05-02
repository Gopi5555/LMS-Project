import React from "react";
import vcube1 from "../assets/images/vcube 1.jpg";
import vcube2 from "../assets/images/vcube 2.jpg";
import vcube3 from "../assets/images/vcube 3.jpg";
import "../styles/carousel.css";

function Dashboard() {
  return (
    <div>

      {/* 🔥 Carousel */}
      <div id="demo" className="carousel slide" data-bs-ride="carousel">

        {/* Indicators */}
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
        </div>

        {/* Slides */}
        <div className="carousel-inner">

          <div className="carousel-item active">
            <img src={vcube1} alt="slide" className="d-block w-100 carousel-img" />
            <div className="carousel-caption">
              <h2>Transform Your Career</h2>
              <p>Learn from industry experts with real-time projects</p>
            </div>
          </div>

          <div className="carousel-item">
            <img src={vcube2} alt="slide" className="d-block w-100 carousel-img" />
            <div className="carousel-caption">
              <h2>Hands-on Training</h2>
              <p>Work on real-world applications</p>
            </div>
          </div>

          <div className="carousel-item">
            <img src={vcube3} alt="slide" className="d-block w-100 carousel-img" />
            <div className="carousel-caption">
              <h2>100% Placement Support</h2>
              <p>Mock interviews & resume building</p>
            </div>
          </div>

        </div>

        {/* Controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>

      </div>

      {/* 🔥 VCUBE Info Section */}
      <div className="container text-center mt-5">
        <h2 className="fw-bold">🚀 Upskill with Vcube Software Solutions</h2>

        <p className="text-muted">
          Transform your career with industry-focused training, real-time projects,
          and expert guidance from experienced professionals.
        </p>

        <div className="row mt-4">

          <div className="col-md-4">
            <div className="vcube-card">
              <h5>💻 Real-Time Projects</h5>
              <p>Hands-on experience with real industry use cases.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="vcube-card">
              <h5>🎯 Placement Assistance</h5>
              <p>Mock interviews, resume building & job support.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="vcube-card">
              <h5>👨‍🏫 Expert Trainers</h5>
              <p>Learn from professionals with real-time experience.</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Dashboard;