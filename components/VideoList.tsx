import { FunctionalComponent } from "preact";
import { Video } from "../types.ts"

type VideoListProps = {
    videos: Video[],
    userId: string
}

const VideoList:FunctionalComponent<VideoListProps> = ({videos, userId}) => {
    return(
        <div class = "video-page-container">
            <h1 class="video-list-title">Curso Deno Fresh</h1>
            <div class = "video-list-container">
                {videos.map((video) => (
                    <div class = "video-item" key = {video.id}>
                        <a href={`/video/${video.id}`} class="video-link">
                            <img src={video.thumbnail} alt={video.title} class="video-thumbnail"/>
                            <div class="video-info">
                                <h3 class="video-title">{video.title}</h3>
                                <p class="video-description">{video.description}</p>
                                <p class="video-release-date">Release date: {video.date}</p>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default VideoList;