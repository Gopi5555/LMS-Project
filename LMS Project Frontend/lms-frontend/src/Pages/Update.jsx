import React from "react";
import { Link } from "react-router-dom";
function Update() {
    return (
        <div className="page-container">
            <div className="dashboard-container">
                <div className="card-grid">
                    <Link to="/updateuser" className="card">
                        <h2>👤 Users</h2>
                        <p>update students</p>
                    </Link>
                    <Link to="/updatecourse" className="card">
                        <h2>👥 Course</h2>
                        <p>update courses</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
export default Update;