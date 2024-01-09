import React, { useState, useEffect } from "react";

import KnjigaService from "../../services/KnjigaService";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useParams } from "react-router-dom";

import classes from "./PovijestPosudbi.module.css";

const PovijestPosudeneKnjige = () => {
  const [posudbe, setPosudbe] = useState([""]);
  const [error, setError] = useState(null);

  const { user } = useAuthContext();
  const { accessToken } = user;

  const { id } = useParams();

  useEffect(() => {
    const dohvacanjePovijestiPosudbe = async (id) => {
      setError(null);
      try {
        const response = await KnjigaService.dohvatiPovijestPosudbe(
          id,
          accessToken
        );
        if (response.status !== 200) {
          if (!response.data) {
            return setError("Dogodila se pogreška!");
          }
          setError(response.data.message);
        } else {
          const data = response.data;
          setPosudbe(data.povijest);
        }
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
    };

    dohvacanjePovijestiPosudbe(id);
  }, [id, accessToken]);

  console.log(posudbe);

  return (
    <div>
      <h3>Lista prošlih posudbi:</h3>
      {error && <p className={classes.error}>{error}</p>}
      <table className={classes.tablica}>
        <thead>
          <tr className={classes["prvi-redak"]}>
            <th>Naslov</th>
          </tr>
        </thead>
        <tbody>
          {posudbe.map((posudba, indx) => (
            <tr key={indx} className={classes["redak-podaci"]}>
              <td>{posudba.naslov}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PovijestPosudeneKnjige;
