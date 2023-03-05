import React, { useState } from "react";
import Base from "../base/Base.component";
import Alert from "../shared/Alert";
import "../../styles/auth/signup.style.css";
import { AuthService } from "../../services/auth.service";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState({
    message: "",
    show: false,
    type: "danger",
  });

  const [user, setUser] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  const handleFormChange = (e: any) => {
    e.preventDefault();
    if (e.target.name === "username") {
      e.target.value = e.target.value.trim();
    }
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateUsername = async () => {
    setError({ message: "", show: false, type: "danger" });
    user.username &&
      (await AuthService.user_exists({ body: { username: user.username } })
        .then((res: any) => {
          const message = res.message as string;
          if (message.includes("already exists")) {
            setError({ message: res.message, show: true, type: "danger" });
          } else {
            setError({ message: res.message, show: true, type: "success" });
          }
        })
        .catch((err: any) => {
          console.log(err);
        }));
  };

  const restoreError = () => {
    setError({ message: "", show: false, type: "danger" });
  };

  const handleSignup = async () => {
    !error.show &&
      user.username &&
      user.password &&
      (await AuthService.signup({ body: user })
        .then((res: any) => {
          if (res.message.includes("created")) {
            setError({
              message: res.message + ". Redirecting...",
              show: true,
              type: "success",
            });
            setUser({
              fullname: "",
              username: "",
              email: "",
              password: "",
            });
            setTimeout(() => navigate("/login"), 2000);
          } else {
            setError({ message: res.message, show: true, type: "danger" });
          }
        })
        .catch((err: any) => {
          console.log(err);
        }));
  };

  return (
    <Base style={"center"}>
      <div className="login-container signup w-60 d-flex flex-column justify-content-center align-items-center p-5">
        <h3 className="login-title">Signup</h3>
        {error && (
          <Alert type={error.type} message={error.message} show={error.show} />
        )}
        <input
          type="text"
          name="fullname"
          className="form-control mb-3"
          placeholder="Enter your Full Name..."
          onChange={(e) => handleFormChange(e)}
          onBlur={restoreError}
        />
        <div className="username-container d-flex mb-3 w-100 align-items-center">
          <input
            type="text"
            name="username"
            className="form-control m-0"
            placeholder="Enter your username..."
            onChange={(e) => handleFormChange(e)}
            onBlur={validateUsername}
          />
          <span
            className="badge bg-danger rounded-pill validate-pill ms-2 p-1"
            onClick={validateUsername}
          >
            Validate
          </span>
        </div>
        <input
          type="email"
          name="email"
          className="form-control mb-3"
          placeholder="Enter Email..."
          onChange={(e) => handleFormChange(e)}
          onBlur={restoreError}
        />
        <input
          name="password"
          type="password"
          className="form-control mb-3"
          placeholder="Enter Password..."
          onChange={(e) => handleFormChange(e)}
          onBlur={restoreError}
        />
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={handleSignup}
        >
          Signup
        </button>
        <Link to={"/login"}>
          <button type="button" className="btn btn-link">
            Log in
          </button>
        </Link>
      </div>
    </Base>
  );
};

export default Signup;
