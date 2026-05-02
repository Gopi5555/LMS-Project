import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/video.css";

function VideosList() {

    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));

    // ✅ FETCH VIDEOS (NO LOOP FIX)
    const fetchVideos = async () => {
        if (!user) return;

        setLoading(true);

        try {
            let res;

            if (user.role === "STUDENT") {
                res = await axios.get(
                    `http://localhost:8080/api/video/department/${user.department}`
                );
            } else {
                res = await axios.get(
                    "http://localhost:8080/api/video/all"
                );
            }

            setVideos(res.data);

        } catch (err) {
            console.error("Error fetching videos", err);
        } finally {
            setLoading(false);
        }
    };

    // ✅ RUN ONLY ONCE
    useEffect(() => {
        fetchVideos();
    }, [user?.email]);

    // ✅ DELETE VIDEO (FIXED)
    const deleteVideo = async (id) => {

        if (user?.role !== "ADMIN") {
            alert("❌ Only Admin can delete videos");
            return;
        }

        const confirmDelete = window.confirm("Delete this video?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:8080/api/video/${id}`);

            alert("✅ Video Deleted");

            // refresh list
            fetchVideos();

        } catch (err) {
            console.error(err);
            alert("❌ Delete Failed");
        }
    };

    return (
        <div className="videos-container">
            {loading ? (
                <p>Loading videos...</p>
            ) : videos.length === 0 ? (
                <p>No videos available</p>
            ) : (
                videos.map((video) => (
                    <div className="video-card" key={video.id}>

                        <div className="video-thumbnail">
                            🎬
                        </div>

                        <div className="video-content">

                            <h3>{video.title}</h3>
                            <p className="video-dept">
                                {video.department}
                            </p>

                            {/* ▶ PLAY */}
                            <Link to={`/video/${video.fileName}`}>
                                <button className="play-btn">
                                    ▶ Play Video
                                </button>
                            </Link>

                            {/* 🗑 DELETE (ADMIN ONLY) */}
                            {user?.role === "ADMIN" && (
                                <button
                                    className="delete-btn"
                                    onClick={() => deleteVideo(video.id)}
                                >
                                    🗑 Delete
                                </button>
                            )}

                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default VideosList;