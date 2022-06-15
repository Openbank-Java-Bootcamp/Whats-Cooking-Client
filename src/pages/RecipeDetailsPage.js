import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import catChefPath from "../assets/catchef.jpg";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import NoteCard from "../components/NoteCard";
import NoteForm from "../components/NoteForm";
import EditCookbookButton from "../components/EditCookbookButton";

const API_URL = "http://localhost:8081/api";

function RecipeDetailsPage() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const { recipeId } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [note, setNote] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [ingredientArr, setIngredientArr] = useState([]);

  const getRecipe = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/recipes/${recipeId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneRecipe = response.data;
        setRecipe(oneRecipe);
        const userNote = oneRecipe.notes.find((el) => el.userId == user.id);
        {
          userNote && setNote(userNote);
        }
      })
      .catch((error) => console.log(error));
  };

  const deleteRecipe = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .delete(`${API_URL}/recipes/${recipeId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate(`/cookbooks/${user.id}`);
      })
      .catch((err) => console.log(err));
  };

  //control editMode for editing Note
  const toggleEditMode = () => {
    isEditMode ? setIsEditMode(false) : setIsEditMode(true);
  };

  const isOwner = () => {
    return user.id == recipe.addedBy.id;
  };


  //add this recipe to user's cookbook
  const addRecipeToCookbook = () => {
    const requestBody = { recipe };
    const storedToken = localStorage.getItem("authToken");
    axios
      .patch(`${API_URL}/cookbooks/${user.id}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {})
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getRecipe();
  }, [isEditMode, recipeId]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="RecipeDetailsPage">
      {recipe && (
        <>
          <button className="fade-button go-back" onClick={goBack}>
            Go Back
          </button>
          <div>
            <h1>{recipe.title}</h1>
            <Link to={`/cookbooks/${recipe.addedBy.id}`}>
              <p>Added by: {recipe.addedBy.name}</p>
            </Link>
          </div>
          <div className="recipe-buttons">
            <EditCookbookButton recipe={recipe} />
            {isOwner() && (
              <div>
                <Link to={`/recipes/edit/${recipeId}`}>
                  <button className="outline-button">Edit Recipe</button>
                </Link>
                <button className="outline-button" onClick={deleteRecipe}>
                  Delete Recipe
                </button>
              </div>
            )}
          </div>
          <div className="photo-and-note">
            <img
              className="recipe-image"
              src={`data:image/png;base64,${recipe.image}`}
            />
            {!isEditMode && (
              <div>
                {!note && (
                  <button className="fade-button" onClick={toggleEditMode}>
                    Make a Note
                  </button>
                )}
                {note && (
                  <NoteCard
                    note={note}
                    toggleEditMode={toggleEditMode}
                    setNote={setNote}
                  />
                )}
              </div>
            )}
            {isEditMode && (
              <NoteForm
                note={note}
                toggleEditMode={toggleEditMode}
                userId={user.id}
                recipeId={recipeId}
              />
            )}
          </div>
          <div className="recipe-times">
            <h3>Prep Time: {recipe.prepTime} min</h3>
            <h3>Cook Time: {recipe.cookTime} min</h3>
            <h3>Servings: {recipe.servings}</h3>
          </div>
          <div className="ingredients-directions">
            <ul className="ingredients">
              {/* <p>{recipe.ingredients}</p> */}
              {recipe.ingredients.split(",").map((el) => (
                <li className="ingredient-item">{el}</li>
              ))}
            </ul>
            <div className="directions">
              <p>{recipe.directions}</p>
            </div>
          </div>
        </>
      )}
      {!recipe && <h1>No recipe</h1>}
    </div>
  );
}

export default RecipeDetailsPage;
