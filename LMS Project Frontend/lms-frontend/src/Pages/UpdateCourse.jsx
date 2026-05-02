import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function UpdateCourse() {

  const location = useLocation();
  const navigate = useNavigate();

  const courseData = location.state;

  const user = JSON.parse(localStorage.getItem("user")); // ✅ logged user

  const [id, setId] = useState(courseData?.id || "");
  const [title, setTitle] = useState(courseData?.title || "");
  const [instructor, setInstructor] = useState(courseData?.instructor || "");
  const [rating, setRating] = useState(courseData?.rating || "");
  const [price, setPrice] = useState(courseData?.price || "");
  const [image, setImage] = useState(courseData?.image || "");
  const [department, setDepartment] = useState(courseData?.department || "");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 Safety (refresh case)
  if (!courseData) {
    return <h3>No course data found ❌</h3>;
  }

  const updateCourse = async (e) => {
    e.preventDefault();

    // ✅ validation
    if (!title || !instructor || !price) {
      setMessage("Please fill required fields ❗");
      return;
    }

    // ✅ only admin allowed
    if (user.role !== "ADMIN") {
      setMessage("Only Admin can update ❌");
      return;
    }

    try {
      setLoading(true);

      await axios.put(
        `http://localhost:8080/api/courses/${id}?email=${user.email}`,
        {
          title,
          instructor,
          rating,
          price,
          image,
          department
        }
      );

      setMessage("✅ Course Updated Successfully");

      setTimeout(() => {
        navigate("/course");
      }, 1500);

    } catch (error) {
      setMessage("❌ Update Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h2>Update Course</h2>

        <form onSubmit={updateCourse}>

          <input type="text" value={id} disabled />

          <input
            type="text"
            placeholder="Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Instructor"
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
          />

          <input
            type="number"
            placeholder="Rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            step="0.1"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          {/* 🔥 IMPORTANT FOR LMS */}
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">Select Department</option>
            <option value="JAVA">Java</option>
            <option value="PYTHON">Python</option>
            <option value="DATA_ENGINEERING">Data Engineering</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </button>

        </form>

        {message && <p>{message}</p>}

      </div>
    </div>
  );
}

export default UpdateCourse;