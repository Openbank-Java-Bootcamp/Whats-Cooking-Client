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

  const getRecipe = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/recipes/${recipeId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneRecipe = response.data;
        setRecipe(oneRecipe);
        //console.log("found recipe:", oneRecipe);
        const userNote = oneRecipe.notes.find((el) => el.userId == user.id);
        //console.log("userNote:", userNote);
        {
          userNote && setNote(userNote);
        }
      })
      .catch((error) => console.log(error));
    //console.log("recipe", recipe);
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

  useEffect(() => {
    getRecipe();
  }, [isEditMode]);


  //add this recipe to user's cookbook
  const addRecipeToCookbook = () => {
    const requestBody = {recipe};
    const storedToken = localStorage.getItem("authToken");
    axios
    .patch(`${API_URL}/cookbooks/${user.id}`, requestBody, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then((response) => {
      
    })
    .catch((error) => console.log(error));
  };

  // useEffect(() => {
  //   document.title = `${recipe.title}`;
  // }, [recipe]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="RecipeDetailsPage">
      {recipe && (
        <>
          <button onClick={goBack}>Go Back</button>
          <div>
            <h1>{recipe.title}</h1>
            <p>Added by: {recipe.addedBy.name}</p>
          </div>
          <div>
            <button onClick={addRecipeToCookbook}>Save to My Cookbook</button>
            <EditCookbookButton recipe={recipe} />
            <Link to={`/recipes/edit/${recipeId}`}>
              <button>Edit Recipe</button>
            </Link>
            <button onClick={deleteRecipe}>Delete Recipe</button>
          </div>
          <div className="photo-and-note">
            <img src={`data:image/png;base64,${recipe.image}`} />
            {!isEditMode && (
              <div>
                {!note && <button onClick={toggleEditMode}>Make a Note</button>}
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
