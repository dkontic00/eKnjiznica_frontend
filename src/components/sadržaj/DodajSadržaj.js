import React from "react";
import { useNavigate } from "react-router-dom";

import classes from "./DodajSadržaj.module.css";

const DodajSadržaj = () => {
  const navigate = useNavigate();

  const pregledajAutoreHandler = () => {
    navigate("/autori");
  };

  const pregledajNakladnikeHandler = () => {
    navigate("/nakladnici");
  };

  const pregledajZanroveHandler = () => {
    navigate("/zanrovi");
  };

  const pregledajKnjigeHandler = () => {
    navigate("/listaKnjiga");
  };

  return (
    <div className={classes.sadrzaj}>
      <div>
        <h4>Pregledaj dodani sadržaj:</h4>
        <button onClick={pregledajKnjigeHandler}>Pregledaj knjige</button>
        <button onClick={pregledajAutoreHandler}>Pregledaj autore</button>
        <button onClick={pregledajNakladnikeHandler}>
          Pregledaj nakladnike
        </button>
        <button onClick={pregledajZanroveHandler}>Pregledaj žanrove</button>
      </div>
    </div>
  );
};

export default DodajSadržaj;
