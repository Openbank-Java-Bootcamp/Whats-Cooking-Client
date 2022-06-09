import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <Link to="/">
                <button>Home</button>
            </Link>

            {isLoggedIn && (
                <>
                    <Link to="/recipes">
                        <button>Recipes</button>
                    </Link>
                    <button onClick={logOutUser}>Logout</button>
                    <div>
                        <span>{user && user.name}</span>
                        <Link to={`/cookbooks/${user.id}`}>
                            <button>My Cookbook</button>
                        </Link>
                    </div>
                </>
            )}

            {!isLoggedIn && (
                <>
                    <Link to="/signup">
                        <button>Sign Up</button>
                    </Link>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </>
            )}

        </nav>
    );
}

export default Navbar;