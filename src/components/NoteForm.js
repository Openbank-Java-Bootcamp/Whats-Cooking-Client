import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8081/api";

function NoteForm({ note, toggleEditMode, userId, recipeId }) {
    const [content, setContent] = useState("");
  
    const createNote = (e) => {
      e.preventDefault();
  
      const requestBody = {userId, recipeId, content};
      console.log(requestBody);
  
      const storedToken = localStorage.getItem("authToken");
  
      axios
        .post(`${API_URL}/notes`, requestBody, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          //setContent("");
          toggleEditMode();
        })
        .catch((error) => console.log(error));
    };

  const editNote = (e) => {
    e.preventDefault();

    const requestParam = content;
    console.log(requestParam);

    const storedToken = localStorage.getItem("authToken");

    axios
      .patch(`${API_URL}/notes/${note.id}`, requestParam, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        //setContent("");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    {
      note && setContent(note.content);
    }
  }, []);

  if (note) {
    return (
      <div className="EditNote">
        <h2>Edit Note:</h2>
        <form onSubmit={editNote}>
          <textarea
            type="text"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div>
            <button type="submit">Save</button>
            <button onClick={toggleEditMode}>Cancel</button>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div className="EditNote">
        <h2>Edit Note:</h2>
        <form onSubmit={createNote}>
          <textarea
            type="text"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div>
            <button type="submit">Save</button>
            <button onClick={toggleEditMode}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}

export default NoteForm;
