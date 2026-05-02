import React from "react";
import { Link } from "react-router-dom";

function StudentDashboard() {

    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="main-content">

            <h2>Student Dashboard</h2>
            <h3>👋 {user?.name}</h3>

            <div className="card-grid">
                <Link to="/videos" className="card">Videos</Link>
                <Link to="/viewNotes" className="card">Notes</Link>
                <Link to="/quiz" className="card">Quiz</Link>
                <Link to="/assignments" className="card">Assignments</Link>
            </div>

        </div>
    );
}
export default StudentDashboard;