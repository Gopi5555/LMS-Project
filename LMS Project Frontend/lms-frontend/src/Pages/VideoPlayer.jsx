import { useParams } from "react-router-dom";

function VideoPlayer() {

    const { fileName } = useParams();

    return (
        <div>

            <h2>Video Player</h2>

            <video width="600" height="400" controls>
                <source
                    src={`http://localhost:8080/api/video/play/${fileName}`}
                    type="video/mp4"
                />
            </video>

        </div>
    );
}

export default VideoPlayer;