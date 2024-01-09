import React, { useState, useEffect, useRef } from "react";

import KnjigaService from "../../services/KnjigaService";
import { useAuthContext } from "../../hooks/useAuthContext";

import classes from "./Transakcije.module.css";

const NeplaceneTransakcije = () => {
  const [transakcije, setTransakcije] = useState([]);
  const [error, setError] = useState(null);

  const datumRef = useRef();
  const { user } = useAuthContext();
  const { accessToken } = user;

  const placanjeTransakcijeHandler = async (e, id, id_korisnika) => {
    e.preventDefault();
    setError(null);
    if (datumRef.current.value === "") {
      setError("Pogrešan unos datuma");
      return;
    }
    try {
      let datum_format = new Date(datumRef.current.value);
      let transakcija = transakcije.filter(
        (transakcija) => transakcija.id_transakcije === id
      );
      let datum_provjera = new Date(transakcija[0].datum_izdavanja);

      if (datum_format.getTime() < datum_provjera.getTime()) {
        setError("Pogrešan unos datuma");
        return;
      }

      const resPlaceno = await KnjigaService.placenaTransakcija(
        datum_format,
        id,
        id_korisnika,
        accessToken
      );
      if (resPlaceno.status !== 200) {
        if (!resPlaceno.data) {
          return setError("Dogodila se pogreška!");
        }
        setError(resPlaceno.data.message);
        return;
      }

      const response = await KnjigaService.dohvatiNeplaceneTransakcije(
        accessToken
      );
      if (response.status !== 200) {
        if (!response.data) {
          return setError("Dogodila se pogreška!");
        }
        setError(response.data.message);
      } else {
        const data = response.data;
        setTransakcije(data.transakcije);
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    const dohvanjePodataka = async () => {
      setError(null);
      try {
        const response = await KnjigaService.dohvatiNeplaceneTransakcije(
          accessToken
        );
        if (response.status !== 200) {
          if (!response.data) {
            return setError("Dogodila se pogreška!");
          }
          setError(response.data.message);
        } else {
          const data = response.data;
          setTransakcije(data.transakcije);
        }
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
    };
    dohvanjePodataka();
  }, [accessToken]);

  console.log(transakcije);

  return (
    <div className={classes.transakcije}>
      <h3>Lista aktivnih transakcija:</h3>
      {error && <p className={classes.error}>{error}</p>}
      {transakcije && !transakcije.length ? (
        <p>Lista transakcija je prazna!</p>
      ) : (
        <table className={classes["tablica-admin"]}>
          <thead>
            <tr className={classes["prvi-redak"]}>
              <th>Tip</th>
              <th>Korisnik</th>
              <th>Naslov</th>
              <th>Iznos</th>
              <th>Datum izdavanja</th>
              <th>Datum plaćanja</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {transakcije.map((transakcija) => (
              <tr
                key={transakcija.id_transakcije}
                className={classes["redak-podaci"]}
              >
                <td>{transakcija.tip_transakcije}</td>
                <td>{transakcija.korisnik}</td>
                <td>{transakcija.naslov ? transakcija.naslov : "" }</td>
                <td className={classes.iznos}>{transakcija.iznos}</td>
                <td className={classes.datum}>{`${new Date(
                  transakcija.datum_izdavanja
                ).toLocaleDateString()}`}</td>
                <td className={classes.datum}>
                  <input ref={datumRef} type="date" required />
                </td>
                <td>
                  <button
                    type="button"
                    className={classes["button-placeno"]}
                    onClick={(e) => {
                      placanjeTransakcijeHandler(
                        e,
                        transakcija.id_transakcije,
                        transakcija.id_korisnika
                      );
                    }}
                  >
                    Plaćeno
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default NeplaceneTransakcije;
