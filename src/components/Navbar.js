import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import SignupPage from "../pages/SignupPage";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="Navbar">
      <Link to="/">
        <button className="fade-button">Home</button>
      </Link>

      {isLoggedIn && (
        <div className="navbar-loggedin">
          <Link to="/recipes">
            <button className="fade-button">Recipes</button>
          </Link>
          <div className="user-nav">
            <span><h1>{user && user.name}</h1></span>
            <Link to="/">
            <button className="fade-button" onClick={logOutUser}>
              Logout
            </button>
          </Link>
            <Link to={`/cookbooks/${user.id}`}>
              <button className="fade-button">My Cookbook</button>
            </Link>
          </div>
        </div>
      )}

      {!isLoggedIn && (
        <div className="navbar-loggedout">
          <Link to="/signup">
            <button className="fade-button">Sign Up</button>
          </Link>
          <Link to="/login">
            <button className="fade-button">Login</button>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
