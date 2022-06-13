import { useState } from "react";

function IngredientSearch({ filterRecipeHandler }) {

  const [char, setChar] = useState("");

  const handleSearch = (event) => {
    setChar(event.target.value);
    filterRecipeHandler(char);
  };

  return (
    <div className="IngredientSearch">
      <div>
        <input
          type="text"
          value={char}
          onChange={(e) => setChar(e.target.value)}
          placeholder="Search by ingredient.."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
}

export default IngredientSearch;
