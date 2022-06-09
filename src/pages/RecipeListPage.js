import axios from "axios";
import { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";

const API_URL = "http://localhost:8081/api";

function RecipeListPage() {
  //1 useState to for objects
  const [recipes, setRecipes] = useState([]);

  //get recipes from the api
  const getAllRecipes = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/recipes`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setRecipes(response.data))
      .catch((error) => console.log(error));
  };

  //run once
  useEffect(() => {
    getAllRecipes();
  }, []);

  return (
    <div className="RecipeListPage">
      <h1>Recipes</h1>
      <div>search bar will go here</div>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

export default RecipeListPage;
