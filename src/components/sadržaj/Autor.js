import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import KnjigaService from "../../services/KnjigaService";
import { useAuthContext } from "../../hooks/useAuthContext";

import classes from "./PregledSadržaja.module.css";

const Autor = () => {
  const [autori, setAutori] = useState([]);
  const [error, setError] = useState(null);

  const { user } = useAuthContext();
  const { accessToken } = user;

  const navigate = useNavigate();

  useEffect(() => {
    const fecthData = async () => {
      setError(null);
      try {
        const response = await KnjigaService.dohvatiAutore(accessToken);
        if (response.status !== 200) {
          if (!response.data) {
            return setError("Dogodila se pogreška!");
          }
          setError(response.data.message);
        } else {
          const data = response.data;
          console.log(data);
          setAutori(data);
        }
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
    };
    fecthData();
  }, [accessToken]);

  const urediAutora = (id) => {
    navigate(`/autori/${id}`);
  };

  const izbrisiAutora = async (id) => {
    setError(null);
    try {
      const brisanjeResponse = await KnjigaService.izbrisiAutora(
        id,
        accessToken
      );
      if (brisanjeResponse.status !== 200) {
        if (!brisanjeResponse.data) {
          return setError("Dogodila se pogreška!");
        }
        setError(brisanjeResponse.data.message);
      }
      const response = await KnjigaService.dohvatiAutore(accessToken);
      if (response.status !== 200) {
        if (!response.data) {
          return setError("Dogodila se pogreška!");
        }
        setError(response.data.message);
      } else {
        const data = response.data;
        setAutori(data);
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  const dodajAutoraHandler = () => {
    navigate("/dodajAutora");
  };

  return (
    <div>
      {error && <p className={classes.error}>{error}</p>}
      <div>
        <button
          className={classes["dodavanje-button"]}
          onClick={dodajAutoraHandler}
        >
          +
        </button>
      </div>
      <table className={classes.tablica}>
        <thead>
          <tr className={classes["prvi-redak"]}>
            <th>
              <h3>Naziv autora</h3>
            </th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {autori.map((autor, indx) => (
            <tr key={indx} className={classes["redak-podaci"]}>
              <td>{autor.autor}</td>
              <td className={classes["redak-button"]}>
                <button
                  className={classes["sadrzaj-pregled-button"]}
                  onClick={() => {
                    urediAutora(autor.id_autora);
                  }}
                >
                  Uredi
                </button>
              </td>
              <td className={classes["redak-button"]}>
                <button
                  className={classes["sadrzaj-pregled-button"]}
                  onClick={() => {
                    izbrisiAutora(autor.id_autora);
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
  );
};

export default Autor;
