import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuthContext } from "../../../hooks/useAuthContext";
import KnjigaService from "../../../services/KnjigaService";

import classes from "../dodajSadržaj/DodajSadržaj.module.css";

const UrediNakladnika = () => {
  const [nakladnik, setNakladnika] = useState("");
  const [error, setError] = useState(null);

  const { id } = useParams();

  const { user } = useAuthContext();
  const { accessToken } = user;

  const navigate = useNavigate();

  const nakladnikChangeHandler = (e) => {
    setNakladnika(e.target.value);
  };

  useEffect(() => {
    const dohvatiNakladnika = async () => {
      setError(null);
      try {
        const response = await KnjigaService.dohvatiNakladnika(id, accessToken);
        if (response.status !== 200) {
          if (!response.data) {
            return setError("Dogodila se pogreška!");
          }
          setError(response.data.message);
        } else {
          const data = response.data;
          console.log(data);
          setNakladnika(data.nakladnik);
        }
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
    };
    dohvatiNakladnika(id);
  }, [id, accessToken]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await KnjigaService.urediNakladnika(
        id,
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
        <label>Promijeni nakladnika:</label>
        <input
          type="text"
          value={nakladnik}
          onChange={nakladnikChangeHandler}
          required
        />
        <button className={classes.dodaj} type="submit">
          Uredi
        </button>
        <button type="button" onClick={returnHandler}>
          Natrag
        </button>
      </form>
    </div>
  );
};

export default UrediNakladnika;
