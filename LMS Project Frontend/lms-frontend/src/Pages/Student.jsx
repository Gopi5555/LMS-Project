import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/tablespage.css";

function Students() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const studentsPerPage = 10;

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Fetch students
  useEffect(() => {
    if (user?.email) {
      fetchStudents();
    }
  }, []);

  // Reset page on search
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8080/api/students?email=${user.email}`
      );
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching students", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter
  const searchText = search.toLowerCase();
  const filteredStudents = students.filter(
    (stu) =>
      stu.name?.toLowerCase().includes(searchText) ||
      stu.email?.toLowerCase().includes(searchText)
  );

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;

  const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);

  return (
    <div className="page-container">

      <div className="header-row">
        <button className="primary-btn" onClick={() => navigate("/adduser")}>
          ➕ Add Student
        </button>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="🔍 Search students..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h4>Total: {filteredStudents.length}</h4>

      {/* LOADING */}
      {loading ? (
        <p className="loading">Loading students...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentStudents.length > 0 ? (
              currentStudents.map((stu) => (
                <tr key={stu.id}>
                  <td>{stu.id}</td>
                  <td>{stu.name}</td>
                  <td>{stu.email}</td>
                  <td>{stu.role}</td>
                  <td>{stu.department}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() =>
                        navigate("/updateuser", { state: stu })
                      }
                    >
                      ✏️ Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* PAGINATION */}
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          ◀ 
        </button>

        <span>{currentPage}/{totalPages || 1}</span>

        <button
          disabled={currentPage >= totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          ▶
        </button>
      </div>
    </div>
  );
}

export default Students;