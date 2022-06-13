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
        const userNote = oneRecipe.notes.find(el => el.userId == user.id);
        //console.log("userNote:", userNote);
        {userNote && setNote(userNote)};
      })
      .catch((error) => console.log(error));
      //console.log("recipe", recipe);
  };


  const toggleEditMode = () => {
    isEditMode ? setIsEditMode(false) : setIsEditMode(true);
  };

  useEffect(() => {
    getRecipe();
    //getNote();
  }, [isEditMode]);

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
            <img src={`data:image/png;base64,${recipe.image}`} />
            {!isEditMode && (
              <div>
                {!note && (
                    <button onClick={toggleEditMode}>Make a Note</button>
                )}
                {note && <NoteCard note={note} toggleEditMode={toggleEditMode} setNote={setNote}/>}
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
