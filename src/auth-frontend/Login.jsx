import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./Login.css"

function Login() {
  const navigate = useNavigate();
  const [userdata, setUserData] = useState({
    username: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userdata),
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Login successful");
          navigate("/");
        } else {
          toast.error("Login failed. The username or password is incorrect");
        }
      })
      .catch((err) => {
        toast.error(
          "Login failed. The username or password could not be verified"
        );
        console.log("login error: ", err);
      });
  };
  return (
    <>
      <h1>Login Page</h1>
      <form class="auth-form" onSubmit={handleSubmit}>
        <div className="auth-form-row">
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            value={userdata.username}
            onChange={(e) =>
              setUserData({ ...userdata, username: e.target.value })
            }
          />
        </div>
        <div className="auth-form-row">
        <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            value={userdata.password}
            onChange={(e) =>
              setUserData({ ...userdata, password: e.target.value })
            }
          />
        </div>
        <button style={inputButtonStyle} type="submit">Log in</button>
        <br />
        <span>
          Don't have an account? <Link to={"/signup"}>Sign up</Link>
        </span>
      </form>
      <ToastContainer />
    </>
  );
}

const inputButtonStyle = {
  backgroundColor: '#ac2b37',
  color: 'white',
  padding: '10px',
  margin: '5px',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '10px',
}

export default Login;
