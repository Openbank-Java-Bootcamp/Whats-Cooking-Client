import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

const API_URL = "http://localhost:8081/api";

function EditCookbookButton({ recipe }) {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [cookbook, setCookbook] = useState(null);
  const [isInCookbook, setIsInCookbook] = useState(false);
  const [recipeList, setRecipeList] = useState([]);

  const toggleIsInCookbook = () => {
    isInCookbook ? setIsInCookbook(false) : setIsInCookbook(true);
  };

  const cookbookId = user.id;

  const getCookbook = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/cookbooks/${cookbookId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneCookbook = response.data;
        setCookbook(oneCookbook);
      })
      .catch((error) => console.log(error));
  };

  const editCookbook = () => {
    //check if recipe exists in the cookbook recipeList, then add or remove as appropriate
    const editedRecipeList = cookbook.recipeList.slice();
    if (!editedRecipeList.includes(recipe)) {
      editedRecipeList.push(recipe);
    } else {
      editedRecipeList = editedRecipeList.filter((el) => el !== recipe);
    }

    //patch cookbook recipeList in server
    const storedToken = localStorage.getItem("authToken");
    const requestBody = { recipeList };
    axios
      .patch(`${API_URL}/cookbooks/${cookbookId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        toggleIsInCookbook();
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCookbook();
  }, [isInCookbook]);

  return (
    <div className="EditCookbookButton">
      <button onClick={editCookbook}>
        {!isInCookbook ? "Add to My Cookbook" : "Remove from My Cookbook"}
      </button>
    </div>
  );
}

export default EditCookbookButton;
