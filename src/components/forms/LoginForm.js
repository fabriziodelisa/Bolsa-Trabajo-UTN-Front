import { useState, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import "./Forms.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import utnLogo from "../../assets/logo-utn.png";

const LoginForm = ({ h1Text, btnText, linkToText, linkTo, left }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { jwt, setJwt, setRole, setActive } = useContext(UserContext);
  const navigate = useNavigate();
  let passwordRegExp = /^[A-Za-z]\w{7,14}$/;

  const errorsList = () => {
    const errorsList = [];
    if (
      !String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      errorsList.push({ message: "Ingrese un email válido" });
    }
    if (passwordRegExp.test(password)) {
      errorsList.push({
        message:
          "La contraseña debe contener al menos 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 caracter especial",
      });
    }
    return errorsList;
  };

  const dataValidation = (e) => {
    e.preventDefault();
    const errors = errorsList();
    if (errors.length === 0) {
      fetch("https://localhost:7172/api/Authentication/Authenticate", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((r) => r.json())
        .then((r) => {
          if (r.success) {
            window.sessionStorage.setItem('jwt', r.token);
            window.sessionStorage.setItem('role', r.roles[0]);
            window.sessionStorage.setItem('active', r.activeAccount);
            setJwt(r.token);
            setRole(r.roles[0]);
            setActive(r.activeAccount);
            if (r.firstChargeData) {
              if (r.roles[0] === "Student") {
                navigate('/ofertas');
              } else if (r.roles[0] === "Company") {
                navigate('/misOfertas');
              } else {
                navigate('/adminDashboard');
              }
            } else {
              if (r.roles[0] === "Student") {
                navigate('/datosAlumno');
              } else if (r.roles[0] === "Company") {
                navigate('/datosEmpresa');
              } else {
                navigate('/adminDashboard');
              }
            }
          } else {
            window.sessionStorage.removeItem("jwt");
            window.sessionStorage.removeItem("role");
            toast(r.message, {
              autoClose: 3000,
              hideProgressBar: false,
              type: "error",
              theme: "dark",
              position: toast.POSITION.TOP_LEFT,
            });
          }
        })
        .catch((err) => {
          window.sessionStorage.removeItem("jwt");
          window.sessionStorage.removeItem("role");
          console.log(err);
        });
    } else {
      errors.forEach((error) => {
        toast(error.message, {
          autoClose: 3000,
          hideProgressBar: false,
          type: "error",
          theme: "dark",
          position: toast.POSITION.TOP_LEFT,
        });
      });
    }
  };

  const inputHandler = (e) => {
    switch (e.target.id) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <ToastContainer className="mt-5" />
      {jwt && <Navigate replace to="/ofertas" />}
      {left ? (
        <div className="wrapper">
          <figure>
            <img src={utnLogo} alt="UTN Logo" className="main-logo" />
          </figure>
        </div>
      ) : (
        ""
      )}
      <div id="wrapper" className="wrapper wrapper-dark">
        <div className="text-center mt-4 name">{h1Text}</div>
        <form className="pb-3 mt-3">
          <div className="form-field d-flex align-items-center justify-content-center">
            <span className="far fa-user"></span>
            <input
              className="login-input"
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Email"
              onChange={inputHandler}
            />
          </div>
          <div className="form-field d-flex align-items-center justify-content-center">
            <span className="fas fa-key"></span>
            <input
              className="login-input"
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="Contraseña"
              onChange={inputHandler}
            />
          </div>
          <button onClick={dataValidation} className="button mt-3">
            {btnText}
          </button>
        </form>
        <div className="text-center fs-6">
          <Link to={linkTo}>{linkToText}</Link>
        </div>
      </div>
      {left ? (
        ""
      ) : (
        <div className="wrapper">
          <figure>
            <img src={utnLogo} alt="UTN Logo" className="main-logo" />
          </figure>
        </div>
      )}
    </>
  );
};

export default LoginForm;
