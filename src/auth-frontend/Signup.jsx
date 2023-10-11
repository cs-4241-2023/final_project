import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();
  const [userdata, setUserData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userdata),
      })
        .then((res) => {
          if (res.ok) {
            toast.success("Account created successfully");
            navigate("/login");
          } else {
            toast.error("Failed to create new account. Please try again later");
          }
        })
        .catch((err) => {
          toast.error("Failed to create new account. Please try again later");
        });
    } catch {
      console.log("error");
    }
  };
  return (
    <>
      <h1>Sign Up Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={userdata.username}
          onChange={(e) =>
            setUserData({ ...userdata, username: e.target.value })
          }
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={userdata.password}
          onChange={(e) =>
            setUserData({ ...userdata, password: e.target.value })
          }
        />
        <button type="submit">Submit</button>
        <br />
        <span>
          Already have an account? <Link to={"/login"}>Login</Link>
        </span>
        <ToastContainer />
      </form>
    </>
  );
}

export default Signup;
