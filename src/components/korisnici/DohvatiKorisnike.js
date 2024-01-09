import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import KnjigaService from "../../services/KnjigaService";
import { useAuthContext } from "../../hooks/useAuthContext";

import classes from "./DohvatiKorisnike.module.css";

const DohvatiKorisnike = () => {
  const [korisnici, setKorisnici] = useState([]);
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);

  const { user } = useAuthContext();
  const { accessToken } = user;

  const navigate = useNavigate();

  useEffect(() => {
    const dohvatiKorisnike = async () => {
      setError(null);
      try {
        const fetchRoles = await KnjigaService.dohvatiUloge(accessToken);
        if (fetchRoles.status !== 200) {
          if (!fetchRoles.data) {
            return setError("Dogodila se pogreška!");
          }
          return setError(fetchRoles.data.message);
        }

        const rolesData = fetchRoles.data;

        const response = await KnjigaService.dohvatiKorisnike(accessToken);
        if (response.status !== 200) {
          if (!response.data) {
            return setError("Dogodila se pogreška!");
          }
        } else {
          const jsonKorisnici = response.data;
          setKorisnici(jsonKorisnici);
          setRoles(rolesData);
        }
      } catch (error) {
        console.error(error.message);
        setError(error.message);
      }
    };

    dohvatiKorisnike();
  }, [accessToken]);

  const promjeniUlogu = async (id, val) => {
    setError(null);
    console.log(val);
    let indx = 0;
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].uloga === val) {
        indx = roles[i].id_uloge;
      }
    }
    try {
      const resPromijeniUlogu = await KnjigaService.promijeniUlogu(
        id,
        indx,
        accessToken
      );
      if (resPromijeniUlogu.status !== 200) {
        if (!resPromijeniUlogu.data) {
          setError("Dogodila se pogreška!");
        }
        return setError(resPromijeniUlogu.data.message);
      }

      const dohvatiKorisnike = async () => {
        setError(null);
        try {
          const response = await KnjigaService.dohvatiKorisnike(accessToken);
          if (response.status !== 200) {
            if (!response.data) {
              return setError("Dogodila se pogreška!");
            }
            setError(response.data.message);
          } else {
            const jsonKorisnici = response.data;
            setKorisnici(jsonKorisnici);
          }
        } catch (error) {
          console.error(error.message);
          setError(error.message);
        }
      };

      dohvatiKorisnike();
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
  };

  const aktivirajRacunHandler = async (id) => {
    setError(null);
    try {
      const resAktivacija = await KnjigaService.aktivirajRacun(id, accessToken);
      if (resAktivacija.status !== 200) {
        if (!resAktivacija.data) {
          return setError("Dogodila se pogreška!");
        }
        return setError(resAktivacija.data.message);
      }

      const response = await KnjigaService.dohvatiKorisnike(accessToken);
      if (response.status !== 200) {
        if (!response.data) {
          return setError("Dogodila se pogreška!");
        }
        setError(response.data.message);
      } else {
        const data = response.data;
        setKorisnici(data);
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  const detaljiKorisnikaHandler = (id) => {
    navigate(`/detaljiKorisnika/${id}`);
  };

  return (
    <div>
      <h3>Lista korisničkih računa:</h3>
      {error && <p className={classes.error}>{error}</p>}
      <table className={classes["tablica-admin"]}>
        <thead>
          <tr className={classes["prvi-redak"]}>
            <th>Korisnik</th>
            <th>Status</th>
            <th>Učlanjen datuma</th>
            {user.uloga === "admin" && <th>Uloga</th>}
            {user.uloga === "admin" && <th></th>}
          </tr>
        </thead>
        <tbody>
          {user.uloga === "knjiznicar" &&
            korisnici
              .filter((korisnik) => korisnik.uloga === "korisnik")
              .map((korisnik, indx) => (
                <tr
                  key={indx}
                  className={classes["redak-podaci-knjiznicar"]}
                  onClick={() => {
                    detaljiKorisnikaHandler(korisnik.id);
                  }}
                >
                  <td>{korisnik.email}</td>
                  <td>
                    {korisnik.aktivan_racun ? (
                      <label>Aktivan</label>
                    ) : (
                      <label>Neaktivan</label>
                    )}
                  </td>
                  <td className={classes.datum}>
                    {new Date(korisnik.datum_uclanjenja).toLocaleDateString()}
                  </td>
                </tr>
              ))}
          {user.uloga === "admin" &&
            korisnici.map((korisnik) => (
              <tr key={korisnik.id} className={classes["redak-podaci"]}>
                <td>{korisnik.email}</td>
                <td>
                  {korisnik.aktivan_racun ? (
                    <label>Aktivan</label>
                  ) : (
                    <label>Neaktivan</label>
                  )}
                </td>
                <td className={classes.datum}>
                  {new Date(korisnik.datum_uclanjenja).toLocaleDateString()}
                </td>
                <td className={classes["celija-select"]}>
                  <select
                    key={korisnik.id}
                    value={korisnik.uloga}
                    onChange={(e) => {
                      promjeniUlogu(korisnik.id, e.target.value);
                    }}
                  >
                    {roles.map((role) => (
                      <option key={role.id_uloge}>{role.uloga}</option>
                    ))}
                  </select>
                </td>
                <td className={classes["celija-button"]}>
                  {!korisnik.aktivan_racun && (
                    <button
                      className={classes["aktivacija-button"]}
                      onClick={() => {
                        aktivirajRacunHandler(korisnik.id);
                      }}
                    >
                      Aktiviraj račun
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {/*korisnici.map((korisnik) => (
        <div className={classes.korisnici} key={korisnik.id}>
          <div className={classes.podaci}>
            <label className={classes.labele_opisa}>Korisnik:</label>
            <label id="korisnicko_ime">{korisnik.email}</label>
          </div>
          <div className={classes.podaci}>
            <label className={classes.labele_opisa}>Status profila:</label>
            {korisnik.aktivan_racun ? (
              <label>Aktivan</label>
            ) : (
              <label>Neaktivan</label>
            )}
          </div>
          <div className={classes.podaci}>
            <label className={classes.labele_opisa}>Učlanjen:</label>
            <label>
              {new Date(korisnik.datum_uclanjenja).toLocaleDateString()}
            </label>
          </div>
          <div className={classes.podaci}>
            <label className={classes.labele_opisa}>Uloga:</label>

            <select
              key={korisnik.id}
              value={korisnik.uloga}
              onChange={(e) => {
                promjeniUlogu(korisnik.id, e.target.value);
              }}
            >
              {roles.map((role) => (
                <option key={role.id_uloge}>{role.uloga}</option>
              ))}
            </select>
          </div>
          <div className={classes.podaci}>
            {!korisnik.aktivan_racun && (
              <button
                className={classes["aktivacija-button"]}
                onClick={() => {
                  aktivirajRacunHandler(korisnik.id);
                }}
              >
                Aktiviraj račun
              </button>
            )}
          </div>
        </div>
              ))*/}
    </div>
  );
};

export default DohvatiKorisnike;
