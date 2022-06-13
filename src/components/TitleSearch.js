import { useState } from "react";

function TitleSearch({ filterRecipeHandler }) {
  const [char, setChar] = useState("");

  const handleSearch = (event) => {
    setChar(event.target.value);
    filterRecipeHandler(event.target.value);
  };

  return (
    <div className="TitleSearch">
      {/* <label>Search titles:</label> */}
      <input
        type="text"
        value={char}
        onChange={handleSearch}
        placeholder="Search by title.."
      />
    </div>
  );
}

export default TitleSearch;
