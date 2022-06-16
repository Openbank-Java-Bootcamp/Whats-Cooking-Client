import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";

const API_URL = "http://localhost:8081/api";

function CookbookDetailsPage() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [cookbook, setCookbook] = useState(null);
  const { cookbookId } = useParams();

  const getCookbook = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/cookbooks/${cookbookId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneCookbook = response.data;
        setCookbook(oneCookbook);
      })
      .catch((error) => console.log(error));
  };

  const isOwner = () => {
    return user.id == cookbook.id;
  };

  useEffect(() => {
    getCookbook();
  }, [cookbookId]);

  return (
    <div className="Cookbook">
      <div className="cookbook-background">
        {cookbook && (
          <div className="transparent-box">
            <div>
              {isOwner() && <button className="small-fade-button delete-account-button">Delete my Account</button>}
              <h1>{isOwner() ? "My" : `${cookbook.owner.name}'s`} Cookbook</h1>
              <Link to="/recipes/new">
                <button className="fade-button">CREATE NEW RECIPE</button>
              </Link>
              <div className="recipe-card-box">
                {cookbook.recipeList.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CookbookDetailsPage;
