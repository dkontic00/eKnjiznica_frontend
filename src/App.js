import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import DodajKnjigu from "./components/sadržaj/dodajSadržaj/DodajKnjigu";
import Knjige from "./components/knjige/Knjige";
import UrediKnjigu from "./components/sadržaj/urediSadržaj/UrediKnjigu";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import KnjigePublic from "./components/knjige/KnjigePublic";
import DohvatiKorisnike from "./components/korisnici/DohvatiKorisnike";
import { useAuthContext } from "./hooks/useAuthContext";
import DodajSadržaj from "./components/sadržaj/DodajSadržaj";
import DodajAutora from "./components/sadržaj/dodajSadržaj/DodajAutora";
import DodajNakladnika from "./components/sadržaj/dodajSadržaj/DodajNakladnika";
import DodajZanr from "./components/sadržaj/dodajSadržaj/DodajZanr";
import PosudeneKnjige from "./components/knjige/PosudeneKnjige";
import Navbar from "./components/navbar/Navbar";
import SvePosudeneKnjige from "./components/knjige/SvePosudeneKnjige";
import UrediAutora from "./components/sadržaj/urediSadržaj/UrediAutora";
import UrediNakladnika from "./components/sadržaj/urediSadržaj/UrediNakladnika";
import UrediZanr from "./components/sadržaj/urediSadržaj/UrediZanr";
import Autor from "./components/sadržaj/Autor";
import Nakladnik from "./components/sadržaj/Nakladnik";
import Zanr from "./components/sadržaj/Zanr";
import PregledajProfil from "./components/korisnici/PregledajProfil";
import PlaceneTransakcije from "./components/transakcije/PlaceneTransakcije";
import NeplaceneTransakcije from "./components/transakcije/NeplaceneTransakcije";
import PovijestPosudeneKnjige from "./components/knjige/PovijestPosudeneKnjige";
import PlaceneTransakcijeKorisnika from "./components/transakcije/PlaceneTransakcijeKorisnika";
import Postavke from "./components/postavke/Postavke";
import Footer from "./components/UI/Footer";
import DetaljiKorisnika from "./components/korisnici/DetaljiKorisnika";
import DetaljiKnjige from "./components/knjige/DetaljiKnjige";
import ListaKnjiga from "./components/sadržaj/Knjige";
import InformacijeKnjiznice from "./components/postavke/InformacijeKnjiznice";

import classes from "./app.module.css";

const App = () => {
  const { user } = useAuthContext();

  return (
    <div className={classes.app}>
      <BrowserRouter>
        <Navbar />
        <div className={classes.content}>
          <Routes>
            <Route
              path="/"
              element={!user ? <KnjigePublic /> : <Navigate to="/knjige" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/knjige" />}
            />
            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to="/knjige" />}
            />
            <Route
              path="/knjige"
              element={user ? <Knjige /> : <Navigate to="/login" />}
            />
            <Route
              path="/knjige/:id"
              element={user ? <UrediKnjigu /> : <Navigate to="/login" />}
            />
            <Route
              path="dodajSadrzaj"
              element={user ? <DodajSadržaj /> : <Navigate to="/login" />}
            />
            <Route
              path="/dodajKnjigu"
              element={user ? <DodajKnjigu /> : <Navigate to="/login" />}
            />
            <Route
              path="/dodajAutora"
              element={user ? <DodajAutora /> : <Navigate to="/login" />}
            />
            <Route
              path="/dodajNakladnika"
              element={user ? <DodajNakladnika /> : <Navigate to="/login" />}
            />
            <Route
              path="/dodajZanr"
              element={user ? <DodajZanr /> : <Navigate to="/login" />}
            />
            <Route
              path="/dohvatiKorisnike"
              element={user ? <DohvatiKorisnike /> : <Navigate to="/login" />}
            />
            <Route
              path="/dohvatiKorisnike/:id"
              element={user ? <PregledajProfil /> : <Navigate to="/login" />}
            />
            <Route
              path="/dohvatiSvePosudeneKnjige"
              element={user ? <SvePosudeneKnjige /> : <Navigate to="/login" />}
            />
            <Route
              path="/dohvatiPosudeneKnjige"
              element={user ? <PosudeneKnjige /> : <Navigate to="/login" />}
            />
            <Route
              path="/autori"
              element={user ? <Autor /> : <Navigate to="/login" />}
            />
            <Route
              path="/autori/:id"
              element={user ? <UrediAutora /> : <Navigate to="/login" />}
            />
            <Route
              path="/nakladnici"
              element={user ? <Nakladnik /> : <Navigate to="/login" />}
            />
            <Route
              path="/nakladnici/:id"
              element={user ? <UrediNakladnika /> : <Navigate to="/login" />}
            />
            <Route
              path="/zanrovi"
              element={user ? <Zanr /> : <Navigate to="/login" />}
            />
            <Route
              path="/zanrovi/:id"
              element={user ? <UrediZanr /> : <Navigate to="/login" />}
            />
            <Route
              path="/knjige/urediKnjigu/:id"
              element={user ? <UrediKnjigu /> : <Navigate to="/login" />}
            />
            <Route
              path="/transakcije/placene"
              element={user ? <PlaceneTransakcije /> : <Navigate to="/login" />}
            />
            <Route
              path="/transakcije/placene/:id"
              element={
                user ? (
                  <PlaceneTransakcijeKorisnika />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/transakcije/neplacene"
              element={
                user ? <NeplaceneTransakcije /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/povijestPosudbe/:id"
              element={
                user ? <PovijestPosudeneKnjige /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/postavke"
              element={user ? <Postavke /> : <Navigate to="/login" />}
            />
            <Route
              path="/informacijeKnjiznice"
              element={
                user ? <InformacijeKnjiznice /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/detaljiKorisnika/:id"
              element={user ? <DetaljiKorisnika /> : <Navigate to="login" />}
            />
            <Route
              path="/listaKnjiga"
              element={user ? <ListaKnjiga /> : <Navigate to="login" />}
            />
            <Route
              path="/detaljiKnjige/:id"
              element={user ? <DetaljiKnjige /> : <Navigate to="login" />}
            />
            <Route path="*" element={<KnjigePublic />} />
          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
