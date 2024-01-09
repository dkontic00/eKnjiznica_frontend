import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuthContext } from "../../../hooks/useAuthContext";
import KnjigaService from "../../../services/KnjigaService";

import classes from "../dodajSadržaj/DodajSadržaj.module.css";

const UrediZanr = () => {
  const [zanr, setZanr] = useState("");
  const [error, setError] = useState(null);

  const { id } = useParams();

  const { user } = useAuthContext();
  const { accessToken } = user;

  const navigate = useNavigate();

  const zanrChangeHandler = (e) => {
    setZanr(e.target.value);
  };

  useEffect(() => {
    const dohvatiZanr = async () => {
      try {
        const response = await KnjigaService.dohvatiZanr(id, accessToken);
        if (response.status !== 200) {
          if (!response.data) {
            return setError("Dogodila se pogreška!");
          }
          setError(response.data.message);
        } else {
          const data = response.data;
          setZanr(data.zanr);
        }
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
    };
    dohvatiZanr(id);
  }, [id, accessToken]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await KnjigaService.urediZanr(id, zanr, accessToken);
      if (response.status !== 200) {
        if (!response.data) {
          return setError("Dogodila se pogreška!");
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
    <div className={classes["dodavanje-sadrzaja"]}>
      {error && <p className={classes.error}>{error}</p>}
      <form onSubmit={submitHandler}>
        <label>Promijeni žanr:</label>
        <input type="text" value={zanr} onChange={zanrChangeHandler} required />
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

export default UrediZanr;
