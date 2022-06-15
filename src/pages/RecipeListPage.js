import Search from "antd/lib/transfer/search";
import axios from "axios";
import { useState, useEffect } from "react";
import IngredientSearch from "../components/IngredientSearch";
import RecipeCard from "../components/RecipeCard";
import TitleSearch from "../components/TitleSearch";

const API_URL = "http://localhost:8081/api";

function RecipeListPage() {
  //useState for objects
  const [recipes, setRecipes] = useState([]);
  const [updatedRecipes, setUpdatedRecipes] = useState([]);

  //get recipes from the api
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

  const filteredRecipesByTitle = (char) => {
    let filteredRecipes;
    if (char === "") {
      filteredRecipes = recipes;
    } else {
      filteredRecipes = updatedRecipes.filter((el) => {
        return el.title.toLowerCase().includes(char.toLowerCase());
      });
    }
    setUpdatedRecipes(filteredRecipes);
  };

  const filteredRecipesByIngredients = (ingredient) => {
    let filteredRecipes;
    console.log("ing:", ingredient);
    if (ingredient === "") {
      filteredRecipes = recipes;
      setUpdatedRecipes(filteredRecipes);
    } else {
      filteredRecipes = updatedRecipes.filter((recipe) => {
        console.log(recipe.ingredients);
        return recipe.ingredients
          .toLowerCase()
          .includes(ingredient.toLowerCase());
      });
    }
    setUpdatedRecipes(filteredRecipes);
  };

  const resetRecipes = () => {
    setUpdatedRecipes(recipes);
  };

  //run once
  useEffect(() => {
    getAllRecipes();
  }, []);

  return (
    <div className="RecipeListPage">
      <h1>Recipes</h1>
      <div className="search-box">
        <TitleSearch setUpdatedRecipes={setUpdatedRecipes} />
        {/* <IngredientSearch filterRecipeHandler={filteredRecipesByIngredients} /> */}
        <button className="block-button" onClick={resetRecipes}>
          Clear Search
        </button>
      </div>
      <div className="recipe-card-box">
        {updatedRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default RecipeListPage;
