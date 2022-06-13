import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

const API_URL = "http://localhost:8081/api";

function NoteCard({note, toggleEditMode, setNote}) {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const deleteNote = (e) => {
    e.preventDefault();

    const storedToken = localStorage.getItem("authToken");

    axios
      .delete(`${API_URL}/notes/${note.id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        //setContent("");
        setNote(null);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="NoteCard">
      <h2>My Notes:</h2>
      <p>{note.content}</p>
      <div>
        <button onClick={toggleEditMode}>Edit</button>
        <button onClick={deleteNote}>Delete</button>
      </div>
    </div>
  );
}

export default NoteCard;
