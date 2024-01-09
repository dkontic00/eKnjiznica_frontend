import React, { useEffect, useState } from "react";

import KnjigaService from "../../services/KnjigaService";
import { useAuthContext } from "../../hooks/useAuthContext";

import classes from "./Postavke.module.css";

const InformacijeKnjiznice = () => {
  const [id, setId] = useState(0);
  const [naziv, setNaziv] = useState("");
  const [adresa, setAdresa] = useState("");
  const [grad, setGrad] = useState("");
  const [postanskiBroj, setPostanskiBroj] = useState(0);
  const [email, setEmail] = useState("");
  const [kontaktBroj, setKontaktBroj] = useState("");
  const [iban, setIban] = useState("");
  const [error, setError] = useState(null);


  const { user } = useAuthContext();
  const { accessToken } = user;

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const response = await KnjigaService.dohvatiInformacijeKnjiznice(
          accessToken
        );
        if (response.status !== 200) {
          if (!response.data) {
            setError("Dogodila se pogreška!");
          }
          setError(response.data.message);
        } else {
          setId(response.data[0].id);
          setNaziv(response.data[0].naziv);
          setAdresa(response.data[0].adresa);
          setGrad(response.data[0].grad);
          setPostanskiBroj(response.data[0].postanski_broj);
          setEmail(response.data[0].email);
          setKontaktBroj(response.data[0].kontakt_broj);
          setIban(response.data[0].iban);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [accessToken]);

  const nazivChangeHandler = (e) => {
    setNaziv(e.target.value);
  };

  const adresaChangeHandler = (e) => {
    setAdresa(e.target.value);
  };

  const gradChangeHandler = (e) => {
    setGrad(e.target.value);
  };

  const postanskiBrChangeHandler = (e) => {
    setPostanskiBroj(e.target.value);
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const kontaktBrChangeHandler = (e) => {
    setKontaktBroj(e.target.value);
  };

  const ibanChangeHandler = (e) => {
    setIban(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (
        !naziv ||
        !email ||
        !adresa ||
        !grad ||
        !postanskiBroj ||
        !kontaktBroj ||
        !iban
      ) {
        return setError("Dogodila se pogreška pri unosu!");
      }
      const response = await KnjigaService.promijeniPostavkeKnjiznice(
        { id, naziv, adresa, grad, postanskiBroj, email, kontaktBroj, iban },
        accessToken
      );
      if (response.status !== 200) {
        if (!response.data) {
          return setError("Dogodila se pogreška!");
        }
        setError(response.data.message);
      } else {
        window.location.reload(false);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={classes.postavke}>
      <h3>Informacije knjižnice:</h3>
      {error && <p className={classes.error}>{error}</p>}
      <div className={classes.odjeljak}>
        <form onSubmit={submitHandler}>
          <div className={classes.knjiznica}>
            <div className={classes.div}>
              <label>Naziv:</label>
              <input
                type="text"
                value={naziv}
                className={classes.input}
                onChange={nazivChangeHandler}
                required
              />
            </div>
            <div className={classes.div}>
              <label>Adresa:</label>
              <input
                className={classes.input}
                type="text"
                value={adresa}
                onChange={adresaChangeHandler}
                required
              />
            </div>
            <div className={classes.div}>
              <label>Grad:</label>
              <input
                className={classes.input}
                type="text"
                value={grad}
                onChange={gradChangeHandler}
                required
              />
            </div>
            <div className={classes.div}>
              <label>Poštanski broj:</label>
              <input
                className={classes.input}
                type="number"
                min="1"
                max="100000"
                step="1"
                value={postanskiBroj}
                onChange={postanskiBrChangeHandler}
                required
              />
            </div>
            <div className={classes.div}>
              <label>E-mail adresa:</label>
              <input
                className={classes.input}
                type="email"
                value={email}
                onChange={emailChangeHandler}
                required
              />
            </div>
            <div className={classes.div}>
              <label>Kontakt-broj:</label>
              <input
                className={classes.input}
                type="text"
                value={kontaktBroj}
                onChange={kontaktBrChangeHandler}
                required
              />
            </div>
            <div className={classes.div}>
              <label>IBAN:</label>
              <input
                className={classes.input}
                type="text"
                value={iban}
                onChange={ibanChangeHandler}
                required
              />
            </div>
          </div>
          <div>
            <button type="submit">Spremi promjene</button>
          </div>
        </form>
        <div className={classes.desno}>
          <h4>Podaci:</h4>
          <label className={classes.label}>{naziv}</label>
          <label className={classes.label}>{adresa}</label>
          <label className={classes.label}>{`${grad}, ${postanskiBroj}`}</label>
          <label className={classes.label}>{email}</label>
          <label className={classes.label}>{kontaktBroj}</label>
          <label className={classes.label}>{iban}</label>
        </div>
      </div>
    </div>
  );
};

export default InformacijeKnjiznice;
