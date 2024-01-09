import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import KnjigaService from "../../services/KnjigaService";
import { useAuthContext } from "../../hooks/useAuthContext";

import classes from "./PregledSadržaja.module.css";

const Nakladnik = () => {
  const [nakladnici, setNakladnici] = useState([]);
  const [error, setError] = useState(null);

  const { user } = useAuthContext();
  const { accessToken } = user;

  const navigate = useNavigate();

  useEffect(() => {
    const fecthData = async () => {
      setError(null);
      try {
        const response = await KnjigaService.dohvatiNakladnike(accessToken);
        if (response.status !== 200) {
          if (!response.data) {
            return setError("Dogodila se pogreška!");
          }
          setError(response.data.message);
        } else {
          const data = response.data;
          console.log(data);
          setNakladnici(data);
        }
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
    };
    fecthData();
  }, [accessToken]);

  const urediNakladnika = (id) => {
    navigate(`/nakladnici/${id}`);
  };

  const izbrisiNakladnika = async (id) => {
    setError(null);
    try {
      const resBrisanje = await KnjigaService.izbrisiNakladnika(
        id,
        accessToken
      );
      console.log(resBrisanje);
      if (resBrisanje.status !== 200) {
        if (!resBrisanje.data) {
          return setError("Dogodila se pogreška!");
        }
        setError(resBrisanje.data.message);
        return;
      }
      const response = await KnjigaService.dohvatiNakladnike(accessToken);
      if (response.status !== 200) {
        if (!response.data) {
          return setError("Dogodila se pogreška!");
        }
        setError(response.data.message);
      } else {
        const data = response.data;
        setNakladnici(data);
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  const dodajNakladnikaHandler = () => {
    navigate("/dodajNakladnika");
  };

  return (
    <div>
      {error && <p className={classes.error}>{error}</p>}
      <div>
        <div>
          <button
            className={classes["dodavanje-button"]}
            onClick={dodajNakladnikaHandler}
          >
            +
          </button>
        </div>
        <table className={classes.tablica}>
          <thead>
            <tr className={classes["prvi-redak"]}>
              <th>
                <h3>Nakladnici</h3>
              </th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {nakladnici.map((nakladnik, indx) => (
              <tr key={indx} className={classes["redak-podaci"]}>
                <td>{nakladnik.nakladnik}</td>
                <td className={classes["redak-button"]}>
                  <button
                    className={classes["sadrzaj-pregled-button"]}
                    onClick={() => {
                      urediNakladnika(nakladnik.id_nakladnika);
                    }}
                  >
                    Uredi
                  </button>
                </td>
                <td className={classes["redak-button"]}>
                  <button
                    className={classes["sadrzaj-pregled-button"]}
                    onClick={() => {
                      izbrisiNakladnika(nakladnik.id_nakladnika);
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

export default Nakladnik;
