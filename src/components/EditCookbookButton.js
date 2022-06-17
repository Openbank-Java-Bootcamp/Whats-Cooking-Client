import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

const API_URL = "http://localhost:8081/api";

//this appears on the recipe details page and allows the user to add/remove that recipe to their cookbook
function EditCookbookButton({ recipe }) {
  const { user } = useContext(AuthContext);
  const [cookbook, setCookbook] = useState(null);
  const [isInCookbook, setIsInCookbook] = useState(false);
  //const [recipeList, setRecipeList] = useState([]);

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
        //check if recipe exists in the cookbook and setIsInCookbook if true, this will change the text on the button to the appropriate option
        {oneCookbook.recipeList.some(el => el.id === recipe.id) && setIsInCookbook(true)};
      })
      .catch((error) => console.log(error));
  };

  // const checkIfRecipeInCookbook = () => {
  //   console.log("cookbook", cookbook);
  //   {
  //     cookbook.recipeList.includes(recipe)
  //       ? setIsInCookbook(true)
  //       : setIsInCookbook(false);
  //   }
  // };

  //this sends the cookbook id and recipe id and the backend will create or remove the relationship
  const editCookbook = () => {
    const storedToken = localStorage.getItem("authToken");
    const recipeId = recipe.id;
    //just sending cookbookId and recipeId in the request and the backend will determine if recipe needs to be added or removed
    axios
      .patch(`${API_URL}/cookbooks/${cookbookId}`, {recipeId}, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        toggleIsInCookbook();
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCookbook();
  }, []);

  return (
    <div className="EditCookbookButton">
      <button className="fade-button" onClick={editCookbook}>
        {!isInCookbook ? "Add to My Cookbook" : "Remove from My Cookbook"}
      </button>
    </div>
  );
}

export default EditCookbookButton;
