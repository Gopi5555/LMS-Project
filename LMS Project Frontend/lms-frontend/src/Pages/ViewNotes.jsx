import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/notes.css'

function ViewNotes() {

    const [notes, setNotes] = useState([]);
    const user = JSON.parse(localStorage.getItem("user")); // ✅ get user

    useEffect(() => {
        if (user) {
            fetchNotes();
        }
    }, []);

    const fetchNotes = async () => {
        try {

            let response;

            // ✅ ADMIN → get all notes
            if (user.role === "ADMIN") {
                response = await axios.get(
                    "http://localhost:8080/api/notes/all"
                );
            }

            // ✅ STUDENT → department-wise notes
            else {
                response = await axios.get(
                    `http://localhost:8080/api/notes/department/${user.email}`
                );
            }

            setNotes(response.data);

        } catch (err) {
            console.error("Error fetching notes:", err);
        }
    };

    return (
        <div className="notes-container">
            {notes.length === 0 ? (
                <p>No notes available.</p>
            ) : (
                <div className="notes-grid">

                    {notes.map((note) => (

                        <div key={note.id} className="note-card">

                            <h3>{note.fileName}</h3>

                            <p><b>Type:</b> {note.fileType}</p>

                            <p>
                                <b>Description:</b>{" "}
                                {note.description || "No description"}
                            </p>

                            <p style={{ fontSize: "13px", color: "#777" }}>
                                📘 {note.department}
                            </p>

                            <div className="btn-group">

                                {/* VIEW */}
                                <a
                                    href={`http://localhost:8080/api/notes/view/${note.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="view-btn"
                                >
                                    👁 View
                                </a>

                                {/* DOWNLOAD */}
                                <a
                                    href={`http://localhost:8080/api/notes/download/${note.id}`}
                                    className="download-btn"
                                >
                                    ⬇ Download
                                </a>

                                {/* ✅ ADMIN ONLY DELETE */}
                                {user.role === "ADMIN" && (
                                    <button
                                        className="delete-btn"
                                        onClick={async () => {
                                            await axios.delete(
                                                `http://localhost:8080/api/notes/${note.id}?email=${user.email}`
                                            );
                                            fetchNotes();
                                        }}
                                    >
                                        🗑 Delete
                                    </button>
                                )}

                            </div>

                        </div>
                    ))}

                </div>
            )}
        </div>
    );
}

export default ViewNotes;