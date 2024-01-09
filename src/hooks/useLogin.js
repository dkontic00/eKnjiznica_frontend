import { useState } from "react";
import KnjigaService from "../services/KnjigaService";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await KnjigaService.login(email, password);
      const data = response.data;
      if (response.status !== 200) {
        if (!response.data) {
          return setError("Dogodila se pogreška!");
        }
        setIsLoading(false);
        setError(data.message);
      } else {
        localStorage.setItem("user", JSON.stringify(data));
        dispatch({ type: "LOGIN", payload: data });
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return { login, isLoading, error };
};
