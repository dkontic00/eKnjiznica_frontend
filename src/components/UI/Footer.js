import React, { Fragment, useState, useEffect } from "react";

import KnjigaService from "../../services/KnjigaService";

import classes from "./Footer.module.css";

const Footer = () => {
  const [naziv, setNaziv] = useState("");
  const [email, setEmail] = useState("");
  const [adresa, setAdresa] = useState("");
  const [grad, setGrad] = useState("");
  const [postanskiBroj, setPostanskiBroj] = useState(0);
  const [kontaktBroj, setKontaktBroj] = useState("");
  const [error, setError] = useState(null);

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
          setAdresa(response.data[0].adresa);
          setGrad(response.data[0].grad);
          setPostanskiBroj(response.data[0].postanski_broj);
          setEmail(response.data[0].email);
          setKontaktBroj(response.data[0].kontakt_broj);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <Fragment>
      <footer className={classes.footer}>
        {error && <p>{error}</p>}
        <div className={`${classes.footer} ${classes.left}`}>
          <h5>&copy; {` ${naziv} ${new Date().getFullYear()}`}.</h5>
        </div>
        <div className={`${classes.footer} ${classes.center}`}>
          <p>Adresa: {`${adresa}, ${postanskiBroj} ${grad}`}</p>
          <p>Kontakt: {`${kontaktBroj}`}</p>
          <p>Email: {`${email}`}</p>
        </div>
        <div className={`${classes.footer} ${classes.right}`}>
          <p>Online knjižnica</p>
          <p>Učlani se !!</p>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;

/*<footer className={classes.footer}>
        <div className={`${classes.footer} ${classes.left}`}>
          <h5>&copy; eKnjižnica 2023.</h5>
        </div>
        <div className={`${classes.footer} ${classes.center}`}>
          <p>Adresa: Kopilica 5, 2100 Split</p>
          <p>Kontakt: 0987654321</p>
          <p>Email: kontakt@eknjiznica.com</p>
        </div>
        <div className={`${classes.footer} ${classes.right}`}>
          <p>Online knjižnica</p>
          <p>Učlani se !!</p>
        </div>
      </footer> */
