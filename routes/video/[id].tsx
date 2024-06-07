import { FreshContext, Handlers, PageProps} from "$fresh/server.ts";
import { State, Video } from "../../types.ts";
import VideoShow from "../../components/VideoShow.tsx";

type Data = {
    video: Video,
    userId: string
}

export const handler:Handlers<Data, State> = {
    GET: async(_req:Request, ctx:FreshContext<State, Data>) => {
        const videoId = ctx.params.id;
        const userId = ctx.state.id;

        const API_URL = Deno.env.get("API_URL");

        if(!API_URL){
            throw new Error("Error al obtener la variable de entorno de la API");
        }

        const response = await fetch(`${API_URL}/video/${userId}/${videoId}`);

        if(response.status === 200){
            const video = await response.json();

            return ctx.render({video:video, userId:userId});
        }else{
            throw new Error("Error al obtener el video");
        }
    }
}

const Page = (props: PageProps<Data>) => {
    const {video, userId} = props.data;
    
    return(
        <VideoShow video = {video} userId={userId}/>
    )
}

export default Page;