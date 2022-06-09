import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import catChefPath from "../assets/catchef.jpg";

const API_URL = "http://localhost:8081/api";

function RecipeDetailsPage() {
    const [recipe, setRecipe] = useState(null);
    const {recipeId} = useParams();

    const getRecipe = () => {
        const storedToken = localStorage.getItem("authToken");

        axios.get(`${API_URL}/recipes/${recipeId}`, {
            headers: { Authorization: `Bearer ${storedToken}`},
        })
        .then((response) => {
            const oneRecipe = response.data;
            setRecipe(oneRecipe);
        })
        .catch((error) => console.log(error));
    };

    useEffect(() => {
        getRecipe();
    }, []);

    return (
        <div className="RecipeDetails">
            {recipe && (
            <>
            <img src={catChefPath} />
            <h1>{recipe.title}</h1>
            <p>Added by: {recipe.addedBy.name}</p>
            <div>
                <h3>Prep Time: {recipe.prepTime} min</h3>
                <h3>Cook Time: {recipe.cookTime} min</h3>
                <h3>Servings: {recipe.servings}</h3>
            </div>
            <hr />
            <p>{recipe.ingredients}</p>
            <hr />
            <p>{recipe.directions}</p>
            </>
            )}
        </div>

    );
}

export default RecipeDetailsPage;