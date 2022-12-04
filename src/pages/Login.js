import React from "react";
import LoginForm from "../components/forms/LoginForm";

const Login = () => {
  return (
    <div className="div-wrapper">
      <LoginForm
        h1Text="Iniciar sesión"
        btnText="Ingresar"
        linkToText="Aún no tengo cuenta"
        linkTo="/registro"
        left={false}
      />
    </div>
  );
};

export default Login;
