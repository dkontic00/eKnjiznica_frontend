import React, { useState, useEffect } from "react";

import KnjigaService from "../../services/KnjigaService";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";

import classes from "./PregledProfila.module.css";

const PregledajProfil = () => {
  const [ime, setIme] = useState("");
  const [newName, setNewName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [datumUclanjenja, setDatumUclanjenja] = useState();

  const { user } = useAuthContext();
  const { accessToken, id } = user;

  const { logout } = useLogout();

  useEffect(() => {
    const dohvatiPodatke = async () => {
      setError(null);
      try {
        const response = await KnjigaService.dohvatiKorisnika(id, accessToken);
        if (response.status !== 200) {
          if (!response.data) {
            return setError("Dogodila se pogreška!");
          }
          setError(response.data.message);
        } else {
          const data = response.data;
          setIme(data.ime);
          setEmail(data.email);
          setDatumUclanjenja(data.datum_uclanjenja);
        }
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
    };

    dohvatiPodatke();
  }, [id, accessToken]);

  const newNameChangeHandler = (e) => {
    setError(null);
    setNewName(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setError(null);
    setPassword(e.target.value);
  };
  const repeatePasswordChangeHandler = (e) => {
    setError(null);
    setPasswordRepeat(e.target.value);
  };

  const submitPassword = async (e) => {
    e.preventDefault();
    setError(null);
    if (password.length === 0 || passwordRepeat.length === 0) {
      setError("Pogrešan unos!!");
      return;
    }
    if (password !== passwordRepeat) {
      setError("Pogrešan unos!!");
      return;
    }
    console.log(password, passwordRepeat);
    try {
      const resPromjenaLozinke = await KnjigaService.promjeniLozinku(
        id,
        password,
        accessToken
      );
      if (resPromjenaLozinke.status !== 200) {
        if (!resPromjenaLozinke.data) {
          return setError("Dogodila se pogreška!");
        }
        return setError(resPromjenaLozinke.data.message);
      }

      logout();
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  const submitName = async (e) => {
    e.preventDefault();
    setError(null);
    if (newName.length === 0) {
      return setError("Pogrešan unos!!!");
    }
    console.log(newName);
    try {
      const resPromjenaImena = await KnjigaService.promjeniIme(
        id,
        newName,
        accessToken
      );
      if (resPromjenaImena.status !== 200) {
        if (!resPromjenaImena.data) {
          return setError("Dogodila se pogreška!");
        }
        return setError(resPromjenaImena.data.message);
      }

      const response = await KnjigaService.dohvatiKorisnika(id, accessToken);
      if (response.status !== 200) {
        if (!response.data) {
          return setError("Dogodila se pogreška!");
        }
        setError(response.data.message);
      } else {
        const data = response.data;
        setIme(data.ime);
        setEmail(data.email);
        setDatumUclanjenja(data.datum_uclanjenja);
        setNewName("");
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  return (
    <div className={classes.profil}>
      <h3>Podaci profila:</h3>
      <label>Ime: {ime}</label>
      <label>Email: {email}</label>
      <label>
        Datum učlanjenja: {new Date(datumUclanjenja).toLocaleDateString()}
      </label>
      <div className={classes.name}>
        <form onSubmit={submitName}>
          <label>Za promjenu imena, unesite novo ime:</label>
          <input
            type="text"
            value={newName}
            onChange={newNameChangeHandler}
            required
          />
          <button className={classes.button} type="submit">
            Promijeni ime
          </button>
        </form>
      </div>
      <div className={classes.password}>
        <form onSubmit={submitPassword}>
          <label>Za promjenu lozinke profila, unesite novu lozinku:</label>
          <input
            type="password"
            value={password}
            onChange={passwordChangeHandler}
            required
          />
          <label>Ponovite unos:</label>
          <input
            type="password"
            value={passwordRepeat}
            onChange={repeatePasswordChangeHandler}
            required
          />
          <button className={classes.button} type="submit">
            Promijeni lozinku
          </button>
          {error && <p className={classes.error}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default PregledajProfil;
