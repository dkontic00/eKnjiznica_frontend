import React, { useState, useEffect } from "react";

import KnjigaService from "../../services/KnjigaService";
import { useAuthContext } from "../../hooks/useAuthContext";

import classes from "./Postavke.module.css";

const Postavke = () => {
  const [postavkeKnjiga, setPostavkeKnjiga] = useState([""]);
  const [postavkeTransakcija, setPostavkeTransakcija] = useState([""]);
  const [rokPosudbe, setRokPosudbe] = useState(0);
  const [iznosClanarine, setIznosClanarine] = useState(0);
  const [iznosZakasnine, setIznosZakasnine] = useState(0);
  const [error, setError] = useState(null);

  const { user } = useAuthContext();
  const { accessToken } = user;

  useEffect(() => {
    const dohvatiPostavke = async () => {
      setError(null);
      try {
        const response = await KnjigaService.dohvatiPostavke(accessToken);
        if (response.status !== 200) {
          if (!response.data) {
            return setError("Dogodila se pogreška!");
          }
          setError(response.data.message);
        } else {
          const data = response.data;
          setPostavkeKnjiga(data.postavke);
          data.transakcije.forEach((el) => {
            if (el.tip_transakcije_opis === "Zakasnina") {
              setIznosZakasnine(el.iznos);
            }
            if (el.tip_transakcije_opis === "Članarina") {
              setIznosClanarine(el.iznos);
            }
          });

          setPostavkeTransakcija(data.transakcije);
          setRokPosudbe(data.postavke[0].vrijednost);
        }
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
    };
    dohvatiPostavke();
  }, [accessToken]);

  const promjenaRokaPosudbeHandler = async (e) => {
    setRokPosudbe(e.target.value);
  };
  const promjenaClanarineHandler = async (e) => {
    setIznosClanarine(e.target.value);
  };
  const promjenaZakasnineHandler = async (e) => {
    setIznosZakasnine(e.target.value);
  };

  const pohraniPromjeneHandler = async () => {
    setError(null);
    try {
      const resPostavke = await KnjigaService.promijeniPostavke(
        { rokPosudbe, iznosClanarine, iznosZakasnine },
        accessToken
      );
      if (resPostavke.status !== 200) {
        if (!resPostavke.data) {
          return setError("Dogodila se pogreška!");
        }
        return setError(resPostavke.data.message);
      }

      const response = await KnjigaService.dohvatiPostavke(accessToken);
      if (response.status !== 200) {
        if (!response.data) {
          return setError("Dogodila se pogreška!");
        }
        setError(response.data.message);
      } else {
        const data = response.data;
        setPostavkeKnjiga(data.postavke);
        data.transakcije.forEach((el) => {
          if (el.tip_transakcije_opis === "Zakasnina") {
            setIznosZakasnine(el.iznos);
          }
          if (el.tip_transakcije_opis === "Članarina") {
            setIznosClanarine(el.iznos);
          }
        });

        setPostavkeTransakcija(data.transakcije);
        setRokPosudbe(data.postavke[0].vrijednost);
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  return (
    <div className={classes.postavke}>
      <h3>Postavke</h3>
      {error && <p className={classes.error}>{error}</p>}
      <div className={classes.knjige}>
        <h4>Postavke knjiga:</h4>
        {postavkeKnjiga.map((item, indx) => (
          <div key={indx}>
            <label
              key={indx}
            >{`${item.opis} iznosi: ${item.vrijednost} dana`}</label>
          </div>
        ))}
        <div>
          <h5>Za promjenu roka posudbe, unesite broj dana:</h5>
          <input
            type="number"
            value={rokPosudbe}
            onChange={promjenaRokaPosudbeHandler}
            required
            min="15"
            max="32"
            step="1"
          />
        </div>
      </div>
      <div className={classes.cijena}>
        <h4>Postavke cijena:</h4>
        <div className={classes.cjenik}>
          <h5>Cjenik:</h5>
          {postavkeTransakcija.map((item, indx) => (
            <div key={indx}>
              <label
                key={indx}
              >{`${item.tip_transakcije_opis} iznosi: ${item.iznos}€`}</label>
            </div>
          ))}
        </div>
        <div>
          <h5>Za promjenu zakasnine unesite (€):</h5>
          <input
            type="number"
            value={iznosZakasnine}
            onChange={promjenaZakasnineHandler}
            required
            min="0.1"
            max="0.9"
            step="0.1"
          />
          <h5>Za promjenu članarine unesite (€): </h5>
          <input
            type="number"
            value={iznosClanarine}
            onChange={promjenaClanarineHandler}
            required
            min="6"
            max="13"
            step="0.1"
          />
        </div>
      </div>
      <div>
        <button onClick={pohraniPromjeneHandler}>Spremi promjene</button>
      </div>
    </div>
  );
};

export default Postavke;
