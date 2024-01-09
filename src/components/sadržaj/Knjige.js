import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import KnjigaService from "../../services/KnjigaService";
import { useAuthContext } from "../../hooks/useAuthContext";

import classes from "./PregledSadržaja.module.css";

const ListaKnjiga = () => {
  const [knjige, setKnjige] = useState([""]);
  const [error, setError] = useState(null);

  const { user } = useAuthContext();
  const { accessToken } = user;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await KnjigaService.getAll(accessToken);
        if (response.status !== 200) {
          if (!response.data) {
            return setError("Dogodila se pogreška!");
          }
          setError(response.data.message);
        } else {
          console.log(response.data);
          setKnjige(response.data);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [accessToken]);

  const detaljiKnjigeHandler = (id) => {
    navigate(`/detaljiKnjige/${id}`);
  };

  const dodajKnjiguHandler = () => {
    navigate("/dodajKnjigu");
  };

  return (
    <div>
      {error && <p className={classes.error}>{error}</p>}
      <div>
        <button
          className={classes["dodavanje-button"]}
          onClick={dodajKnjiguHandler}
        >
          +
        </button>
      </div>
      <table className={classes["tablica-knjige"]}>
        <thead>
          <tr className={classes["prvi-redak"]}>
            <th>Naslov</th>
            <th>Autor</th>
            <th>Nakladnik</th>
            <th>Žanr</th>
            <th>Količina</th>
          </tr>
        </thead>
        <tbody>
          {knjige.map((knjiga, indx) => (
            <tr
              key={indx}
              className={classes["redak-podaci-knjiznicar"]}
              onClick={() => {
                detaljiKnjigeHandler(knjiga.id_knjiga);
              }}
            >
              <td>{knjiga.naslov}</td>
              <td>{knjiga.autor}</td>
              <td>{knjiga.nakladnik}</td>
              <td>{knjiga.zanr}</td>
              <td className={classes.kolicina}>{knjiga.kolicina}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaKnjiga;
