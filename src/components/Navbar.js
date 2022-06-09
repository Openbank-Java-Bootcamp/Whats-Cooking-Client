import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <Link to="/api/recipes">
                <button>Recipes</button>
            </Link>

            <Link to="/api/auth/signup">
                <button>Sign Up</button>
            </Link>

            <Link to="/api/auth/login">
                <button>Login</button>
            </Link>
        </nav>
    );
}

export default Navbar;