import axios from "axios";

const API_URL = "http://localhost:8081/api";

function NoteCard({note, toggleEditMode, setNote}) {

  const deleteNote = (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");
    axios
      .delete(`${API_URL}/notes/${note.id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setNote(null);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="NoteCard">
      <div>
      <h2>My Notes:</h2>
      <p>{note.content}</p>
      </div>
      <div className="note-buttons">
        <button className="small-fade-button" onClick={toggleEditMode}>Edit</button>
        <button className="small-fade-button" onClick={deleteNote}>Delete</button>
      </div>
    </div>
  );
}

export default NoteCard;
