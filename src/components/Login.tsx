import React, { useState } from "react";
import FormLogin from "./FormLogin";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";

interface DataUser {
  onSubmit: (data: { name: string; id: string }) => void;
}

const Login: React.FC<DataUser> = ({ onSubmit }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  /**iniciando validacao de usuario*/
  const handleFormSubmit = (data: { email: string; password: string }) => {
    setIsLoading(true);
    handleAuthenticate(data.email, data.password);
  };

  /**requisitando dados do usuario no login*/
  const handleAuthenticate = async (email: string, password: string) => {
    if (email === "" || password === "") {
      setIsLoading(false);
      return;
    }
    try {
      const resp = await axios.get(
        "https://655d967e9f1e1093c5998801.mockapi.io/user",
        {
          params: {
            email: email,
            password: password,
          },
        }
      );
      if (resp.data && resp.data.length > 0) {
        const user = resp.data[0];
        onSubmit({ name: user.name, id: user.id });
        navigate("/main");
      } else {
        console.log("nao foi encontrado este usuario");
        setIsLoading(false);
      }
    } catch (error) {
      console.log("erro na requisicao: " + error);
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1 className="app-name">Agenda</h1>
      <FormLogin onSubmit={handleFormSubmit} isLoading={isLoading} />
    </div>
  );
};

export default Login;
