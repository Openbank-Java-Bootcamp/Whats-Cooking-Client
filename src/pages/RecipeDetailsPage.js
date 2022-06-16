import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import catChefPath from "../assets/catchef.jpg";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import NoteCard from "../components/NoteCard";
import NoteForm from "../components/NoteForm";
import EditCookbookButton from "../components/EditCookbookButton";
import Navbar from "../components/Navbar";
import placeholder from "../assets/image-placeholder.png";

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
      <Navbar />
      {recipe && (
        <div className="recipe-box">
          <div className="recipe-column1">
            <button className="fade-button go-back" onClick={goBack}>
              Go Back
            </button>
          </div>

          <div className="recipe-column2">
            <div className="recipe-page-top">
              <div className="recipe-title">
                <h1>{recipe.title}</h1>
              </div>
              <div className="buttons">
                <EditCookbookButton recipe={recipe} />
                <Link to={`/cookbooks/${recipe.addedBy.id}`}>
                  <p>Added by: {recipe.addedBy.name}</p>
                </Link>
                <div>
                  {isOwner() && (
                    <div className="recipe-buttons">
                      <Link to={`/recipes/edit/${recipeId}`}>
                        <button className="fade-button">Edit Recipe</button>
                      </Link>
                      <button className="fade-button" onClick={deleteRecipe}>
                        Delete Recipe
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="recipe-page-middle">
              <div className="photo-and-note">
                {recipe.image && (
                  <img
                    className="recipe-image"
                    src={`data:image/png;base64,${recipe.image}`}
                  />
                )}
                {!recipe.image && <img src={placeholder} />}
              </div>
              <div className="recipe-times">
                <h3>Prep Time: {recipe.prepTime} min</h3>
                <h3>Cook Time: {recipe.cookTime} min</h3>
                <h3>Servings: {recipe.servings}</h3>
              </div>
            </div>

            <div className="recipe-page-bottom">
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
          </div>

          <div className="recipe-column3">
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
        </div>
      )}
      {!recipe && <h1>No recipe</h1>}
    </div>
  );
}

export default RecipeDetailsPage;
