import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRegister } from "../../hooks/useRegister";

import classes from "./login.module.css";

const Register = () => {
  const [ime, setIme] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, isLoading, error } = useRegister();

  const navigate = useNavigate();

  const imeChangeHandler = (e) => {
    setIme(e.target.value);
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const lozinkaChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const returnButtonHandler = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await register(ime, email, password);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={classes.login}>
      <form onSubmit={submitHandler}>
        <h3 className={classes.header}>Registracija</h3>
        <div>
          <input
            placeholder="Ime.."
            type="text"
            value={ime}
            onChange={imeChangeHandler}
          />
        </div>
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
            onChange={lozinkaChangeHandler}
          />
        </div>
        <div className={classes.button}>
          <button
            className={classes["submit-button"]}
            type="submit"
            disabled={isLoading}
          >
            Registriraj se
          </button>
          <button
            className={classes["cancel-button"]}
            type="button"
            onClick={returnButtonHandler}
          >
            Natrag
          </button>
        </div>
        {error && (
          <div>
            <p className={classes.error}>{error}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default Register;
