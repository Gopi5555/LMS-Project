import { Link } from "react-router-dom";

function VideoList({ videos }) {
    return (
        <div>
            {videos.map(video => {
                console.log(video);
                return (
                    <div key={video.id}>
                        <h3>{video.title}</h3>

                        <Link to={`/video/${video.fileName}`}>
                            <button>Play Video</button>
                        </Link>

                    </div>
                );
            })}

        </div>
    );
}

export default VideoList;