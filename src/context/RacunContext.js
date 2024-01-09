import { createContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import KnjigaService from "../services/KnjigaService";

export const RacunContext = createContext();

const KorisnikContext = ({ children }) => {
  const [korisnik, setKorisnik] = useState({ loggedIn: null });
  const navigate = useNavigate();

  const checkLogin = async () => {
    const response = await KnjigaService.checkLogin();
    setKorisnik(response);
    navigate("/knjige");
  };

  useEffect(() => {
    checkLogin();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <RacunContext.Provider value={{ korisnik, setKorisnik }}>
        {children}
        <Outlet />
      </RacunContext.Provider>
    </>
  );
};

export default KorisnikContext;
