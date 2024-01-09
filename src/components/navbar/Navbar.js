import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import KnjigaService from "../../services/KnjigaService";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";

import styles from "./Navbar.module.css";

const Navbar = () => {
  const [naziv, setNaziv] = useState("");
  const [error, setError] = useState(null);

  const { user } = useAuthContext();

  const navigate = useNavigate();

  const { logout } = useLogout();

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const response =
          await KnjigaService.dohvatiInformacijeKnjiznicePublic();
        if (response.status !== 200) {
          if (!response.data) {
            setError("Dogodila se pogreška!");
          }
          setError(response.data.message);
        } else {
          setNaziv(response.data[0].naziv);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  const naslovnica = () => {
    navigate("/knjige");
  };

  const naslovnicaPublic = () => {
    navigate("/");
  };

  const dodajSadrzajHandler = () => {
    navigate("/dodajSadrzaj");
  };

  const registerHandler = () => {
    navigate("/register");
  };

  const loginHandler = () => {
    navigate("/login");
  };

  const logoutHandler = () => {
    logout();
    navigate("/login");
  };

  const pregledProfilaHandler = () => {
    navigate(`/dohvatiKorisnike/${user.id}`);
  };

  const viewUsersHandler = () => {
    navigate("/dohvatiKorisnike");
  };

  const dohvatiPosudeneKnjigeHandler = () => {
    navigate("/dohvatiPosudeneKnjige");
  };

  const dohvatiSvePosudeneKnjigeHandler = () => {
    navigate("/dohvatiSvePosudeneKnjige");
  };

  const oldTransactionsHandler = () => {
    navigate("/transakcije/placene");
  };

  const activeTransactionsHandler = () => {
    navigate("/transakcije/neplacene");
  };

  const dohvatiPovijestPosudbeHandler = () => {
    navigate(`/povijestPosudbe/${user.id}`);
  };

  const oldUserTransactionsHandler = () => {
    navigate(`/transakcije/placene/${user.id}`);
  };

  const postavkeHandler = () => {
    navigate(`/postavke`);
  };

  const dohvatiListuKorisnikaHandler = () => {
    navigate("/dohvatiKorisnike");
  };

  const InformacijeKnjizniceHandler = () => {
    navigate("/informacijeKnjiznice");
  };

  return (
    <header className={`${styles["navBar"]}`}>
      {error && <p>{error}</p>}
      <div>
        {user && (
          <Link to="/knjige" onClick={naslovnica}>
            <h1>{naziv}</h1>
          </Link>
        )}
        {!user && (
          <Link to="/" onClick={naslovnicaPublic}>
            <h1>{naziv}</h1>
          </Link>
        )}
        <nav>
          {!user ? (
            <div>
              <button type="button" onClick={loginHandler}>
                Prijavi se
              </button>
              <button type="button" onClick={registerHandler}>
                Registriraj se
              </button>
            </div>
          ) : (
            <div>
              {user.uloga === "admin" && (
                <button type="button" onClick={viewUsersHandler}>
                  Pregledaj korisnike
                </button>
              )}
              {user.uloga === "admin" && (
                <button type="button" onClick={oldTransactionsHandler}>
                  Pregledaj povijest transakcija
                </button>
              )}
              {user.uloga === "admin" && (
                <button type="button" onClick={activeTransactionsHandler}>
                  Pregledaj aktivne transakcije
                </button>
              )}
              {user.uloga === "admin" && (
                <button type="button" onClick={postavkeHandler}>
                  Pregledaj postavke sustava
                </button>
              )}
              {user.uloga === "admin" && (
                <button type="button" onClick={InformacijeKnjizniceHandler}>
                  Pregledaj informacije knjižnice
                </button>
              )}
              {user.uloga === "knjiznicar" && (
                <button type="button" onClick={dodajSadrzajHandler}>
                  Uredi sadržaj
                </button>
              )}
              {user.uloga === "knjiznicar" && (
                <button type="button" onClick={dohvatiSvePosudeneKnjigeHandler}>
                  Pregledaj posuđene knjige
                </button>
              )}
              {user.uloga === "knjiznicar" && (
                <button type="button" onClick={dohvatiListuKorisnikaHandler}>
                  Pregledaj korisnike
                </button>
              )}
              {user.uloga === "korisnik" && (
                <button type="button" onClick={dohvatiPosudeneKnjigeHandler}>
                  Pregledaj posuđene knjige
                </button>
              )}
              {user.uloga === "korisnik" && (
                <button type="button" onClick={dohvatiPovijestPosudbeHandler}>
                  Povijest posudbe
                </button>
              )}
              {user.uloga === "korisnik" && (
                <button type="button" onClick={oldUserTransactionsHandler}>
                  Pregledaj povijest transakcija
                </button>
              )}
              <button onClick={pregledProfilaHandler}>Pregledaj profil</button>
              <button type="button" onClick={logoutHandler}>
                Odjavi se
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
