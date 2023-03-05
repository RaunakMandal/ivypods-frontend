import React, { useState } from "react";
import Base from "../base/Base.component";
import "../../styles/auth/login.style.css";
import { AuthService } from "../../services/auth.service";
import Alert from "../shared/Alert";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState({
    username: "",
    valid: false,
  });
  const [user, setUser] = useState({ username: "", password: "" });

  const [error, setError] = useState({
    message: "",
    show: false,
  });

  const [btn, setBtn] = useState({
    text: "Validate Username",
    disabled: false,
  });

  const handleUserNameChange = (e: any) => {
    e.preventDefault();
    e.target.value = e.target.value.trim();
    setUsername({ ...username, username: e.target.value });
  };

  const handlePasswordChange = (e: any) => {
    e.preventDefault();
    setUser({ ...user, password: e.target.value });
  };

  const checkUserName = async () => {
    setBtn({ ...btn, text: "Validating...", disabled: true });
    username.username &&
      (await AuthService.user_exists({ body: { username: username.username } })
        .then((res: any) => {
          const message = res.message as string;
          if (message.includes("already exists")) {
            setUser({ ...user, username: username.username });
            setUsername({ ...username, valid: true });
            setBtn({ ...btn, text: "Login", disabled: false });
            setError({ message: res.message, show: false });
          } else {
            setError({ message: res.message, show: true });
            setUsername({ ...username, valid: false });
            setBtn({ ...btn, text: "Validate Username", disabled: false });
          }
        })
        .catch((err: any) => {
          console.log(err);
        }));
  };

  const handleLogin = async () => {
    setBtn({ ...btn, text: "Logging you in...", disabled: true });
    user.username &&
      user.password &&
      (await AuthService.signin({ body: user })
        .then((res: any) => {
          if (res.token) {
            setError({ ...error, show: false });
            localStorage.setItem("token", res.token);
            localStorage.setItem("user", JSON.stringify(res.user));
            return window.location.replace("/");
          } else {
            setError({ message: res.message, show: true });
            setBtn({ ...btn, text: "Login", disabled: false });
          }
        })
        .catch((err: any) => {
          console.log(err);
        }));
  };

  return (
    <Base style={"center"}>
      <div className="login-container w-60 d-flex flex-column justify-content-center align-items-center p-5">
        <h3 className="login-title">Login</h3>
        {error && (
          <Alert type="danger" message={error.message} show={error.show} />
        )}
        <input
          type="text"
          className="form-control mb-3"
          disabled={username.valid}
          placeholder="Enter username..."
          onChange={(e) => handleUserNameChange(e)}
        />
        {username.valid && (
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Enter password..."
            onChange={(e) => handlePasswordChange(e)}
          />
        )}
        <button
          className="btn btn-outline-primary"
          type="button"
          disabled={btn.disabled}
          onClick={username.valid ? handleLogin : checkUserName}
        >
          <span
            className="spinner-border spinner-border-sm me-2"
            hidden={!btn.disabled}
          ></span>
          {btn.text}{" "}
        </button>
        <Link to="/signup">Sign-up Instead?</Link>
      </div>
    </Base>
  );
};

export default Login;
