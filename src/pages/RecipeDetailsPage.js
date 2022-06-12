import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import catChefPath from "../assets/catchef.jpg";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import NoteCard from "../components/NoteCard";
import NoteForm from "../components/NoteForm";

const API_URL = "http://localhost:8081/api";

function RecipeDetailsPage(props) {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const { recipeId } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [note, setNote] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const storedToken = localStorage.getItem("authToken");

  const getRecipe = () => {
    axios
      .get(`${API_URL}/recipes/${recipeId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneRecipe = response.data;
        setRecipe(oneRecipe);
        console.log("recipe:", oneRecipe);
      })
      .catch((error) => console.log(error));
  };


  const getNote = () => {
    console.log("recipe notes:", recipe.notes);
    const userNote = recipe.notes.find(el => el.userId == user.id);
    console.log("user note:", userNote);
    setNote(userNote);
    console.log(note);
  };

  const toggleEditMode = () => {
    isEditMode ? setIsEditMode(false) : setIsEditMode(true);
  };

  useEffect(() => {
    getRecipe();
    getNote();
  }, []);

  // useEffect(() => {
  //   getNote();
  // }, [isEditMode]);

  return (
    <div className="RecipeDetailsPage">
      {recipe && (
        <>
          {props.cookbookId && (
            <Link to={`/cookbooks/${props.cookbookId}`}>
              <button>Back to Cookbook</button>
            </Link>
          )}
          <div>
            <h1>{recipe.title}</h1>
            <p>Added by: {recipe.addedBy.name}</p>
          </div>
          <div className="photo-and-note">
            <img src={catChefPath} />
            {!isEditMode && (
              <div>
                {!note && (
                    <button onClick={toggleEditMode}>Make a Note</button>
                )}
                {note && <NoteCard content={note.content}/>}
              </div>
            )}
            {isEditMode && <NoteForm note={note} toggleEditMode={toggleEditMode} userId={user.id} recipeId={recipeId}/>}
          </div>
          <div>
            <button>Save to My Cookbook</button>
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
