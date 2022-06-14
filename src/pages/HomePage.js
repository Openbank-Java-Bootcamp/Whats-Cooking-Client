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

      <div className="home-page-box1">
        <p>
          In the past, recipes were passed down through families on handwritten
          cards or gathered in cookbooks with notes jotted in the margins.
        </p>
        <p>
          Now you can share all your favorite recipes with loved ones near and
          far. Don’t forget to add the secret ingredient! (Heart)
        </p>
      </div>

      <div className="parallelax2"></div>
      <div className="home-page-box2">
        <p>
          Do you know that in Europe approximately 32% of all food purchased is
          not eaten? Avoid contributing to food waste by using the Search By
          Ingredients feature to find recipes using ingredients you already have
          in your kitchen! (green leaf icon/recycling icon)
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
