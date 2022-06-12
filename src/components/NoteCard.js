import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function NoteCard({note}) {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div className="NoteCard">
      <h2>My Notes:</h2>
      <p>{note.content}</p>
      <div>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
}

export default NoteCard;
