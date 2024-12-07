import React from "react";
import "../scss/main.scss";
import { Link } from "react-router-dom";

export default function errorPage() {
    return (
        <div className="notFound bg-dark">
            <h1>Oops!</h1>
            <p>Quelque chose s&apos;est mal passé</p>
            <Link to="/"> Retourner sur la page d&apos;accueil</Link>
        </div>
    );
}
