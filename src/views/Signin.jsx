import React, { useState } from "react";
import { useDispatch /* , useSelector  */ } from "react-redux";
import "../scss/main.scss";
import { useNavigate } from "react-router-dom";
import { apiService } from "../services/ApiServices.js";
import { setSignIn, setUser } from "../features/user/userSlice.js";

function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [hasError, setHasError] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasError(false);

        const loginResult = await apiService.fetchToken(username, password);

        if (loginResult.status !== 200) {
            setHasError(loginResult.errorMsg);
            return;
        }

        dispatch(setSignIn({ token: loginResult.token }));

        const userResult = await apiService.fetchUser(loginResult.token);
        if (userResult.status !== 200) {
            setHasError(userResult.errorMsg);
            return;
        }
        dispatch(setUser({ firstName: userResult.firstName, lastName: userResult.lastName, username: userResult.username }));
        navigate("/profile");
    };

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    {hasError && <p>{hasError}</p>}
                    <button className="sign-in-button">Sign In</button>
                </form>
            </section>
        </main>
    );
}

export default SignIn;
