import React, { useState, useEffect } from "react";

import { useAuthContext } from "../../hooks/useAuthContext";
import KnjigaService from "../../services/KnjigaService";

import classes from "./SvePosudeneKnjige.module.css";

const SvePosudeneKnjige = () => {
  const [posudeneKnjige, setPosudeneKnjige] = useState([""]);
  const [error, setError] = useState(null);

  const { user } = useAuthContext();

  const { accessToken } = user;

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const response = await KnjigaService.dohvatiSvePosudeneKnjige(
          accessToken
        );
        if (response.status !== 200) {
          if (!response.data) {
            return setError("Dogodila se pogreška!");
          }
          setError(response.data.message);
        } else {
          const data = response.data;

          data.map((knjiga) => {
            let date = new Date(knjiga.datum_zaduzenja);
            return (knjiga.datum_zaduzenja = date.toLocaleDateString());
          });

          data.map((knjiga) => {
            console.log();
            let date = new Date(knjiga.datum_zaduzena_do);
            return (knjiga.datum_zaduzena_do = date.toLocaleDateString());
          });

          setPosudeneKnjige(data);
        }
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
    };

    fetchData();
  }, [accessToken]);

  const vracanjeKnjigeHandler = async (id_knjige, id_korisnika) => {
    setError(null);
    try {
      const resVracanjeKnjige = await KnjigaService.vratiKnjigu(
        id_knjige,
        id_korisnika,
        accessToken
      );
      if (resVracanjeKnjige.status !== 200) {
        if (!resVracanjeKnjige.data) {
          return setError("Dogodila se pogreška!");
        }
        return setError(resVracanjeKnjige.data.message);
      }

      const response = await KnjigaService.dohvatiSvePosudeneKnjige(
        accessToken
      );
      if (response.status !== 200) {
        if (!response.data) {
          return setError("Dogodila se pogreška!");
        }
        setError(response.data.message);
      } else {
        const data = response.data;

        data.map((knjiga) => {
          let date = new Date(knjiga.datum_zaduzenja);
          return (knjiga.datum_zaduzenja = date.toLocaleDateString());
        });

        data.map((knjiga) => {
          console.log();
          let date = new Date(knjiga.datum_zaduzena_do);
          return (knjiga.datum_zaduzena_do = date.toLocaleDateString());
        });

        setPosudeneKnjige(data);
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  return (
    <div>
      <h3>Lista trenutno zaduženih knjiga:</h3>
      {error && <p className={classes.error}>{error}</p>}
      {posudeneKnjige.length === 0 && <p>Nema posuđenih knjiga</p>}
      {posudeneKnjige.length > 0 && (
        <table className={classes.tablica}>
          <thead>
            <tr className={classes["prvi-redak"]}>
              <th>Naslov</th>
              <th>Korisnik</th>
              <th>Zadužena datuma</th>
              <th>Zadužena do</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {posudeneKnjige.map((knjiga, indx) => (
              <tr key={indx} className={classes["redak-podaci"]}>
                <td>{knjiga.naslov}</td>
                <td>{knjiga.email}</td>
                <td className={classes.datumi}>{knjiga.datum_zaduzenja}</td>
                <td className={classes.datumi}>{knjiga.datum_zaduzena_do}</td>
                <td className={classes["button-vracene"]}>
                  <button
                    onClick={() => {
                      vracanjeKnjigeHandler(
                        knjiga.id_knjige,
                        knjiga.id_korisnika
                      );
                    }}
                  >
                    Knjiga je vraćena
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

export default SvePosudeneKnjige;
