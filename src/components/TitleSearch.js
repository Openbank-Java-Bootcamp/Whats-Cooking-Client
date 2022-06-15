import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8081/api";

function TitleSearch({ setUpdatedRecipes }) {
  // const [char, setChar] = useState("");

  // const handleSearch = (event) => {
  //   setChar(event.target.value);
  //   filterRecipeHandler(event.target.value);
  // };

  const [query, setQuery] = useState("");

  //search for recipes whose title or ingredients include the query value
  const getFilterRecipes = (e) => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/recipes?search=${query}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setUpdatedRecipes(response.data);
      })
      .catch((error) => console.log(error));
  }

  const handleSearch = (event) => {
    setQuery(event.target.value);
    getFilterRecipes(event.target.value);
  };

  return (
    <div className="TitleSearch">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search .."
      />
    </div>
  );
}

export default TitleSearch;
