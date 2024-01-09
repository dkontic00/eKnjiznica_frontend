import { useState } from "react";
import KnjigaService from "../services/KnjigaService";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const navigate = useNavigate();

  const register = async (name, email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await KnjigaService.register(name, email, password);
      if (!response.data) {
        return setError("Dogodila se pogreška!");
      }
      const data = response.data;
      console.log(response);
      if (response.status !== 200) {
        setIsLoading(false);
        setError(data.message);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return { register, isLoading, error };
};
