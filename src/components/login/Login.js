import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

import classes from "./login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();

  const navigate = useNavigate();

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const returnButtonHandler = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const registerButtonHandler = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={classes.login}>
      <form onSubmit={submitHandler}>
        <h3 className={classes.header}>Prijava</h3>
        <div>
          <input
            placeholder="Email.."
            type="email"
            value={email}
            onChange={emailChangeHandler}
          />
        </div>
        <div>
          <input
            placeholder="Password.."
            type="password"
            value={password}
            onChange={passwordChangeHandler}
          />
        </div>
        <div className={classes.button}>
          <button
            className={classes["submit-button"]}
            type="submit"
            disabled={isLoading}
          >
            Prijavi se
          </button>
          <button
            className={classes["cancel-button"]}
            type="button"
            onClick={returnButtonHandler}
          >
            Natrag
          </button>
        </div>
        <div className={classes.redirect}>
          <h4>Ukoliko niste registrirani</h4>
          <button type="button" onClick={registerButtonHandler}>
            Registriraj se
          </button>
        </div>
        {error && (
          <div className={classes.error}>
            <h5>{error}</h5>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
