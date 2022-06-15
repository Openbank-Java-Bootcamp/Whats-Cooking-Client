import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function HomePage() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div className="HomePage">
      <div className="parallelax1"></div>
      <div>
        <div className="text">What's Cooking?</div>
      </div>
      <div className="parallelax1"></div>

      <div className="home-page-box">
        <p>
          In the past, recipes were passed down through families on handwritten
          cards or gathered in cookbooks with notes jotted in the margins.
        </p>
      </div>

      <div className="parallelax2"></div>
      <div className="home-page-box">
        <p>
        Now you can share all your favorite recipes with loved ones near and
          far. Don’t forget to add the secret ingredient! (Heart)
        </p>
      </div>
      <div className="parallelax2"></div>

      <div className="home-page-box3">
        <h1>Bon Apetit!</h1>
      </div>

      <div className="parallelax3"></div>
      {!isLoggedIn && (
        <Link to="/signup">
          <div className="sign-up">Sign Up</div>
        </Link>
      )}
      <div className="parallelax3"></div>
    </div>
  );
}

export default HomePage;
