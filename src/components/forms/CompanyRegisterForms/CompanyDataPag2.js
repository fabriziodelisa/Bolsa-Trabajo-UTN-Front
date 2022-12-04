import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./CompanyDataPag2.css";

const CompanyDataPag2 = ({ UpdateData, setSuccessfulCharge }) => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [relWithCompany, setRelWithCompany] = useState("");

  const navigate = useNavigate();

  const inputHandler = (e) => {
    switch (e.target.id) {
      case "name":
        setName(e.target.value);
        break;
      case "lastname":
        setLastname(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "position":
        setPosition(e.target.value);
        break;
      case "telephoneNumber":
        setTelephoneNumber(e.target.value);
        break;
      case "relWithCompany":
        setRelWithCompany(e.target.value);
        break;
      default:
        break;
    }
  };

  const datos2 = {
    RecruiterName: name,
    RecruiterLastName: lastname,
    RecruiterEmail: email,
    RecruiterPosition: position,
    RecruiterPhoneNumber: telephoneNumber,
    RecruiterRelWithCompany: relWithCompany,
    FirstChargeData: true,
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (name && lastname && position && telephoneNumber && relWithCompany) {
      if (
        email
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) {
        UpdateData(datos2);
        setTimeout(() => {
          navigate("/crearOferta");
        }, 3000);

        toast("Los datos han sido cargados exitosamente", {
          autoClose: 3000,
          hideProgressBar: false,
          type: "success",
          theme: "dark",
          position: toast.POSITION.TOP_LEFT,
        });
        toast(
          "Los datos seran validados por administración para su aprobación",
          {
            autoClose: 5000,
            hideProgressBar: false,
            type: "info",
            theme: "dark",
            position: toast.POSITION.TOP_LEFT,
          }
        );
      } else {
        toast("Ingrese un email valido", {
          autoClose: 3000,
          hideProgressBar: false,
          type: "error",
          theme: "dark",
          position: toast.POSITION.TOP_LEFT,
        });
      }
    } else {
      toast("Los campos son oligatorios", {
        autoClose: 3000,
        hideProgressBar: false,
        type: "warning",
        theme: "dark",
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };

  return (
    <div className="divFormCompanyDataPag2">
      <header></header>
      <div className="container">
        <ToastContainer className="mt-5" />
        <div className="row">
          <div className="col-md-12 companyData">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-13">
                    <h3>Complete los datos de contacto</h3>
                    <hr />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <form className="formCompanyData">
                      <div class="row row-cols-3">
                        <div className="col">
                          <label>Nombres del Contacto</label>
                          <div>
                            <input
                              className="form-control here"
                              type="text"
                              id="name"
                              onChange={inputHandler}
                              value={name}
                            />
                          </div>
                        </div>
                        <div className="col">
                          <label>Apellido del Contacto</label>
                          <div>
                            <input
                              className="form-control here"
                              type="text"
                              id="lastname"
                              onChange={inputHandler}
                              value={lastname}
                            />
                          </div>
                        </div>
                        <div className="col">
                          <label>Email de Contacto</label>
                          <div>
                            <input
                              className="form-control here"
                              type="email"
                              id="email"
                              onChange={inputHandler}
                              value={email}
                            />
                          </div>
                        </div>
                        <div className="col mt-4">
                          <label>Puesto / Cargo del Contacto</label>
                          <div>
                            <input
                              className="form-control here"
                              type="text"
                              id="position"
                              onChange={inputHandler}
                              value={position}
                            />
                          </div>
                        </div>
                        <div className="col mt-4">
                          <label>Telefono del Contacto</label>
                          <div>
                            <input
                              className="form-control here"
                              type="number"
                              placeholder="Codigo de area + número"
                              id="telephoneNumber"
                              onChange={inputHandler}
                              value={telephoneNumber}
                            />
                          </div>
                        </div>
                        <div className="col mt-4">
                          <label>Relacion con la Empresa</label>
                          <div>
                            <select
                              id="relWithCompany"
                              className="form-control here"
                              name="relWithCompany"
                              value={relWithCompany}
                              onChange={inputHandler}
                            >
                              <option value={"Seleccionar"}>Seleccionar</option>
                              <option value={0}>Trabajo en la empresa</option>
                              <option value={1}>
                                Trabajo en una consultora
                              </option>
                            </select>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="mt-5">
                            <button onClick={submitHandler} className="button">
                              Guardar e Ingresar
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDataPag2;
