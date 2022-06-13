import { NavLink } from "react-router-dom";
import catChefPath from "../assets/catchef.jpg";

function RecipeCard(props) {
    const {recipe} = props;

    return (
        <div className="RecipeCard">
            <NavLink to={`/recipes/${recipe.id}`}>
                <img src={`data:image/png;base64,${recipe.image}`} />
                <h3>{recipe.title}</h3>
            </NavLink>
        </div>
    );
}

export default RecipeCard;