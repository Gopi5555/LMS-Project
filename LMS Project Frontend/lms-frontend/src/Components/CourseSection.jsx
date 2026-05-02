import React from "react";
import { Link } from "react-router-dom";
import CourseDashboard from "../Pages/CourseDashBoard";
import "../styles/home.css";

function CoursesSection() {
    return (
        <section className="courses">
            <h2>Our Featured Courses</h2>

            <div className="course-grid">
                <CourseDashboard limit={3} />
            </div>

            <div className="view-more">
                <Link to="/courses">
                    <button className="view-btn">More</button>
                </Link>
            </div>
        </section>
    );
}

export default CoursesSection;