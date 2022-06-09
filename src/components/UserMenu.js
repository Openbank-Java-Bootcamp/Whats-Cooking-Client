import { Link } from "react-router-dom";

function UserMenu({ user }) {

    const id = user.id;

  return (
    <Link to={`/cookbooks/${id}`}>
      <button>My Cookbook</button>
    </Link>
  );
}

export default UserMenu;
