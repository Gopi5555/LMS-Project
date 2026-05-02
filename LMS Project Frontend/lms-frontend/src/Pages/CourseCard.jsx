import React from "react";

function CourseCard({ course }) {
  return (
    <div className="course-card">

      <img src={course.image} alt={course.title} className="course-img" />

      <div className="course-info">
        <h3>{course.title}</h3>

        <p className="instructor">{course.instructor}</p>
        <p className="rating">⭐ {course.rating}</p>
        <p className="price">₹ {course.price}</p>

        <button className="enroll-btn">
          Enroll Now
        </button>
      </div>

    </div>
  );
}

export default CourseCard;