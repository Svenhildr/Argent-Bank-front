import logo from "../assets/argentBankLogo.png";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearUser } from "../features/user/userSlice";

const NavBar = () => {
    const token = useSelector((state) => state.user.token); // Observe les changements du token
    const firstName = useSelector((state) => state.user.firstName);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignOff = () => {
        // Déclenche la déconnexion
        dispatch(clearUser()); // Réinitialise l'utilisateur dans le store
        localStorage.clear();
        navigate("/sign-in"); // Redirige vers la page de connexion
    };

    return (
        <nav className="main-nav">
            <a className="main-nav-logo" href="./">
                <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
                <h1 className="sr-only">Argent Bank</h1>
            </a>
            <div>
                {!token ? ( // Vérifie si le token est null ou vide
                    <Link className="main-nav-item" to="/sign-in">
                        <i className="fa fa-user-circle"> </i>
                        Sign In
                    </Link>
                ) : (
                    <>
                        <Link className="main-nav-item" to="/profile">
                            <i className="fa fa-user-circle"> </i>
                            {firstName}
                        </Link>
                        <button className="main-nav-item" onClick={handleSignOff}>
                            <i className="fa-solid fa-arrow-right-from-bracket"></i>
                            Sign Out
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
