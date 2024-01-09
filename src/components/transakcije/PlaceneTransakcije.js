import React, { useState, useEffect } from "react";

import KnjigaService from "../../services/KnjigaService";
import { useAuthContext } from "../../hooks/useAuthContext";

import classes from "./Transakcije.module.css";

const PlaceneTransakcije = () => {
  const [transakcije, setTransakcije] = useState([]);
  const [error, setError] = useState(null);

  const { user } = useAuthContext();
  const { accessToken } = user;

  useEffect(() => {
    const dohvanjePodataka = async () => {
      setError(null);
      try {
        const response = await KnjigaService.dohvatiPlaceneTransakcije(
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
      <h3>Lista plaćenih transakcija:</h3>
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
              <th>Datum izdano</th>
              <th>Datum plaćeno</th>
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
                <td className={classes.iznos}>{transakcija.iznos}€</td>
                <td className={classes.datum}>
                  {new Date(transakcija.datum_izdavanja).toLocaleDateString()}
                </td>
                <td className={classes.datum}>
                  {new Date(transakcija.datum_placeno).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PlaceneTransakcije;
