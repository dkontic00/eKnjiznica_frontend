import http from "../http-common";

const login = async (email, password) => {
  return http
    .post("http://localhost:3000/login", {
      email: email,
      password: password,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};
const checkLogin = async () => {
  return http
    .get("http://localhost:3000/login")
    .then((res) => {
      if (!res.data) {
        return { loggedIn: false };
      }
      return { ...res.data };
    })
    .catch((err) => {
      console.log(err);
      return err.response;
    });
};
const register = async (ime, email, password) => {
  return http
    .post(`http://localhost:3000/register`, {
      email: email,
      ime: ime,
      password: password,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const dodajKnjigu = async (naslov, autor, zanr, nakladnik, kolicina, token) => {
  return http
    .post(
      "http://localhost:3000/knjige/dodajKnjigu",
      {
        naslov,
        autor,
        zanr,
        nakladnik,
        kolicina,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const dohvatiKorisnike = async (token) => {
  return http
    .get(`http://localhost:3000/korisnici/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const dohvatiKorisnika = async (id, token) => {
  return http
    .get(`http://localhost:3000/korisnici/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const promijeniUlogu = async (id, indx, token) => {
  return http
    .put(
      "http://localhost:3000/korisnici/promijeniUlogu",
      {
        id,
        indx,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const izbrisiKorisnika = async (id, token) => {
  return http
    .delete(`http://localhost:3000/korisnici/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const get = async (id, token) => {
  return http
    .get(`http://localhost:3000/knjige/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const getAllPublic = async () => {
  return http
    .get("http://localhost:3000/")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const getAll = async (token) => {
  return http
    .get("http://localhost:3000/knjige", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const create = async (data, token) => {
  return http
    .post("/knjige/dodajKnjigu", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const update = async (id, data, token) => {
  return http
    .put(`http://localhost:3000/knjige/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const remove = async (id, token) => {
  return http
    .delete(`http://localhost:3000/knjige/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const pronadiPublic = async (trazi, kategorija) => {
  return http
    .post(`http://localhost:3000/`, { trazi, kategorija })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const pronadi = async (trazi, kategorija, token) => {
  return http
    .post(
      `http://localhost:3000/knjige`,
      { trazi, kategorija },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const dohvatiAutore = async (token) => {
  return http
    .get("http://localhost:3000/autori", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const dohvatiAutora = async (id, token) => {
  return http
    .get(`http://localhost:3000/autori/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const dodajAutora = async (autor, token) => {
  return http
    .post(
      "http://localhost:3000/autori/dodajAutora",
      { autor: autor },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const urediAutora = async (id, autor, token) => {
  return http
    .put(
      `http://localhost:3000/autori/${id}`,
      { autor },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const izbrisiAutora = async (id, token) => {
  return http
    .delete(`http://localhost:3000/autori/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const dohvatiNakladnike = async (token) => {
  return http
    .get("http://localhost:3000/nakladnici", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      //console.log(error);
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const dohvatiNakladnika = async (id, token) => {
  return http
    .get(`http://localhost:3000/nakladnici/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const dodajNakladnika = async (nakladnik, token) => {
  return http
    .post(
      "http://localhost:3000/nakladnici/dodajNakladnika",
      { nakladnik: nakladnik },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const urediNakladnika = async (id, nakladnik, token) => {
  return http
    .put(
      `http://localhost:3000/nakladnici/${id}`,
      { nakladnik },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const izbrisiNakladnika = async (id, token) => {
  return http
    .delete(`http://localhost:3000/nakladnici/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const dohvatiZanrove = async (token) => {
  return http
    .get(`http://localhost:3000/zanrovi/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const dohvatiZanr = async (id, token) => {
  return http
    .get(`http://localhost:3000/zanrovi/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const dodajZanr = async (zanr, token) => {
  return http
    .post(
      `http://localhost:3000/zanrovi/dodajZanr`,
      { zanr: zanr },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const urediZanr = async (id, zanr, token) => {
  return http
    .put(
      `http://localhost:3000/zanrovi/${id}`,
      { zanr },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const izbrisiZanr = async (id, token) => {
  return http
    .delete(`http://localhost:3000/zanrovi/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const zaduziKnjigu = async (id_knjige, id_korisnika, token) => {
  return http
    .post(
      `http://localhost:3000/knjige/zaduziKnjigu`,
      { id_knjige, id_korisnika },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const vratiKnjigu = async (id_knjige, id_korisnika, token) => {
  return http
    .patch(
      `http://localhost:3000/knjige/vratiKnjigu`,
      { id_knjige, id_korisnika },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const dohvatiSvePosudeneKnjige = async (token) => {
  return http
    .get(`http://localhost:3000/knjige/dohvatiSvePosudeneKnjige`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const dohvatiUloge = async (token) => {
  return http
    .get(`http://localhost:3000/korisnici/uloge`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const aktivirajRacun = async (id, token) => {
  return http
    .post(
      `http://localhost:3000/korisnici/aktivirajRacun`,
      { id },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const dohvatiPlaceneTransakcije = async (token) => {
  return http
    .get(`http://localhost:3000/transakcije/neaktivne`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const dohvatiPlaceneTransakcijeKorisnika = async (id_korisnika, token) => {
  return http
    .get(`http://localhost:3000/transakcije/neaktivne/${id_korisnika}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const dohvatiNeplaceneTransakcije = async (token) => {
  return http
    .get(`http://localhost:3000/transakcije/aktivne`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const dohvatiPovijestPosudbe = async (id, token) => {
  return http
    .get(`http://localhost:3000/povijestPosudbe/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const placenaTransakcija = async (datum, id, id_korisnika, token) => {
  return http
    .put(
      `http://localhost:3000/transakcije/${id}`,
      { datum, id_korisnika },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const dohvatiPostavke = async (token) => {
  return http
    .get(`http://localhost:3000/postavke/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const promijeniPostavke = async (data, token) => {
  return http
    .post(
      `http://localhost:3000/postavke/promijeni`,
      { ...data },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const promjeniIme = async (id, name, token) => {
  return http
    .patch(
      `http://localhost:3000/korisnici/${id}`,
      { name },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const promjeniLozinku = async (id, password, token) => {
  return http
    .put(
      `http://localhost:3000/korisnici/${id}`,
      { password },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const dohvatiDetaljeKorisnika = async (id, token) => {
  return http
    .get(`http://localhost:3000/korisnici/detaljiKorisnika/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const dohvatiDetaljeKnjige = async (id, token) => {
  return http
    .get(`http://localhost:3000/knjige/detaljiKnjige/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const dohvatiInformacijeKnjiznice = async (token) => {
  return http
    .get(`http://localhost:3000/postavke/knjiznica`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const dohvatiInformacijeKnjiznicePublic = async () => {
  return http
    .get(`http://localhost:3000/informacije`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const promijeniPostavkeKnjiznice = async (data, token) => {
  return http
    .put(
      `http://localhost:3000/postavke/knjiznicaPromjena`,
      {
        id: data.id,
        naziv: data.naziv,
        adresa: data.adresa,
        grad: data.grad,
        postanski_broj: data.postanskiBroj,
        email: data.email,
        kontakt_broj: data.kontaktBroj,
        iban: data.iban,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
      return error.request;
    });
};

const KnjigaService = {
  login,
  checkLogin,
  register,
  dodajKnjigu,
  dohvatiKorisnike,
  dohvatiKorisnika,
  promijeniUlogu,
  izbrisiKorisnika,
  get,
  getAllPublic,
  getAll,
  create,
  remove,
  update,
  pronadiPublic,
  pronadi,
  dohvatiAutore,
  dohvatiAutora,
  dodajAutora,
  urediAutora,
  izbrisiAutora,
  dohvatiNakladnike,
  dohvatiNakladnika,
  dodajNakladnika,
  urediNakladnika,
  izbrisiNakladnika,
  dohvatiZanrove,
  dohvatiZanr,
  dodajZanr,
  urediZanr,
  izbrisiZanr,
  zaduziKnjigu,
  vratiKnjigu,
  dohvatiSvePosudeneKnjige,
  dohvatiUloge,
  aktivirajRacun,
  dohvatiPlaceneTransakcije,
  dohvatiPlaceneTransakcijeKorisnika,
  dohvatiNeplaceneTransakcije,
  dohvatiPovijestPosudbe,
  placenaTransakcija,
  dohvatiPostavke,
  promijeniPostavke,
  promjeniIme,
  promjeniLozinku,
  dohvatiDetaljeKorisnika,
  dohvatiDetaljeKnjige,
  dohvatiInformacijeKnjiznice,
  dohvatiInformacijeKnjiznicePublic,
  promijeniPostavkeKnjiznice,
};

export default KnjigaService;
