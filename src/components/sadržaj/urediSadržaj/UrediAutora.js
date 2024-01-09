import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuthContext } from "../../../hooks/useAuthContext";
import KnjigaService from "../../../services/KnjigaService";

import classes from "../dodajSadržaj/DodajSadržaj.module.css";

const UrediAutora = () => {
  const [autor, setAutor] = useState("");
  const [error, setError] = useState(null);

  const { id } = useParams();

  const { user } = useAuthContext();
  const { accessToken } = user;

  const navigate = useNavigate();

  const autorChangeHandler = (e) => {
    setAutor(e.target.value);
  };

  useEffect(() => {
    const dohvatiAutora = async () => {
      setError(null);
      try {
        const response = await KnjigaService.dohvatiAutora(id, accessToken);
        if (response.status !== 200) {
          if (!response.data) {
            return setError("Dogodila se pogreška!");
          }
          setError(response.data.message);
        } else {
          const data = response.data;
          setAutor(data.autor);
        }
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
    };
    dohvatiAutora(id);
  }, [id, accessToken]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await KnjigaService.urediAutora(id, autor, accessToken);
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
        <label>Promijeni autora:</label>
        <input
          type="text"
          value={autor}
          onChange={autorChangeHandler}
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

export default UrediAutora;
