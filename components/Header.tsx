import { FunctionalComponent } from "preact";
import Logout from "../islands/Logout.tsx";

type HeaderProps = {
    name: string
}

const Header:FunctionalComponent<HeaderProps> = ({name}) => {
    return(
        <header class="header-container">
            <div class="header-content">
                <span class="user-name">{name}</span>
                <Logout/>
            </div>
        </header>
    )
}

export default Header;