import { Link, useNavigate } from "react-router-dom";
import '../styles/sidebar.css'

function Sidebar() {

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <ul>
        {/* 👨‍🎓 STUDENT */}
        {user?.role === "STUDENT" && (
          <>
            <li>
              <Link to="/dashboard">
                <button className="side-btn">🏠 Dashboard</button>
              </Link>
            </li>

            <li>
              <Link to="/videos">
                <button className="side-btn">📺 Videos</button>
              </Link>
            </li>

            <li>
              <Link to="/viewNotes">
                <button className="side-btn">📄 Notes</button>
              </Link>
            </li>

            <li>
              <Link to="/quiz">
                <button className="side-btn">📋 Quiz</button>
              </Link>
            </li>

            <li>
              <Link to="/assignments">
                <button className="side-btn">📚 Assignments</button>
              </Link>
            </li>

            <li>
              <button className="side-btn logout-btn1" onClick={logout}>
                🚪 Logout
              </button>
            </li>
          </>
        )}

        {/* 👨‍🏫 ADMIN */}
        {user?.role === "ADMIN" && (
          <>
            <li>
              <Link to="/admin">
                <button className="side-btn">🏠 Dashboard</button>
              </Link>
            </li>

            <li>
              <Link to="/courseList">
                <button className="side-btn">📚 Course</button>
              </Link>
            </li>

            <li>
              <Link to="/students">
                <button className="side-btn">👥 Students</button>
              </Link>
            </li>

            <li>
              <Link to="/uploadvideo">
                <button className="side-btn">📺 Videos</button>
              </Link>
            </li>

            <li>
              <Link to="/createassignment">
                <button className="side-btn">📝 Assignment</button>
              </Link>
            </li>
            <li>
              <Link to="/addNotes">
                <button className="side-btn">📄 Notes</button>
              </Link>
            </li>
            <li>
              <Link to="/createQuiz">
                <button className="side-btn">📝 Quiz</button>
              </Link>
            </li>
            <li>
              <button className="side-btn logout-btn1" onClick={logout}>
                🚪 Logout
              </button>
            </li>
          </>
        )}

      </ul>
    </div>
  );
}

export default Sidebar;