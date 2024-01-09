import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import KnjigaService from "../../services/KnjigaService";
import { useAuthContext } from "../../hooks/useAuthContext";

import classes from "./PregledSadržaja.module.css";

const Zanr = () => {
  const [zanrovi, setZanrovi] = useState([]);
  const [error, setError] = useState(null);

  const { user } = useAuthContext();
  const { accessToken } = user;

  const navigate = useNavigate();

  useEffect(() => {
    const fecthData = async () => {
      try {
        setError(null);
        const response = await KnjigaService.dohvatiZanrove(accessToken);
        if (response.status !== 200) {
          if (!response.data) {
            return setError("Dogodila se pogreška!");
          }
          setError(response.data.message);
        } else {
          const data = response.data;
          console.log(data);
          setZanrovi(data);
        }
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
    };
    fecthData();
  }, [accessToken]);

  const urediZanr = (id) => {
    navigate(`/zanrovi/${id}`);
  };

  const izbrisiZanr = async (id) => {
    try {
      setError(null);
      const deleteResponse = await KnjigaService.izbrisiZanr(id, accessToken);
      if (deleteResponse.status !== 200) {
        if (!deleteResponse.data) {
          return setError("Dogodila se pogreška!");
        }
        setError(deleteResponse.data.message);
        return;
      }
      const response = await KnjigaService.dohvatiZanrove(accessToken);
      if (response.status !== 200) {
        if (!response.data) {
          return setError("Dogodila se pogreška!");
        }
        setError(response.data.message);
      } else {
        const data = response.data;
        setZanrovi(data);
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  const dodajZanrHandler = () => {
    navigate("/dodajZanr");
  };

  return (
    <div>
      {error && <p className={classes.error}>{error}</p>}
      <div>
        <div>
          <button
            className={classes["dodavanje-button"]}
            onClick={dodajZanrHandler}
          >
            +
          </button>
        </div>
        <table className={classes.tablica}>
          <thead>
            <tr className={classes["prvi-redak"]}>
              <th>
                <h3>Žanrovi</h3>
              </th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {zanrovi.map((zanr, indx) => (
              <tr key={indx} className={classes["redak-podaci"]}>
                <td>{zanr.zanr}</td>
                <td className={classes["redak-button"]}>
                  <button
                    className={classes["sadrzaj-pregled-button"]}
                    onClick={() => {
                      urediZanr(zanr.id_zanra);
                    }}
                  >
                    Uredi
                  </button>
                </td>
                <td className={classes["redak-button"]}>
                  <button
                    className={classes["sadrzaj-pregled-button"]}
                    onClick={() => {
                      izbrisiZanr(zanr.id_zanra);
                    }}
                  >
                    Izbriši
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Zanr;
