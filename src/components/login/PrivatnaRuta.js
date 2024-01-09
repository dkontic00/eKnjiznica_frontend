import { useContext } from "react";
import { RacunContext } from "../../context/RacunContext";

const { Navigate, Outlet } = require("react-router-dom");

const useAuth = () => {
  console.log(RacunContext.Consumer);
  const { korisnik } = useContext(RacunContext);
  console.log(korisnik);
  return korisnik && korisnik.loggedIn;
};

const PrivatnaRuta = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivatnaRuta;
