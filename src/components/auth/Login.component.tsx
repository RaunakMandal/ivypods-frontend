import React, { useState } from "react";
import Base from "../base/Base.component";
import "../../styles/auth/login.style.css";
import { AuthService } from "../../services/auth.service";
import Alert from "../shared/Alert";

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
    text: "Validate",
    disabled: false,
  });

  const handleUserNameChange = (e: any) => {
    e.preventDefault();
    setUsername({ ...username, username: e.target.value });
  };

  const handlePasswordChange = (e: any) => {
    e.preventDefault();
    setUser({ ...user, password: e.target.value });
  };

  const checkUserName = async () => {
    await AuthService.user_exists({body: {username: username.username }})
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
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const handleLogin = async () => {
    await AuthService.signin({body: user}).then((res: any) => {
      if (res.token) {
        setError({ ...error, show: false });
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        return window.location.replace("/");
      } else {
        setError({ message: res.message, show: true });
      }
    }
    ).catch((err: any) => {
      console.log(err);
    }
    );
  };

  return (
    <Base>
      <div className="login-container">
        <h3 className="login-title">Login</h3>
        {error && (
          <Alert type="danger" message={error.message} show={error.show} />
        )}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            disabled={username.valid}
            placeholder="Enter username..."
            onChange={(e) => handleUserNameChange(e)}
          />
        </div>
        {username.valid && (
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter password..."
              onChange={(e) => handlePasswordChange(e)}
            />
          </div>
        )}
        <button
          type="button"
          className="btn btn-outline-primary"
          disabled={btn.disabled}
          onClick={username.valid ? handleLogin : checkUserName}
        >
          {btn.text}
        </button>
      </div>
    </Base>
  );
};

export default Login;
