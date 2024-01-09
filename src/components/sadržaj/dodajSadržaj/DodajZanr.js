import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../../hooks/useAuthContext";
import KnjigaService from "../../../services/KnjigaService";

import classes from "./DodajSadržaj.module.css";

const DodajZanr = () => {
  const [zanr, setZanr] = useState("");
  const [error, setError] = useState(null);

  const { user } = useAuthContext();
  const { accessToken } = user;

  const navigate = useNavigate();

  const zanrChangeHandler = (e) => {
    setZanr(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await KnjigaService.dodajZanr(zanr, accessToken);
      if (response.status !== 200) {
        if(!response.data){
          return setError("Dogodila se pogreška!")
        }
        setError(response.data.message);
      } else {
        navigate("/zanrovi");
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  const returnHandler = async () => {
    navigate("/zanrovi");
  };

  return (
    <div>
      {error && <p className={classes.error}>{error}</p>}
      <div className={classes["dodavanje-sadrzaja"]}>
        <form onSubmit={submitHandler}>
          <label>Unesi žanr:</label>
          <input
            type="text"
            value={zanr}
            onChange={zanrChangeHandler}
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
    </div>
  );
};

export default DodajZanr;
