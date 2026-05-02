import { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "./CourseCard";
import HomeNavbar from "../Components/HomeNavbar";
import Footer from "../Components/Footer";

function CourseDashBoard({ limit }) {

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/courses");
      setCourses(res.data);
    } catch (error) {
      console.error("Error fetching courses", error);
    }
  };

  // 🔥 Apply limit
  const displayedCourses = limit ? courses.slice(0, limit) : courses;

  return (

    <div className="dashboard">

      <div className="course-grid">
        {displayedCourses.length > 0 ? (
          displayedCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <p>No Courses Available</p>
        )}
      </div>

    </div>


  );
}

export default CourseDashBoard;