import { State, Video } from "../types.ts";
import { FreshContext, Handlers, PageProps} from "$fresh/server.ts";
import VideoList from "../components/VideoList.tsx";

type Data = {
    videos:Video[],
    userId: string
}

export const handler:Handlers<Data, State> = {
    GET: async(_req:Request, ctx:FreshContext<State, Data>) => {
        const API_URL = Deno.env.get("API_URL");

        if(!API_URL){
            throw new Error("Error al obtener la variable de entorno de la API");
        }

        const response = await fetch(`${API_URL}/videos/${ctx.state.id}`);

        if(response.status === 200){
            const videos = await response.json();

            videos.forEach((video:Video) => {
                const date = new Date(video.date);
                video.date = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
            })

            return ctx.render({videos: videos, userId: ctx.state.id});
        }else{
            return ctx.render({videos: [], userId: ""});
        }
    }
}

const Page = (props:PageProps<Data>) => {
    const {videos, userId} = props.data;

    return(
    <VideoList videos={videos} userId={userId}/>
    )
}

export default Page;