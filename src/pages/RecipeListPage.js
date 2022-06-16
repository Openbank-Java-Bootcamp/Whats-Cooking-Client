import axios from "axios";
import { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import Search from "../components/Search";

const API_URL = "http://localhost:8081/api";

function RecipeListPage() {
  const [recipes, setRecipes] = useState([]);
  const [updatedRecipes, setUpdatedRecipes] = useState([]);

  const getAllRecipes = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/recipes`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setRecipes(response.data);
        setUpdatedRecipes(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllRecipes();
  }, []);

  return (
    <div className="RecipeListPage">
      <div className="recipe-list-background">
        <div className="recipe-list-header">
          <h1>Recipes</h1>
          <div className="search-box">
            <Search
              getAllRecipes={getAllRecipes}
              setUpdatedRecipes={setUpdatedRecipes}
            />
          </div>
        </div>
        <div className="recipe-card-box">
          {updatedRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecipeListPage;
