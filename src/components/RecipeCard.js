import { NavLink } from "react-router-dom";


function RecipeCard(props) {
    const [recipe] = props;

    return (
        <div className="RecipeCard">
            <NavLink to={`/recipes/${recipe.id}`}>
                <img src="../assets/catchef.jpg" />
                <h3>{recipe.name}</h3>
            </NavLink>
        </div>
    );
}

export default RecipeCard;