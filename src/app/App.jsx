import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../views/Home";
import Signin from "../views/Signin";
import Layout from "../components/Layout";
import UserPage from "../views/Userpage";
import ErrorPage from "../views/ErrorPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/sign-in" element={<Signin />} />
                    <Route path="/profile" element={<UserPage />} />
                    <Route path="*" element={<ErrorPage />}></Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
