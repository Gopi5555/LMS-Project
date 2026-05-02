import React from "react";
import { FaGlobe, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";
import HeroCarousel from "./HeroCarousel";
import CourseDashBoard from "../Pages/CourseDashBoard";
import formImg from "../assets/images/vcube 1.jpg";
import courseImg from "../assets/images/vcube 2.jpg";
import Footer from "./Footer";
import HomeNavbar from "./HomeNavbar";
import FormSection from "./FormSection";
import CourseDashboard from "../Pages/CourseDashBoard";
import CoursesSection from "./CourseSection";
import Services from "./Services";

function Home() {


  return (
    <div>
      <HomeNavbar />
      <HeroCarousel />
      <FormSection />
      <CoursesSection />
      <Services />
      <Footer />

    </div>
  );
}

export default Home;