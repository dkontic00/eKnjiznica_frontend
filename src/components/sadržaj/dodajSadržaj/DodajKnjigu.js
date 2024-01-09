import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../../hooks/useAuthContext";
import KnjigaService from "../../../services/KnjigaService";

import classes from "./DodajKnjigu.module.css";

const DodajKnjigu = () => {
  const [naslov, setNaslov] = useState("");
  const [autorData, setAutorData] = useState([""]);
  const [odabraniAutor, setOdabraniAutor] = useState("");
  const [zanrData, setZanrData] = useState([""]);
  const [odabraniZanr, setOdabraniZanr] = useState("");
  const [nakladnikData, setNakladnikData] = useState([""]);
  const [odabraniNakladnik, setOdabraniNakladnik] = useState("");
  const [error, setError] = useState(null);

  const { user } = useAuthContext();
  const { accessToken } = user;

  const kolicinaRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const resAutori = await KnjigaService.dohvatiAutore(accessToken);
        if (resAutori.status !== 200) {
          if (!resAutori.data) {
            return setError("Dogodila se pogreška!");
          }
          setError(resAutori.data.message);
          return;
        }

        const resNakladnici = await KnjigaService.dohvatiNakladnike(
          accessToken
        );
        if (resNakladnici.status !== 200) {
          if (!resNakladnici.data) {
            return setError("Dogodila se pogreška!");
          }
          setError(resNakladnici.data.message);
          return;
        }

        const resZanrovi = await KnjigaService.dohvatiZanrove(accessToken);
        if (resZanrovi.status !== 200) {
          if (!resZanrovi.data) {
            return setError("Dogodila se pogreška!");
          }
          setError(resZanrovi.data.message);
          return;
        }

        setAutorData(resAutori.data);
        setNakladnikData(resNakladnici.data);
        setZanrData(resZanrovi.data);

        setOdabraniAutor(resAutori.data[0].autor);
        setOdabraniNakladnik(resNakladnici.data[0].nakladnik);
        setOdabraniZanr(resZanrovi.data[0].zanr);
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
    };

    fetchData();
  }, [accessToken]);

  const autorChangeHandler = (e) => {
    setOdabraniAutor(e.target.value);
  };

  const nakladnikChangeHandler = (e) => {
    setOdabraniNakladnik(e.target.value);
  };

  const zanrChangeHandler = (e) => {
    setOdabraniZanr(e.target.value);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const autor = autorData.filter((item) => item.autor === odabraniAutor);
      const nakladnik = nakladnikData.filter(
        (item) => item.nakladnik === odabraniNakladnik
      );
      const zanr = zanrData.filter((item) => item.zanr === odabraniZanr);

      const response = await KnjigaService.dodajKnjigu(
        naslov,
        +autor[0].id_autora,
        +zanr[0].id_zanra,
        +nakladnik[0].id_nakladnika,
        +kolicinaRef.current.value,
        accessToken
      );
      if (response.status !== 200) {
        if (!response.data) {
          return setError("Dogodila se pogreška!");
        }
        setError(response.data.message);
      } else {
        navigate("/knjige");
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  return (
    <div className={classes["dodaj-knjigu"]}>
      {error && <p className={classes.error}>{error}</p>}
      <h4>Unesi novu knjigu:</h4>
      <form onSubmit={onSubmitForm}>
        <div>
          <label className={classes.label}>Naslov:</label>
          <input
            className={classes.input}
            type="text"
            name="naslov"
            value={naslov}
            onChange={(e) => setNaslov(e.target.value)}
          />
        </div>
        <div>
          <label className={classes.label}>Autor:</label>
          <select
            className={classes.select}
            value={odabraniAutor}
            onChange={autorChangeHandler}
          >
            {autorData.map((item, indx) => (
              <option key={indx}>{item.autor}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={classes.label}>Nakladnik:</label>
          <select
            className={classes.select}
            value={odabraniNakladnik}
            onChange={nakladnikChangeHandler}
          >
            {nakladnikData.map((item, indx) => (
              <option key={indx}>{item.nakladnik}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Žanr:</label>
          <select
            className={classes.select}
            value={odabraniZanr}
            onChange={zanrChangeHandler}
          >
            {zanrData.map((item, indx) => (
              <option key={indx}>{item.zanr}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={classes.label}>Količina:</label>
          <input
            className={classes.input}
            ref={kolicinaRef}
            type="number"
            min="0"
            max="10"
            step="1"
            defaultValue="1"
          />
        </div>
        <div>
          <button className={classes.dodaj} type="submit">
            Dodaj
          </button>
          <button
            type="button"
            onClick={() => {
              navigate("/listaKnjiga");
            }}
          >
            Natrag
          </button>
        </div>
      </form>
    </div>
  );
};

export default DodajKnjigu;
