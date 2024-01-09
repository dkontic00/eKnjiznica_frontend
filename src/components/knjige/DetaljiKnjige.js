import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import KnjigaService from "../../services/KnjigaService";
import { useAuthContext } from "../../hooks/useAuthContext";

import classes from "./DetaljiKnjige.module.css";

const DetaljiKnjige = () => {
  const [korisnici, setKorisnici] = useState([""]);
  const [knjiga, setKnjiga] = useState({});
  const [error, setError] = useState(null);

  const { user } = useAuthContext();
  const { accessToken } = user;

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await KnjigaService.dohvatiDetaljeKnjige(
          id,
          accessToken
        );
        if (response.status !== 200) {
          if (!response.data) {
            return setError("Dogodila se pogreška!");
          }
          setError(response.data.message);
        } else {
          console.log(response.data);
          setKnjiga(response.data.knjiga);
          setKorisnici(response.data.korisnici);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [id, accessToken]);

  console.log(knjiga);
  console.log(korisnici);

  return (
    <div>
      <h4>Detalji knjige</h4>
      {error && <p className={classes.error}>{error}</p>}
      <div className={classes["opis-knjige"]}>
        <div>Naslov: {knjiga.naslov}</div>
        <div>Autor: {knjiga.autor}</div>
        <div>Žanr: {knjiga.zanr}</div>
      </div>
      {korisnici && !korisnici.length ? (
        <p>Nitko nije zadužio knjigu!</p>
      ) : (
        <table className={classes["tablica-knjige"]}>
          <thead className={classes.head}>
            <tr className={classes["prvi-redak-naslov"]}>
              <th>Korisnik</th>
            </tr>
            <tr className={classes["prvi-redak"]}>
              <th>Ime</th>
              <th>Email</th>
              <th>Status</th>
              <th>Zadužena datuma</th>
              <th>Zadužena do</th>
              <th>Vraćeno</th>
            </tr>
          </thead>
          <tbody>
            {korisnici.map((korisnik, indx) => (
              <tr key={indx} className={classes["redak-podaci"]}>
                <td>{korisnik.ime}</td>
                <td>{korisnik.email}</td>
                <td>
                  {korisnik.aktivan_racun === true ? "Aktivan" : "Nije aktivan"}
                </td>
                <td className={classes.datum}>
                  {new Date(korisnik.datum_zaduzenja).toLocaleDateString()}
                </td>
                <td className={classes.datum}>
                  {new Date(korisnik.datum_zaduzena_do).toLocaleDateString()}
                </td>
                <td className={classes.kolicina}>
                  {korisnik.zaduzeno === true ? "NE" : "DA"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DetaljiKnjige;
