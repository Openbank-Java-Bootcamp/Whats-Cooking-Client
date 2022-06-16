import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8081/api";

function NoteForm({ note, toggleEditMode, userId, recipeId }) {
  const [content, setContent] = useState("");

  const createNote = (e) => {
    e.preventDefault();

    const requestBody = { userId, recipeId, content };

    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${API_URL}/notes`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        toggleEditMode();
      })
      .catch((error) => console.log(error));
  };

  const editNote = (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");
    axios
      .patch(
        `${API_URL}/notes/${note.id}`,
        { content },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        toggleEditMode();
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
            maxLength="150"
            placeholder="max 150 characters"
            cols="25"
            rows="6"
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
        <div>
          <h2>Edit Note:</h2>
          <form onSubmit={createNote}>
            <div>
              <textarea
                type="text"
                name="content"
                value={content}
                maxLength="150"
                placeholder="max 150 characters"
                cols="25"
                rows="6"
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="note-buttons">
              <button className="small-fade-button" type="submit">
                Save
              </button>
              <button className="small-fade-button" onClick={toggleEditMode}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default NoteForm;
