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
        <>
          <Link to="/recipes">
            <button className="fade-button">Recipes</button>
          </Link>
          <Link to="/">
            <button className="fade-button" onClick={logOutUser}>
              Logout
            </button>
          </Link>
          <div className="user-nav">
            <span>{user && user.name}</span>
            <Link to={`/cookbooks/${user.id}`}>
              <button className="fade-button">My Cookbook</button>
            </Link>
          </div>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            <button className="fade-button">Sign Up</button>
          </Link>
          <Link to="/login">
            <button className="fade-button">Login</button>
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
