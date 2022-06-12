import Search from "antd/lib/transfer/search";
import axios from "axios";
import { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import TitleSearch from "../components/TitleSearch";

const API_URL = "http://localhost:8081/api";

function RecipeListPage() {
  //1 useState to for objects
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

  const filteredRecipesByIngredients = (char) => {
    let filteredRecipes;
    if (char === "") {
      filteredRecipes = recipes;
      setUpdatedRecipes(filteredRecipes);
    } else {
      const ingredientsArr = char.split(",");
      ingredientsArr.forEach((ingredient) => {
        filteredRecipes = updatedRecipes.filter((el) => {
          el.ingredients.toLowerCase().includes(ingredient.toLowerCase());
        });
        setUpdatedRecipes(filteredRecipes);
      });
    }
  };

  //run once
  useEffect(() => {
    getAllRecipes();
  }, []);

  return (
    <div className="RecipeListPage">
      <h1>Recipes</h1>
      <TitleSearch filterRecipeHandler={filteredRecipesByTitle} message="Search by title"/>
      <TitleSearch filterRecipeHandler={filteredRecipesByIngredients} message="Search by ingredients"/>
      {/* {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))} */}
      {updatedRecipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

export default RecipeListPage;
