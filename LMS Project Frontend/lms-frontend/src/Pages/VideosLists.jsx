import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/video.css";

function ViewVideos() {
  const [videos, setVideos] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/video/all");
      setVideos(res.data);
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  };

  const deleteVideo = async (id) => {
    if (user.role !== "ADMIN") {
      alert("❌ Only Admin can delete videos");
      return;
    }

    const confirmDelete = window.confirm("Delete this video?");
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:8080/api/video/${id}?email=${user.email}`
      );
      alert("✅ Video Deleted");
      fetchVideos();
    } catch {
      alert("❌ Delete Failed");
    }
  };

  return (
    <div className="video-container">
      <h2>📺 All Videos</h2>

      {videos.length === 0 ? (
        <p>No videos available.</p>
      ) : (
        <div className="video-grid">
          {videos.map((vid) => (
            <div key={vid.id} className="video-card">
              <h3>{vid.title}</h3>
              <p>📘 {vid.department}</p>

              <video width="300" controls>
                <source
                  src={`http://localhost:8080/api/video/view/${vid.id}`}
                  type="video/mp4"
                />
              </video>

              {user.role === "ADMIN" && (
                <button
                  className="delete-btn"
                  onClick={() => deleteVideo(vid.id)}
                >
                  🗑 Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewVideos;
