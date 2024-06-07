import { FunctionalComponent } from "preact";

const Logout:FunctionalComponent = () => {
    const logout = () => {
        document.cookie = "auth=; path=/";
        window.location.href = "/login";
    }

    return(
        <a class="logout-button" onClick={()=>logout()}>Logout</a>
    )
}

export default Logout;