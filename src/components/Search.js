import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8081/api";

function Search({ getAllRecipes, setUpdatedRecipes }) {
  
  const [query, setQuery] = useState("");

  //search for recipes whose title or ingredients include the query value
  const getFilteredRecipes = (e) => {
    const storedToken = localStorage.getItem("authToken");

    if (query === "") {
      getAllRecipes();
    } else {
      axios
      .get(`${API_URL}/recipes/search?query=${query}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setUpdatedRecipes(response.data);
        console.log("response ", response.data)
      })
      .catch((error) => console.log(error));
    }
  }

  const clearSearch = () => {
    setQuery("");
    getAllRecipes();
  }

  const handleSearch = (event) => {
    getFilteredRecipes();
  };

  return (
    <div className="Search">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search .."
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={clearSearch}>Clear Search</button>
    </div>
  );
}

export default Search;
