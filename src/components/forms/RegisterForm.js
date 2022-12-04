import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Forms.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import utnLogo from "../../assets/logo-utn.png";

const RegisterForm = ({ h1Text, btnText, linkToText, linkTo, left }) => {
  const [isStudent, setIsStudent] = useState(true);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [legajo, setLegajo] = useState(null);
  const [company, setCompany] = useState("");
  const [cuit, setCuit] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let passwordRegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const navigate = useNavigate();

  const errorsList = () => {
    const errorsList = [];
    if (company === "" && !isStudent) {
      errorsList.push({ message: "Ingrese la razón social de su empresa" });
    }
    if (legajo === null && isStudent) {
      errorsList.push({ message: "El Legajo debe ser un número" });
    }
    if (cuit === "" && !isStudent ) {
      errorsList.push({ message: "El cuit debe ser un número" });
    }
    if ((firstname === "" || lastname === "") && isStudent) {
      errorsList.push({ message: "Ingrese su nombre y apellido" });
    }
    if (
      !String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) 
    ) {
      errorsList.push({ message: "Ingrese un email válido" });
    }
    if (!passwordRegExp.test(password)) {
      errorsList.push({
        message:
          "La contraseña debe contener al menos 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 caracter especial",
      });
    }
    if (password !== confirmPassword) {
      errorsList.push({ message: "Ambas contraseñas deben coincidir" });
    }
    return errorsList;
  };

  const dataValidation = (e) => {
    e.preventDefault();
    const errors = errorsList();
    if (errors.length === 0) {
      registerUser();
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

  const registerUser = () => {
    if (isStudent) {
      fetch("https://localhost:7172/api/Register/RegisterStudent", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          legajo: legajo,
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
          confirmpassword: confirmPassword,
        }),
      })
        .then((r) => r.json())
        .then((res) => {
          toast('Te has registrado correctamente', {
            autoClose: 3000,
            hideProgressBar: false,
            type: "success",
            theme: "dark",
            position: toast.POSITION.TOP_LEFT,
          });
          setTimeout(() => {
            navigate('/ingreso');
          }, 3000);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      fetch("https://localhost:7172/api/Register/RegisterCompany", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          companyName: company,
          cuit: parseInt(cuit),
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        }),
      })
        .then((r) => r.json())
        .then((res) => {
          toast('Te has registrado correctamente', {
            autoClose: 3000,
            hideProgressBar: false,
            type: "success",
            theme: "dark",
            position: toast.POSITION.TOP_LEFT,
          });
          setTimeout(() => {
            navigate('/ingreso');
          }, 3000);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const inputHandler = (e) => {
    switch (e.target.id) {
      case "firstname":
        setFirstname(e.target.value);
        break;
      case "lastname":
        setLastname(e.target.value);
        break;
      case "legajo":
        setLegajo(e.target.value);
        break;
      case "company":
        setCompany(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "confirm-password":
        setConfirmPassword(e.target.value);
        break;
      case "cuit":
        setCuit(e.target.value);
        break;
      case "typeUser":
        if (e.target.value === "alumno") {
          setIsStudent(true);
        } else {
          setIsStudent(false);
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <ToastContainer className="mt-5" />
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
            <select
              id="typeUser"
              name="typeUser"
              select={isStudent}
              onChange={inputHandler}
            >
              <option value="alumno">Soy alumno</option>
              <option value="empresa">Soy empresa</option>
            </select>
          </div>
          {isStudent ? (
            <div className="form-field d-flex align-items-center justify-content-center">
              <input
                type="text"
                name="firstname"
                id="firstname"
                value={firstname}
                placeholder="Nombre"
                onChange={inputHandler}
              />
              <input
                type="text"
                name="lastname"
                id="lastname"
                value={lastname}
                placeholder="Apellido"
                onChange={inputHandler}
              />
            </div>
          ) : (
            <div className="form-field d-flex align-items-center justify-content-center">
              <input
                type="number"
                name="cuit"
                id="cuit"
                value={cuit}
                placeholder="Cuit"
                onChange={inputHandler}
              />
              <input
                type="text"
                name="company"
                id="company"
                value={company}
                placeholder="Razon Social"
                onChange={inputHandler}
              />
            </div>
          )}
          <div className="form-field d-flex align-items-center justify-content-center">
            {isStudent && (
              <input
                type="text"
                name="legajo"
                id="legajo"
                value={legajo}
                placeholder="Legajo"
                onChange={inputHandler}
              />
            )}
            <input
              style={{ width: isStudent ? '50%' : '100%' }}
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Email"
              onChange={inputHandler}
            />
          </div>
          <div className="form-field d-flex align-items-center justify-content-center">
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="Contraseña"
              onChange={inputHandler}
            />
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
              value={confirmPassword}
              placeholder="Confirmar contraseña"
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
      </div >
      {
        left ? (
          ""
        ) : (
          <div className="wrapper">
            <figure>
              <img src={utnLogo} alt="UTN Logo" className="main-logo" />
            </figure >
          </div >
        )}
    </>
  );
};

export default RegisterForm;
