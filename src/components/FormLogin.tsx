import React, { useState } from "react";

interface LoginProps {
  onSubmit: (data: { email: string; password: string }) => void;
  isLoading: boolean;
}

const FormLogin: React.FC<LoginProps> = ({ onSubmit, isLoading }) => {
  const emailPlaceholder: string = "digite seu email";
  const passwordPlaceholder: string = "digite sua senha";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form className="login-form-container" onSubmit={handleSubmit}>
      <input
        className="input-login"
        type="email"
        name="email"
        onChange={handleEmailChange}
        placeholder={emailPlaceholder}
      />
      <input
        className="input-login"
        type="password"
        name="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder={passwordPlaceholder}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "entrando..." : "Login"}
      </button>
      <a>esqueci minha senha</a>
      <a>criar nova conta</a>
    </form>
  );
};

export default FormLogin;
