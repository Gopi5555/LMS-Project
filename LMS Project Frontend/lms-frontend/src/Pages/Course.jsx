import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/course.css";
import "../styles/tablespage.css"

function Course() {

    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const coursesPerPage = 10;

    const user = JSON.parse(localStorage.getItem("user")) || {};

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/courses");
            setCourses(res.data);
        } catch (err) {
            console.error("Error fetching courses", err);
        }
    };

    // 🔍 SEARCH
    const searchText = search.toLowerCase();

    const filteredCourses = courses.filter((course) =>
        course.title?.toLowerCase().includes(searchText) ||
        course.instructor?.toLowerCase().includes(searchText)
    );

    // 📄 PAGINATION
    const indexOfLast = currentPage * coursesPerPage;
    const indexOfFirst = indexOfLast - coursesPerPage;
    const currentCourses = filteredCourses.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

    // ❌ DELETE COURSE
    const deleteCourse = async (id) => {

        if (user?.role !== "ADMIN") {
            alert("Only Admin can delete courses ❌");
            return;
        }

        const confirmDelete = window.confirm("Are you sure to delete this course?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:8080/api/courses/${id}`);

            alert("Course deleted ✅");
            fetchCourses();

        } catch (err) {
            console.error(err);
            alert("Delete failed ❌");
        }
    };

    return (
        <div className="page-container">

            {/* HEADER */}
            <div className="header-row">
                {user?.role === "ADMIN" && (
                    <button
                        className="primary-btn add-course-btn"
                        onClick={() => navigate("/addcourse")}
                    >
                        ➕ Add Course
                    </button>
                )}
            </div>

            {/* SEARCH */}
            <input
                type="text"
                placeholder="🔍 Search courses..."
                className="search-bar"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                }}
            />

            <h4>Total: {filteredCourses.length}</h4>

            {/* TABLE */}
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Instructor</th>
                        <th>Rating</th>
                        <th>Price</th>
                        {user?.role === "ADMIN" && <th>Actions</th>}
                    </tr>
                </thead>

                <tbody>
                    {currentCourses.map((course) => (
                        <tr key={course.id}>

                            <td>{course.id}</td>

                            <td>
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    width="80"
                                    style={{ borderRadius: "8px" }}
                                />
                            </td>

                            <td>{course.title}</td>
                            <td>{course.instructor}</td>
                            <td>⭐ {course.rating}</td>
                            <td>₹ {course.price}</td>

                            {user?.role === "ADMIN" && (
                                <td>
                                    <button
                                        className="edit-btn"
                                        onClick={() =>
                                            navigate("/updatecourse", { state: course })
                                        }
                                    >
                                        ✏️ Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() => deleteCourse(course.id)}
                                    >
                                        🗑 Delete
                                    </button>
                                </td>
                            )}

                        </tr>
                    ))}
                </tbody>
            </table>

            {/* PAGINATION */}
            <div className="pagination">

                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    ⬅ Prev
                </button>

                <span>
                    Page {currentPage} of {totalPages || 1}
                </span>

                <button
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Next ➡
                </button>

            </div>

        </div>
    );
}

export default Course;