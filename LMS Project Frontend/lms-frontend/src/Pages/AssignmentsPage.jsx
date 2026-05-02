import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AssignmentsPage() {
  const [assignments, setAssignments] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [selectedId, setSelectedId] = useState(null);
  const [fileUrl, setFileUrl] = useState("");

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      let url = "";

      if (user.role === "ADMIN") {
        url = "http://localhost:8080/api/assignments/all";
      } else {
        url = `http://localhost:8080/api/assignments/student?email=${user.email}`;
      }

      const res = await axios.get(url);
      setAssignments(res.data);
    } catch (err) {
      setMessage("❌ Error loading assignments");
    } finally {
      setLoading(false);
    }
  };

  // ✅ STUDENT SUBMIT
  const handleSubmit = async (id) => {
    if (!fileUrl) {
      alert("Enter file URL");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/assignments/submit", {
        assignmentId: id,
        studentName: user.name,
        fileUrl: fileUrl,
      });

      alert("✅ Submitted Successfully");
      setSelectedId(null);
      setFileUrl("");
    } catch {
      alert("❌ Submission Failed");
    }
  };

  // ✅ ADMIN DELETE
  const deleteAssignment = async (id) => {
    await axios.delete(
      `http://localhost:8080/api/assignments/${id}?email=${user.email}`
    );
    fetchAssignments();
  };

  return (
    <div className="assignment-container">
      {/* Heading OUTSIDE the grid */}
      <div className="assignment-page">
        {loading && <p>Loading...</p>}
        {message && <p className="error">{message}</p>}

        {!loading && assignments.length === 0 && (
          <p>No assignments available</p>
        )}

        {assignments.map((a) => (
          <div key={a.id} className="assignment-card">
            <h4>{a.title}</h4>
            <p>{a.description}</p>
            <p>
              <b>Due:</b> {a.dueDate}
            </p>

            {/* 🎓 STUDENT */}
            {user.role === "STUDENT" && (
              <>
                {selectedId === a.id ? (
                  <>
                    <input
                      type="text"
                      placeholder="Enter file URL"
                      value={fileUrl}
                      onChange={(e) => setFileUrl(e.target.value)}
                    />

                    <button
                      className="submit-btn"
                      onClick={() => handleSubmit(a.id)}
                    >
                      Submit Now
                    </button>

                    <button
                      className="cancel-btn"
                      onClick={() => setSelectedId(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    className="primary-btn"
                    onClick={() => setSelectedId(a.id)}
                  >
                    Submit Assignment
                  </button>
                )}
              </>
            )}

            {/* 👨‍💼 ADMIN */}
            {user.role === "ADMIN" && (
              <div className="admin-actions">
                <button
                  className="edit-btn"
                  onClick={() =>
                    navigate("/update-assignment", { state: a })
                  }
                >
                  ✏️ Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteAssignment(a.id)}
                >
                  🗑 Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AssignmentsPage;
