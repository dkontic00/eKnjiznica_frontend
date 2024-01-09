import React from "react";
import { useState, useEffect } from "react";

import KnjigaService from "../../services/KnjigaService";
import { trazilicaData } from "../../data/trazilicaData";

import classes from "./Knjige.module.css";

const KnjigePublic = () => {
  const [knjige, setKnjige] = useState([]);
  const [error, setError] = useState(null);

  const [trazi, setTrazi] = useState("");
  const [trazilica, setTrazilica] = useState(trazilicaData[0]);
  const [trazilicaFlag, setTrazilicaFlag] = useState(false);

  const trazilicaHandler = (e) => {
    setTrazilica(e.target.value);
  };

  const handleTrazi = async () => {
    if (trazi === "") {
      setError(null);
      try {
        const response = await KnjigaService.getAllPublic();
        if (response.status !== 200) {
          if (!response.data) {
            return setError("Dogodila se pogreška!");
          }
          setError(response.data.message);
        } else {
          const data = response.data;
          setKnjige(data);
        }
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
    } else {
      try {
        const response = await KnjigaService.pronadiPublic(trazi, trazilica);
        if (response.status !== 200) {
          if (!response.data) {
            return setError("Dogodila se pogreška!");
          }
          setError(response.data.message);
        } else {
          const jsonK = response.data;

          if (jsonK.length === 0) {
            setTrazilicaFlag(true);
            setKnjige(jsonK);
          } else {
            setTrazilicaFlag(false);
            setKnjige(jsonK);
          }
        }
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    const fecthData = async () => {
      setError(null);
      try {
        const response = await KnjigaService.getAllPublic();
        if (response.status !== 200) {
          if (!response.data) {
            return setError("Dogodila se pogreška!");
          }
          setError(response.data.message);
        } else {
          const jsonKnjige = response.data;

          setKnjige(jsonKnjige);
        }
      } catch (error) {
        console.error(error.message);
        setError(error.message);
      }
    };

    if (trazi.length === 0) {
      setTrazilicaFlag(false);
      fecthData();
    }
  }, [trazi]);

  const dohvatiKnjige = async () => {
    setError(null);
    try {
      const response = await KnjigaService.getAllPublic();
      if (response.status !== 200) {
        if (!response.data) {
          return setError("Dogodila se pogreška!");
        }
        setError(response.data.message);
      } else {
        const jsonKnjige = response.data;

        setKnjige(jsonKnjige);
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    dohvatiKnjige();
  }, []);

  console.log(knjige);

  return (
    <div>
      <div className={classes.trazilica}>
        <input
          type="text"
          placeholder="Pretraži.."
          name="trazilica"
          value={trazi}
          onChange={(e) => setTrazi(e.target.value)}
        />
        <select value={trazilica} onChange={trazilicaHandler}>
          {trazilicaData.map((item, indx) => (
            <option key={indx}>{item}</option>
          ))}
        </select>
        <button onClick={handleTrazi}>
          <i className="fa fa-search"></i>
        </button>
      </div>
      {error && <p className={classes.error}>{error}</p>}
      {trazilicaFlag ? (
        <div className={classes.nepostojeci}>
          <p>{`Traženi ${trazilica} nije moguće pronaći, provjerite unos!!`}</p>
        </div>
      ) : (
        <div className={classes.body}>
          {knjige.map((knjiga) => (
            <div key={knjiga.id_knjiga} className={classes.knjiga}>
              <div className={classes.naslov}>
                <h3>{knjiga.naslov}</h3>
              </div>
              <div className={classes.opis}>
                <label className={classes["knjige-label"]}>Autor:</label>
                <p>{knjiga.autor}</p>
                <label className={classes["knjige-label"]}>Nakladnik:</label>
                <p>{knjiga.nakladnik}</p>
                <label className={classes["knjige-label"]}>Žanr:</label>
                <p>{knjiga.zanr}</p>
              </div>
              <div className={classes.button}>
                {knjiga.kolicina === 0 && (
                  <p className={classes.nedostupna}>Knjiga nije dostupna</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default KnjigePublic;
