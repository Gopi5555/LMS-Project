import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function UploadNotes() {

    const user = JSON.parse(localStorage.getItem("user")); // ✅ logged user

    const [file, setFile] = useState(null);
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            setMessage("⚠️ Please select file");
            return;
        }

        if (!user || user.role !== "ADMIN") {
            setMessage("❌ Only Admin can upload notes");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("description", description);
        formData.append("email", user.email); // ✅ REQUIRED for backend

        try {
            setLoading(true);

            await axios.post(
                "http://localhost:8080/api/notes/upload",
                formData
            );

            setMessage("✅ Upload Success");
            setFile(null);
            setDescription("");
            setLoading(false);

        } catch (err) {
            setLoading(false);
            setMessage("❌ Upload Failed");
        }
    };

    return (
        <div className="upload-container">

            <h2>📄 Upload Notes</h2>

            <form onSubmit={handleSubmit}>

                {/* FILE */}
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                />

                {/* FILE NAME */}
                {file && (
                    <p style={{ fontSize: "14px", color: "#555" }}>
                        📎 {file.name}
                    </p>
                )}

                {/* DESCRIPTION */}
                <textarea
                    placeholder="Enter description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                {/* AUTO DEPARTMENT DISPLAY */}
                <p style={{ fontSize: "13px", color: "#888" }}>
                    📘 Department: <b>{user?.department}</b>
                </p>

                <button type="submit" disabled={loading}>
                    {loading ? "Uploading..." : "Upload Notes"}
                </button>

            </form>

            {message && <p style={{ marginTop: "10px" }}>{message}</p>}
            <button
                className="primary-btn"
                onClick={() => navigate("/viewNotes")}
                style={{ marginTop: "15px" }}
            >
                📚 View Notes
            </button>
        </div>
    );
}

export default UploadNotes;