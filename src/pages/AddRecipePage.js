import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:8081/api";

function AddRecipePage() {
  const [title, setTitle] = useState("");
  const [prepTime, setPrepTime] = useState(0);
  const [cookTime, setCookTime] = useState(0);
  const [servings, setServings] = useState(0);
  const [ingredients, setIngredients] = useState("");
  const [directions, setDirections] = useState("");
  const [image, setImage] = useState("");

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
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
      image
    };
    console.log(requestBody);

    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${API_URL}/recipes`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setTitle("");
        setPrepTime(0);
        setCookTime(0);
        setServings(0);
        setIngredients("");
        setDirections("");
        setImage("");

        navigate(`/cookbooks/${user.id}`);
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

  //form
  return (
    <div className="AddRecipe">
      <h1>New Recipe:</h1>
      <form onSubmit={handleSubmit} onChange={(e) => onFormChange(e)}>
        <label>Title: </label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Prep Time: </label>
        <input
          type="number"
          name="prepTime"
          value={prepTime}
          onChange={(e) => setPrepTime(e.target.value)}
        />

        <label>Cook Time: </label>
        <input
          type="number"
          name="cookTime"
          value={cookTime}
          onChange={(e) => setCookTime(e.target.value)}
        />

        <label>Servings: </label>
        <input
          type="number"
          name="servings"
          value={servings}
          onChange={(e) => setServings(e.target.value)}
        />

        <label>Ingredients: </label>
        <textarea
          type="text"
          name="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />

        <label>Directions: </label>
        <textarea
          type="text"
          name="directions"
          value={directions}
          onChange={(e) => setDirections(e.target.value)}
        />

        <label>Image</label>
        <input type="file" name="image" id="file" accept=".jpeg, .png, .jpg" />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddRecipePage;
