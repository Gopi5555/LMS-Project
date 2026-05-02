import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/video.css'

function UploadVideo() {

  const [title, setTitle] = useState("");
  const [video, setVideo] = useState(null);
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();

    // 🔐 Check login
    if (!user) {
      alert("Please login first");
      return;
    }

    if (!title || !video || !department) {
      alert("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("video", video);
    formData.append("department", department);
    formData.append("email", user.email);

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:8080/api/video/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("✅ Video Uploaded Successfully");

      // ✅ reset form
      setTitle("");
      setVideo(null);
      setDepartment("");

      // 🔥 reset file input manually
      document.getElementById("videoInput").value = "";

    } catch (error) {
      console.error(error);
      alert("❌ Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">

      <h2>📺 Upload Videos</h2>

      <form onSubmit={handleUpload}>

        {/* TITLE */}
        <input
          type="text"
          placeholder="Enter Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* VIDEO FILE */}
        <input
          id="videoInput"
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files[0])}
        />

        {/* DEPARTMENT */}
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">Select Department</option>
          <option value="JAVA">Java</option>
          <option value="PYTHON">Python</option>
          <option value="DATA_ENGINEERING">Data Engineering</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload Video"}
        </button>

      </form>
      <button
        className="primary-btn"
        onClick={() => navigate("/videos")}
        style={{ marginTop: "15px" }}
      >
        📚 View All Videos
      </button>

    </div>
  );
}

export default UploadVideo;