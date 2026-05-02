import { Link } from "react-router-dom";

function AdminDashBoard() {

    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="main-content">
            <h3>👋 {user?.name}</h3>

            <div className="card-grid">
                <Link to="/adduser" className="card">Add Users</Link>
                <Link to="/students" className="card">Students</Link>
                <Link to="/addCourse" className="card">Add Course</Link>
                <Link to="/addNotes" className="card">Notes</Link>
                <Link to="/courseList" className="card">Courses</Link>
                <Link to="/uploadvideo" className="card">Upload Video</Link>
                <Link to="/createassignment" className="card">Assignment</Link>
            </div>

        </div>
    );
}
export default AdminDashBoard;