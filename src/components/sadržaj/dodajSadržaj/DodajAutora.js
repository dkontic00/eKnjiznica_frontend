import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../../hooks/useAuthContext";
import KnjigaService from "../../../services/KnjigaService";

import classes from "./DodajSadržaj.module.css";

const DodajAutora = () => {
  const [autor, setAutor] = useState("");
  const [error, setError] = useState(null);

  const { user } = useAuthContext();
  const { accessToken } = user;

  const navigate = useNavigate();

  const autorChangeHandler = (e) => {
    setAutor(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await KnjigaService.dodajAutora(autor, accessToken);
      if (response.status !== 200) {
        if (!response.data) {
          return setError("Dogodila se pogreška!");
        }
        return setError(response.data.message);
      }
      navigate("/autori");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  const returnHandler = async () => {
    navigate("/autori");
  };

  return (
    <div className={classes["dodavanje-sadrzaja"]}>
      {error && <p className={classes.error}>{error}</p>}
      <form onSubmit={submitHandler}>
        <label>Unesi novog autora:</label>
        <input
          type="text"
          value={autor}
          onChange={autorChangeHandler}
          required
        />
        <button className={classes.dodaj} type="submit">
          Dodaj
        </button>
        <button type="button" onClick={returnHandler}>
          Natrag
        </button>
      </form>
    </div>
  );
};

export default DodajAutora;
