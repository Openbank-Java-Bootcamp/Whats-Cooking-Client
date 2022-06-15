// import { useContext } from "react";
// import { AuthContext } from "../context/auth.context";
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import NoteCard from "../components/NoteCard";

// const API_URL = "http://localhost:8081/api";

// function CookbookRecipePage({ author }) {
//   const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

//   const { recipeId } = useParams();
//   const [recipe, setRecipe] = useState(null);

//   const getRecipe = () => {
//     const storedToken = localStorage.getItem("authToken");
//     axios
//       .get(`${API_URL}/recipes/${recipeId}`, {
//         headers: { Authorization: `Bearer ${storedToken}` },
//       })
//       .then((response) => {
//         const oneRecipe = response.data;
//         setRecipe(oneRecipe);
//       })
//       .catch((error) => console.log(error));
//   };

//   const userNote = user.notes.find((el) => el.recipe === recipe);

//   const authorNote = author.notes.find((el) => el.recipe === recipe);

//   useEffect(() => {
//     getRecipe();
//   }, []);

//   return (
//     <div className="CookbookRecipePage">
//       {recipe && (
//         <>
//           <div>
//             <h1>{recipe.title}</h1>
//             <p>Added by: {recipe.addedBy.name}</p>
//           </div>
//           <div>
//             <img src={catChefPath} />
//             <div>
//               {userNote && <NoteCard note={userNote} />}
//               {authorNote && <NoteCard note={authorNote} />}
//             </div>
//           </div>
//           <div>
//             <button>Save to My Cookbook</button>
//           </div>
//           <div>
//             <h3>Prep Time: {recipe.prepTime} min</h3>
//             <h3>Cook Time: {recipe.cookTime} min</h3>
//             <h3>Servings: {recipe.servings}</h3>
//           </div>
//           <hr />
//           <p>{recipe.ingredients}</p>
//           <hr />
//           <p>{recipe.directions}</p>
//         </>
//       )}
//     </div>
//   );
// }

// export default CookbookRecipePage;
