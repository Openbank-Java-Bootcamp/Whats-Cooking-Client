import { NavLink } from "react-router-dom";
import placeholder from "../assets/image-placeholder.png";

function RecipeCard(props) {
  const { recipe } = props;

  return (
    <NavLink className="RecipeCard" to={`/recipes/${recipe.id}`}>
      <div className="thumbnail">
        {recipe.image && <img src={`data:image/png;base64,${recipe.image}`} />}
        {!recipe.image && <img src={placeholder} />}
      </div>
      <div className="recipe-card-title">
        <h3>{recipe.title}</h3>
      </div>
    </NavLink>
  );
}

export default RecipeCard;
