import React from "react";
import { useEffect, useState } from "react";

import { useAuthContext } from "../../hooks/useAuthContext";
import KnjigaService from "../../services/KnjigaService";
import { trazilicaData } from "../../data/trazilicaData";
import { useNavigate } from "react-router-dom";
import Modal from "../UI/Modal";

import classes from "./Knjige.module.css";

const Knjige = () => {
  const [knjige, setKnjige] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [error, setError] = useState(null);

  const [trazi, setTrazi] = useState("");
  const [trazilica, setTrazilica] = useState(trazilicaData[0]);
  const [trazilicaFlag, setTrazilicaFlag] = useState(false);

  const { user } = useAuthContext();
  const { id: id_korisnika, accessToken } = user;

  const navigate = useNavigate();

  const trazilicaHandler = (e) => {
    setTrazilica(e.target.value);
  };

  const handleTrazi = async () => {
    if (trazi === "") {
      setError(null);
      try {
        const response = await KnjigaService.getAll(accessToken);
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
    } else {
      try {
        const response = await KnjigaService.pronadi(
          trazi,
          trazilica,
          accessToken
        );
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

  const handleZaduzenje = async (id_knjige) => {
    try {
      const resZaduzi = await KnjigaService.zaduziKnjigu(
        id_knjige,
        id_korisnika,
        accessToken
      );
      if (resZaduzi.status !== 200) {
        if (!resZaduzi.data) {
          return setError("Dogodila se pogreška!");
        }
        return setError(resZaduzi.data.message);
      }

      const response = await KnjigaService.getAll(accessToken);
      if (response.status !== 200) {
        if (!response.data) {
          return setError("Dogodila se pogreška!");
        }
        setError(response.data.message);
      } else {
        setKnjige(() => {
          return [...response.data];
        });
        setIsModal(true);
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    const fecthData = async () => {
      setError(null);
      try {
        const response = await KnjigaService.getAll(accessToken);
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

    if (trazi.length === 0) {
      setTrazilicaFlag(false);
      fecthData();
    }
  }, [trazi, accessToken]);

  useEffect(() => {
    const fecthData = async () => {
      setError(null);
      try {
        const response = await KnjigaService.getAll(accessToken);
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

    fecthData();
  }, [accessToken]);

  const urediHandler = (id) => {
    navigate(`/knjige/urediKnjigu/${id}`);
  };

  /*const izbrisiHandler = async (id) => {
    try {
      await KnjigaService.remove(id, accessToken);
      const response = await KnjigaService.getAll(accessToken);
      const data = response.data;

      setKnjige(data);
    } catch (error) {
      console.log(error.message);
    }
  };*/
  const onClickModal = () => {
    setIsModal(false);
  };
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
      {isModal && (
        <Modal
          onClose={onClickModal}
          title={"Uspješno ste zadužili knjigu, klikom nastavite rad!"}
        />
      )}
      {trazilicaFlag ? (
        <div className={classes.nepostojeci}>
          <p>{`Traženi ${trazilica} nije moguće pronaći, provjerite unos!!`}</p>
        </div>
      ) : (
        <div className={classes.body}>
          {knjige.map((knjiga) => (
            <div
              key={knjiga.id_knjiga}
              className={`${classes.knjiga} ${
                user.uloga === "knjiznicar" && classes.knjiznicar
              } ${user.uloga === "admin" && classes.admin}`}
            >
              <div className={classes.naslov}>
                <h3>{knjiga.naslov}</h3>
              </div>
              <div className={classes.opis}>
                <label className={classes["knjige-label"]}>Autor:</label>
                <p>{knjiga.autor}</p>
                <label className={classes["knjige-label"]}>Nakladnik</label>
                <p>{knjiga.nakladnik}</p>
                <label className={classes["knjige-label"]}>Žanr:</label>
                <p>{knjiga.zanr}</p>
                {user.uloga === "knjiznicar" && (
                  <div>
                    <label className={classes["knjige-label"]}>
                      Količina dostupnih:
                    </label>
                    <p>{knjiga.kolicina}</p>
                  </div>
                )}
              </div>
              {user.uloga === "knjiznicar" && (
                <div className={classes.button}>
                  <button
                    onClick={() => {
                      urediHandler(knjiga.id_knjiga);
                    }}
                  >
                    Uredi
                  </button>
                </div>
              )}
              {user.uloga === "korisnik" && (
                <div className={classes.button}>
                  {knjiga.kolicina !== 0 ? (
                    <button
                      onClick={() => {
                        handleZaduzenje(knjiga.id_knjiga);
                      }}
                    >
                      Rezerviraj
                    </button>
                  ) : (
                    <p className={classes.nedostupna}>Knjiga nije dostupna</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Knjige;
