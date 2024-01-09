import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import KnjigaService from "../../../services/KnjigaService";
import { useAuthContext } from "../../../hooks/useAuthContext";

import classes from "../dodajSadržaj/DodajKnjigu.module.css";

const UrediKnjigu = () => {
  const [autorData, setAutorData] = useState([""]);
  const [odabraniAutor, setOdabraniAutor] = useState("");
  const [zanrData, setZanrData] = useState([""]);
  const [odabraniZanr, setOdabraniZanr] = useState("");
  const [nakladnikData, setNakladnikData] = useState([""]);
  const [odabraniNakladnik, setOdabraniNakladnik] = useState("");
  const [kolicina, setKolicina] = useState(0);
  const [error, setError] = useState(null);

  const { id } = useParams();

  const navigate = useNavigate();

  const { user } = useAuthContext();
  const { accessToken } = user;

  const inicijalnoStanje = {
    id: null,
    naslov: "",
    autor: "",
    zanr: "",
    nakladnik: "",
    kolicina: 0,
  };

  const [knjiga, setKnjiga] = useState(inicijalnoStanje);

  useEffect(() => {
    const dohvatiKnjigu = async (id) => {
      setError(null);
      try {
        const resAutori = await KnjigaService.dohvatiAutore(accessToken);
        if (resAutori.status !== 200) {
          if (!resAutori.data) {
            return setError("Dogodila se pogreška!");
          }
          return setError(resAutori.data.message);
        }

        const resNakladnici = await KnjigaService.dohvatiNakladnike(
          accessToken
        );
        if (resNakladnici.status !== 200) {
          if (!resNakladnici.data) {
            return setError("Dogodila se pogreška!");
          }
          return setError(resNakladnici.data.message);
        }

        const resZanrovi = await KnjigaService.dohvatiZanrove(accessToken);
        if (resZanrovi.status !== 200) {
          if (!resZanrovi.data) {
            return setError("Dogodila se pogreška!");
          }
          return setError(resZanrovi.data.message);
        }

        setAutorData(resAutori.data);
        setNakladnikData(resNakladnici.data);
        setZanrData(resZanrovi.data);

        const response = await KnjigaService.get(id, accessToken);
        if (response.status !== 200) {
          if (!response.data) {
            return setError("Dogodila se pogreška!");
          }
          return setError(response.data.message);
        } else {
          const jsonKnjiga = response.data;
          setKnjiga(jsonKnjiga);

          setOdabraniAutor(jsonKnjiga.autor);
          setOdabraniNakladnik(jsonKnjiga.nakladnik);
          setOdabraniZanr(jsonKnjiga.zanr);
          setKolicina(jsonKnjiga.kolicina);
        }
      } catch (error) {
        console.error(error.message);
        setError(error.message);
      }
    };

    if (id) {
      dohvatiKnjigu(id);
    }
  }, [id, accessToken]);

  const autorChangeHandler = (e) => {
    setOdabraniAutor(e.target.value);
  };

  const nakladnikChangeHandler = (e) => {
    setOdabraniNakladnik(e.target.value);
  };

  const zanrChangeHandler = (e) => {
    setOdabraniZanr(e.target.value);
  };

  const kolicinaChangeHandler = (e) => {
    setKolicina(e.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setKnjiga({ ...knjiga, [name]: value });
  };

  const returnHandler = () => {
    navigate("/knjige");
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const autor = autorData.filter((item) => item.autor === odabraniAutor);
      const nakladnik = nakladnikData.filter(
        (item) => item.nakladnik === odabraniNakladnik
      );
      const zanr = zanrData.filter((item) => item.zanr === odabraniZanr);

      const body = {
        id: knjiga.id,
        naslov: knjiga.naslov,
        autor: +autor[0].id_autora,
        zanr: +zanr[0].id_zanra,
        nakladnik: +nakladnik[0].id_nakladnika,
        kolicina: +kolicina,
      };

      const response = await KnjigaService.update(id, body, accessToken);
      if (response.status !== 200) {
        if (!response.data) {
          return setError("Dogodila se pogreška!");
        }
        return setError(response.data.message);
      }

      navigate("/knjige");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  return (
    <div onSubmit={submitForm} className={classes["dodaj-knjigu"]}>
      {error && <p className={classes.error}>{error}</p>}
      <form>
        <div>
          <label className={classes.label}>Naslov</label>
          <input
            className={classes.input}
            type="text"
            name="naslov"
            value={knjiga.naslov}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className={classes.label}>Autor:</label>
          <select
            value={odabraniAutor}
            className={classes.select}
            onChange={autorChangeHandler}
          >
            {autorData.map((item, indx) => (
              <option key={indx}>{item.autor}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={classes.label}>Nakladnik:</label>
          <select
            value={odabraniNakladnik}
            className={classes.select}
            onChange={nakladnikChangeHandler}
          >
            {nakladnikData.map((item, indx) => (
              <option key={indx}>{item.nakladnik}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={classes.label}>Žanr:</label>
          <select
            className={classes.select}
            value={odabraniZanr}
            onChange={zanrChangeHandler}
          >
            {zanrData.map((item, indx) => (
              <option key={indx}>{item.zanr}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={classes.label}>Količina:</label>
          <input
            className={classes.input}
            value={kolicina}
            type="number"
            min="1"
            max="10"
            step="1"
            onChange={kolicinaChangeHandler}
            required
          />
        </div>
        <div>
          <button type="submit" className={classes.dodaj}>
            Uredi
          </button>
          <button type="button" onClick={returnHandler}>
            Natrag
          </button>
        </div>
      </form>
    </div>
  );
};

export default UrediKnjigu;
