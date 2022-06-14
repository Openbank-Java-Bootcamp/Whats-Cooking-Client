import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";

const API_URL = "http://localhost:8081/api";

function CookbookDetailsPage(){

    const [cookbook, setCookbook] = useState(null);
    const {cookbookId} = useParams();

    const getCookbook = () => {
        const storedToken = localStorage.getItem("authToken");

        axios.get(`${API_URL}/cookbooks/${cookbookId}`, {
            headers: { Authorization: `Bearer ${storedToken}`},
        })
        .then((response) => {
            const oneCookbook = response.data;
            setCookbook(oneCookbook);
        })
        .catch((error) => console.log(error));
    };


    useEffect(() => {
        getCookbook();
    }, [])

    return (
        <div className="Cookbook">
            {cookbook && (
                <div>
                    <button>Delete my Account</button>
                    <h1>{cookbook.owner.name}'s Cookbook</h1>
                    <Link to="/recipes/new">Create a new recipe</Link>
                    {cookbook.recipeList.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe}/>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CookbookDetailsPage;