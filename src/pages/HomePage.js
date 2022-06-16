import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function HomePage() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div className="HomePage">
      <div className="homepage-background1"></div>
      <div>
        <div className="logo-text">What's Cooking?</div>
      </div>
      <div className="homepage-background1"></div>

      <div className="homepage-scroll1">
        <p>
          In the past, recipes were passed down through families on handwritten
          cards or gathered in cookbooks with notes jotted in the margins.
        </p>
      </div>

      <div className="homepage-background2"></div>
      <div className="homepage-scroll1">
        <p>
        Now you can share all of your favorite recipes with loved ones near and
          far. Don’t forget to include the secret ingredient!
        </p>
      </div>
      <div className="homepage-background2"></div>

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
