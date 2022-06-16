import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:8081/api";

function EditRecipePage(props) {
  const { recipeId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [prepTime, setPrepTime] = useState(0);
  const [cookTime, setCookTime] = useState(0);
  const [servings, setServings] = useState(0);
  const [ingredients, setIngredients] = useState("");
  const [directions, setDirections] = useState("");
  const [image, setImage] = useState("");

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    //get recipe from api
    axios
      .get(`${API_URL}/recipes/${recipeId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        //set states for attributes
        const oneRecipe = response.data;
        setTitle(oneRecipe.title);
        setPrepTime(oneRecipe.prepTime);
        setCookTime(oneRecipe.cookTime);
        setServings(oneRecipe.servings);
        setIngredients(oneRecipe.ingredients);
        setDirections(oneRecipe.directions);
        setImage(oneRecipe.image);
      })
      .catch((error) => console.log(error));
  }, [recipeId]);

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const editRecipe = (e) => {
    e.preventDefault();
    const userId = user.id;
    const requestBody = {
      title,
      prepTime,
      cookTime,
      servings,
      ingredients,
      directions,
      userId,
      image,
    };
    console.log(requestBody);

    axios
      .put(`${API_URL}/recipes/${recipeId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        navigate(`/recipes/${recipeId}`);
      })
      .catch((error) => console.log(error));
  };

  const onFormChange = (e) => {
    console.log("file to upload:", e.target.files[0]);
    let file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = _handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  };

  const _handleReaderLoaded = (readerEvt) => {
    let binaryString = readerEvt.target.result;
    setImage(btoa(binaryString));
  };

  return (
    <div className="AddRecipe">
      <form onSubmit={editRecipe} onChange={(e) => onFormChange(e)}>
        <h1>Edit Recipe:</h1>
        <label>Title: </label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="recipe-numbers">
          <div>
            <label>Prep Time: </label>
            <input
              type="number"
              name="prepTime"
              value={prepTime}
              onChange={(e) => setPrepTime(e.target.value)}
            />
          </div>
          <div>
            <label>Cook Time: </label>
            <input
              type="number"
              name="cookTime"
              value={cookTime}
              onChange={(e) => setCookTime(e.target.value)}
            />
          </div>
          <div>
            <label>Servings: </label>
            <input
              type="number"
              name="servings"
              value={servings}
              onChange={(e) => setServings(e.target.value)}
            />
          </div>
        </div>
        <label>Ingredients: </label>
        <textarea
          type="text"
          name="ingredients"
          value={ingredients}
          cols="40"
          rows="10"
          onChange={(e) => setIngredients(e.target.value)}
        />

        <label>Directions: </label>
        <textarea
          type="text"
          name="directions"
          value={directions}
          cols="40"
          rows="10"
          onChange={(e) => setDirections(e.target.value)}
        />

        <label>Image</label>
        <input type="file" name="image" id="file" accept=".jpeg, .png, .jpg" />

        <button className="fade-button" type="submit">Save</button>
        <Link to={`/recipes/${recipeId}`}>
          <button className="fade-button">Cancel</button>
        </Link>
      </form>
    </div>
  );
}

export default EditRecipePage;
