import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/assignment.css"

function CreateAssignmentPage() {

    const [form, setForm] = useState({
        title: "",
        description: "",
        dueDate: ""
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem("user"));

        // ✅ validation
        if (!form.title || !form.description || !form.dueDate) {
            setMessage("❌ All fields are required");
            return;
        }

        // ✅ prevent past date
        const today = new Date().toISOString().split("T")[0];
        if (form.dueDate < today) {
            setMessage("❌ Due date cannot be in the past");
            return;
        }

        try {
            setLoading(true);
            setMessage("");

            await axios.post(
                `http://localhost:8080/api/assignments?email=${user.email}`,
                form
            );

            setMessage("✅ Assignment Created Successfully");

            // ✅ reset form
            setForm({
                title: "",
                description: "",
                dueDate: ""
            });

            // 🔥 auto redirect
            setTimeout(() => {
                navigate("/assignments");
            }, 1500);

        } catch (error) {
            setMessage("❌ Error creating assignment");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="assignment-container">

            <div className="assignment-card">

                <h2>Create Assignment</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="title"
                        placeholder="Enter Title"
                        value={form.title}
                        onChange={handleChange}
                    />

                    <textarea
                        name="description"
                        placeholder="Enter Description"
                        value={form.description}
                        onChange={handleChange}
                    />

                    <input
                        type="date"
                        name="dueDate"
                        value={form.dueDate}
                        onChange={handleChange}
                        min={new Date().toISOString().split("T")[0]} // ✅ block past
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Creating..." : "Create Assignment"}
                    </button>

                </form>

                {/* ✅ Message */}
                {message && (
                    <p className={message.includes("❌") ? "error" : "success"}>
                        {message}
                    </p>
                )}
                <div>
                    <button
                        className="primary-btn"
                        onClick={() => navigate("/assignments")}
                        style={{ marginBottom: "20px" }}
                    >
                        📚 View Assignments
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateAssignmentPage;