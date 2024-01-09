import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../../hooks/useAuthContext";
import KnjigaService from "../../../services/KnjigaService";

import classes from "./DodajSadržaj.module.css";

const DodajNakladnika = () => {
  const [nakladnik, setNakladnik] = useState("");
  const [error, setError] = useState(null);

  const { user } = useAuthContext();
  const { accessToken } = user;

  const navigate = useNavigate();

  const nakladnikChangeHandler = (e) => {
    setNakladnik(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await KnjigaService.dodajNakladnika(
        nakladnik,
        accessToken
      );
      if (response.status !== 200) {
        if (!response.data) {
          return setError("Dogodila se pogreška!");
        }
        return setError(response.data.message);
      }
      navigate("/nakladnici");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  const returnHandler = async () => {
    navigate("/nakladnici");
  };

  return (
    <div className={classes["dodavanje-sadrzaja"]}>
      {error && <p className={classes.error}>{error}</p>}
      <form onSubmit={submitHandler}>
        <label>Unesi nakladnika:</label>
        <input
          type="text"
          value={nakladnik}
          onChange={nakladnikChangeHandler}
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

export default DodajNakladnika;
