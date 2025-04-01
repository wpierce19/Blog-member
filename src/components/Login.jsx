import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";

const Login = ({setUser, setToken}) => {
    const [isSubmitting, setIsSubmitting] = useState(null);
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: "",
    })

    const [loginError, setLoginError] = useState(null);
    const navigate = useNavigate();

    const fetchToken = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch (
                `https://sore-basilisk-wpierce-f56380ff.koyeb.app/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userLogin),
                }
            );
            if (!response.ok) {
                throw new Error(
                    response.status === 400
                    ? (await response.json()).err
                    : `HTTP error. Status: ${response.status}`
                );
            }
            const data = await response.json();
            try {
                const userResponse = await fetch(`https://blog-api-tjau.onrender.com/user`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${data.token}`,
                    },
                });

                if (!userResponse.ok) {
                    throw new Error(`HTTP error. Status ${response.status}`);
                }
                const userData = await userResponse.json();
                setToken(data.token);
                setUser(userData);
                setUserLogin({email: "", password: ""});
                navigate("/posts")
            } catch (err) {
                console.error("Error fetching user:", err);
            }
        } catch (err) {
            console.error(err);
            setLoginError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="pico loginsection container">
            <h1>Sign in</h1>
            <form onSubmit={fetchToken}>
                <input 
                    type="text"
                    name="email"
                    placeholder="Email"
                    aria-label="Email"
                    autoComplete="email"
                    value={userLogin.email}
                    onChange={(e) => 
                        setUserLogin((prev) => ({...prev, email: e.target.value}))
                    }
                    required
                />
                <input 
                    type="password"
                    name="password"
                    placeholder="Password"
                    aria-label="Password"
                    autoComplete="current-password"
                    value={userLogin.password}
                    onChange={(e) => 
                        setUserLogin((prev) => ({...prev, password: e.target.value}))
                    }
                    required
                />
                <button type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
                    Login
                </button>
                <small>
                    Don't have an account? <Link to="/sign-up">Sign Up</Link>
                    <br />
                    <i style={{color: "crimson"}}>{loginError}</i>
                </small>
            </form>
        </section>
    );
};

export default Login;