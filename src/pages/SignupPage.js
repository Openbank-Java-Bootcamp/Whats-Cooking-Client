import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:8081/api";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.errors[0].defaultMessage;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="SignupPage">
      <form className="signup-form" onSubmit={handleSignupSubmit}>
        <div>
          <label>Email:</label>
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
          />

          <label>Password:</label>
          <input
            required
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />

          <label>Name:</label>
          <input
            required
            type="text"
            name="name"
            value={name}
            onChange={handleName}
          />

          <Link to={"/"}>
            <button className="fade-button">Cancel</button>
          </Link>
          <button className="fade-button" type="submit">
            Sign Up
          </button>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <p>Already have account?</p>
          <Link class="navbar-login-link" to={"/login"}> Login</Link>
        </div>
      </form>
    </div>
  );
}

export default SignupPage;
