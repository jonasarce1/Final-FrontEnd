import { FunctionalComponent } from "preact";

type LoginProps = {
    message?: string
}

const Login:FunctionalComponent<LoginProps> = ({message}) => {
    return(
        <div class = "login-container">
            <h2>Login</h2>
            {message && <p class="error-message">{message}</p>}
            <form method = "POST" action = "/login">
                <label for="email">Email</label>
                <input type="text" id="email" name="email" required></input>
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required></input>
                <button type="submit">Login</button>
                <p class="register-link">Don't have an account? <a href="/register">Register</a></p>
            </form>
        </div>
    )
}

export default Login;