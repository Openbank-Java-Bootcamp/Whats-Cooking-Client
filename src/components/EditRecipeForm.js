// import { Link } from "react-router-dom";

// function EditRecipeForm({title, prepTime, cookTime, servings, ingredients, directions, image, handleSubmit, goBack}) {

//     const onFormChange = (e) => {
//         console.log("file to upload:", e.target.files[0]);
//         let file = e.target.files[0];
    
//         if (file) {
//           const reader = new FileReader();
//           reader.onload = _handleReaderLoaded.bind(this);
    
//           reader.readAsBinaryString(file);
//         }
//       };

//     return (
//         <div className="EditRecipeForm">
//       <h1>Recipe Details:</h1>
//       <form onSubmit={handleSubmit} onChange={(e) => onFormChange(e)}>
//         <label>Title: </label>
//         <input
//           type="text"
//           name="title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />

//         <label>Prep Time: </label>
//         <input
//           type="number"
//           name="prepTime"
//           value={prepTime}
//           onChange={(e) => setPrepTime(e.target.value)}
//         />

//         <label>Cook Time: </label>
//         <input
//           type="number"
//           name="cookTime"
//           value={cookTime}
//           onChange={(e) => setCookTime(e.target.value)}
//         />

//         <label>Servings: </label>
//         <input
//           type="number"
//           name="servings"
//           value={servings}
//           onChange={(e) => setServings(e.target.value)}
//         />

//         <label>Ingredients: </label>
//         <textarea
//           type="text"
//           name="ingredients"
//           value={ingredients}
//           onChange={(e) => setIngredients(e.target.value)}
//         />

//         <label>Directions: </label>
//         <textarea
//           type="text"
//           name="directions"
//           value={directions}
//           onChange={(e) => setDirections(e.target.value)}
//         />

//         <label>Image</label>
//         <input type="file" name="image" id="file" accept=".jpeg, .png, .jpg" />

//         <button type="submit">Save</button>
//         <Link to={goBack}><button>Cancel</button></Link>
//       </form>
//     </div>

//     );
// }

// export default EditRecipeForm;