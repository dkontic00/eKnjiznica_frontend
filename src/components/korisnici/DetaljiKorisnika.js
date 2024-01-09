import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import KnjigaService from "../../services/KnjigaService";
import { useAuthContext } from "../../hooks/useAuthContext";

import classes from "./DetaljiKorisnika.module.css";

const DetaljiKorisnika = () => {
  const [korisnik, setKorisnik] = useState({});
  const [knjige, setKnjige] = useState([""]);
  const [error, setError] = useState(null);

  const { user } = useAuthContext();
  const { accessToken } = user;

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const response = await KnjigaService.dohvatiDetaljeKorisnika(
          id,
          accessToken
        );
        if (response.status !== 200) {
          if (!response.data) {
            return setError("Dogodila se pogreška!");
          }
          setError(response.data.message);
        } else {
          setKorisnik(response.data.korisnik);
          setKnjige(response.data.knjige);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [id, accessToken]);

  console.log(korisnik);
  console.log(knjige);

  return (
    <div>
      <h4>Detalji korisnika:</h4>
      {error && <p className={classes.error}>{error}</p>}
      <div className={classes.detalji}>
        <div className={classes.podaciKorisnika}>
          <div>Korisnik: {korisnik.ime}</div>
          <div>Email: {korisnik.email}</div>
          <div>
            Datum učlanjenja{" "}
            {new Date(korisnik.datum_uclanjenja).toLocaleDateString()}
          </div>
        </div>
        <div className={classes.podaciKnjige}>
          {knjige && knjige.length === 0 ? (
            <p>Korisnik nije zaduživao knjige!</p>
          ) : (
            <table className={classes["tablica-knjige"]}>
              <thead>
                <tr className={classes["prvi-redak"]}>
                  <th>Knjiga</th>
                </tr>
                <tr className={classes["prvi-redak"]}>
                  <th>Naslov</th>
                  <th>Autor</th>
                  <th>Žanr</th>
                  <th>Zadužena datuma</th>
                  <th>Zadužena do</th>
                  <th>Vraćeno</th>
                </tr>
              </thead>
              <tbody>
                {knjige.map((knjiga, indx) => (
                  <tr key={indx} className={classes["redak-podaci"]}>
                    <td>{knjiga.naslov}</td>
                    <td>{knjiga.autor}</td>
                    <td>{knjiga.zanr}</td>
                    <td className={classes.datum}>
                      {new Date(knjiga.datum_zaduzenja).toLocaleDateString()}
                    </td>
                    <td className={classes.datum}>
                      {new Date(knjiga.datum_zaduzena_do).toLocaleDateString()}
                    </td>
                    <td className={classes.kolicina}>{knjiga.zaduzeno === true ? "NE" : "DA"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetaljiKorisnika;
