import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:8081/api";

function AddRecipePage() {
  const [title, setTitle] = useState("");
  const [prepTime, setPrepTime] = useState(null);
  const [cookTime, setCookTime] = useState(null);
  const [servings, setServings] = useState(null);
  const [ingredients, setIngredients] = useState("");
  const [directions, setDirections] = useState("");
  const [image, setImage] = useState("");

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
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

    const storedToken = localStorage.getItem("authToken");
    axios
      .post(`${API_URL}/recipes`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        navigate(`/cookbooks/${user.id}`);
      })
      .catch((error) => console.log(error));
  };

  //this is for the image upload
  const onFormChange = (e) => {
    let file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = _handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  };
//also for the image upload
  const _handleReaderLoaded = (readerEvt) => {
    let binaryString = readerEvt.target.result;
    setImage(btoa(binaryString));
  };

  //form
  return (
    <div className="AddRecipe">
      <div className="add-recipe-background">
        <form onSubmit={handleSubmit} onChange={(e) => onFormChange(e)}>
          <h1>New Recipe:</h1>
          <label>Title: </label>
          <input
            required
            type="text"
            name="title"
            value={title}
            maxLength= "50"
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
            required
            name="ingredients"
            value={ingredients}
            cols="40"
            rows="10"
            placeholder="Enter ingredients separated by a comma: first ingredient, second ingredient, etc"
            onChange={(e) => setIngredients(e.target.value)}
          />

          <label>Directions: </label>
          <textarea
            required
            type="text"
            name="directions"
            value={directions}
            cols="40"
            rows="10"
            onChange={(e) => setDirections(e.target.value)}
          />

          <label>Image</label>
          <input
            type="file"
            name="image"
            id="file"
            accept=".jpeg, .png, .jpg"
          />

          <button className="fade-button" type="submit">
            Save
          </button>
          <Link to={`/cookbooks/${user.id}`}>
            <button className="fade-button">Cancel</button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default AddRecipePage;
