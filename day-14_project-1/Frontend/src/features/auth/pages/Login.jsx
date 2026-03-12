import React, { useState } from "react";
import "../styles/form.scss";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin } = useAuth();
  const navigate = useNavigate()

  if(loading){
    return <h1>Loading...</h1>
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(username, password)
    .then(res=>{
      console.log(res);
      navigate('/')
      
    })
  }
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            onInput={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            name="username"
            placeholder="Enter username"
          />

          <input
            onInput={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            name="password"
            placeholder="Enter password"
          />
          <button>Login</button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link className="toggleAuthForm" to="/register">
            Register here
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
