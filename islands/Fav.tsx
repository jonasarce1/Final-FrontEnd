import { useState } from "preact/hooks";
import { FunctionalComponent } from "preact";

type FavProps = {
    userId: string,
    videoId: string,
    fav: boolean
}

const Fav:FunctionalComponent<FavProps> = ({userId, videoId, fav}) => {
    const [isFav, setIsFav] = useState<boolean>(fav);

    const toggleFav = async (userId: string, videoId: string, isFav:boolean) => {
        const response = await fetch(`https://videoapp-api.deno.dev/fav/${userId}/${videoId}`, {
            method: "POST"
        })

        if(response.status === 200){
            setIsFav(!isFav);
        }
    }

    return(
        <button class="fav-button" onClick={()=>toggleFav(userId, videoId, isFav)}>{isFav ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}</button>
    )
}

export default Fav;