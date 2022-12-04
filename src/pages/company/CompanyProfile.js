import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./CompanyProfile.css";
import "../../components/forms/Forms.css";

const CompanyProfile = () => {
  const [businessName, setBusinessName] = useState("");
  const [postalCode, setPostalcode] = useState();
  const [cuit, setCuit] = useState();
  const [telephoneNumber, setTelephoneNumber] = useState();
  const [sector, setSector] = useState("");
  const [webURL, setWebURL] = useState("");
  const [legalAdress, setLegalAdress] = useState("");
  const [nameContact, setNameContact] = useState("");
  const [lastnameContact, setLastnameContact] = useState();
  const [emailContact, setEmailContact] = useState("");
  const [positionContact, setPositionContact] = useState("");
  const [telephoneNumberContact, setTelephoneNumberContact] = useState("");
  const [relWithCompanyContact, setRelWithCompanyContact] = useState("");
  const [companyData, setCompanyData] = useState({});

  const { jwt } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://localhost:7172/api/UsersInfo/Company", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setCompanyData(data));
  }, [jwt]);

  useEffect(() => {
    setBusinessName(companyData.companyName);
    setPostalcode(companyData.postalCode);
    setCuit(companyData.cuit);
    setTelephoneNumber(companyData.telephoneNumber);
    setSector(companyData.sector);
    setWebURL(companyData.web);
    setLegalAdress(companyData.legalAdress);
    setNameContact(companyData.recruiterName);
    setLastnameContact(companyData.recruiterLastName);
    setEmailContact(companyData.recruiterEmail);
    setPositionContact(companyData.recruiterPosition);
    setTelephoneNumberContact(companyData.recruiterPhoneNumber);
    setRelWithCompanyContact(companyData.recruiterRelWithCompany);
  }, [companyData]);

  const inputHandler = (e) => {
    switch (e.target.id) {
      case "businessName":
        setBusinessName(e.target.value);
        break;
      case "postalCode":
        setPostalcode(e.target.value);
        break;
      case "cuit":
        setCuit(e.target.value);
        break;
      case "telephoneNumber":
        setTelephoneNumber(e.target.value);
        break;
      case "sector":
        setSector(e.target.value);
        break;
      case "webURL":
        setWebURL(e.target.value);
        break;
      case "legalAdress":
        setLegalAdress(e.target.value);
        break;
      case "nameContact":
        setNameContact(e.target.value);
        break;
      case "lastnameContact":
        setLastnameContact(e.target.value);
        break;
      case "emailContact":
        setEmailContact(e.target.value);
        break;
      case "positionContact":
        setPositionContact(e.target.value);
        break;
      case "telephoneNumberContact":
        setTelephoneNumberContact(e.target.value);
        break;
      case "relWithCompanyContact":
        setRelWithCompanyContact(e.target.value);
        break;
      default:
        break;
    }
  };

  const updateData = {
    PostalCode: postalCode,
    Cuit: cuit,
    TelephoneNumber: telephoneNumber,
    Sector: sector,
    Web: webURL,
    LegalAdress: legalAdress,
    RecruiterName: nameContact,
    RecruiterLastName: lastnameContact,
    RecruiterEmail: emailContact,
    RecruiterPosition: positionContact,
    RecruiterPhoneNumber: telephoneNumberContact,
    RecruiterRelWithCompany: relWithCompanyContact,
  };

  const SaveChangesBtn = (e) => {
    e.preventDefault();
    if (
      postalCode &&
      sector &&
      telephoneNumber &&
      legalAdress &&
      nameContact &&
      lastnameContact &&
      positionContact &&
      telephoneNumberContact &&
      relWithCompanyContact
    ) {
      if (
        emailContact
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) {
        fetch("https://localhost:7172/api/UsersInfo/UpdateDataCompany", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify(updateData),
        })
          .then((res) => res.json())
          .then(
            toast("Los cambios han sido guardados exitosamente", {
              autoClose: 3000,
              hideProgressBar: false,
              type: "success",
              theme: "dark",
              position: toast.POSITION.TOP_LEFT,
            })
          )
          .then(
            setTimeout(() => {
              navigate("/crearOferta");
            }, 3000)
          )
          .catch((err) => {
            console.log(err.message);
          });
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
      toast("Complete todos los campos", {
        autoClose: 3000,
        hideProgressBar: false,
        type: "warning",
        theme: "dark",
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };

  return (
    <div className="divFormProfileCompany">
      <header></header>
      <ToastContainer className="mt-5" />
      <div className="container containProfile">
        <div className="row mt-5">
          <div className="col-md-12 colmd12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-13">
                    <h3>Editar Perfil</h3>
                    <hr />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <form className="formCompanyData">
                      <div className="row row-cols-3">
                        <div className="col">
                          <label>Razon Social</label>
                          <div>
                            <input
                              className="form-control here"
                              readOnly
                              type="text"
                              id="businessName"
                              onChange={inputHandler}
                              value={businessName}
                            />
                          </div>
                        </div>
                        <div className="col">
                          <label>Codigo Postal</label>
                          <div>
                            <input
                              className="form-control here"
                              type="number"
                              id="postalCode"
                              onChange={inputHandler}
                              value={postalCode}
                            />
                          </div>
                        </div>
                        <div className="col">
                          <label>CUIT</label>
                          <div>
                            <input
                              className="form-control here"
                              type="number"
                              placeholder="(Sin guiones)"
                              readOnly
                              id="cuit"
                              onChange={inputHandler}
                              value={cuit}
                            />
                          </div>
                        </div>
                        <div className="col mt-4">
                          <label>Telefono</label>
                          <div>
                            <input
                              className="form-control here"
                              type="number"
                              id="telephoneNumber"
                              placeholder="Codigo de area + numero"
                              onChange={inputHandler}
                              value={telephoneNumber}
                            />
                          </div>
                        </div>
                        <div className="col mt-4">
                          <label>Rubro</label>
                          <div>
                            <input
                              className="form-control here"
                              type="text"
                              id="sector"
                              onChange={inputHandler}
                              value={sector}
                            />
                          </div>
                        </div>
                        <div className="col mt-4">
                          <label>Domicilio Legal</label>
                          <div>
                            <input
                              className="form-control here"
                              type="text"
                              id="legalAdress"
                              onChange={inputHandler}
                              value={legalAdress}
                            />
                          </div>
                        </div>
                        <div className="col mt-4">
                          <label>Web (opcional)</label>
                          <div>
                            <input
                              className="form-control here"
                              type="text"
                              id="webURL"
                              onChange={inputHandler}
                              value={webURL}
                            />
                          </div>
                        </div>
                        <div className="col mt-4">
                          <label>Nombres del Contacto</label>
                          <div>
                            <input
                              className="form-control here"
                              type="text"
                              id="nameContact"
                              onChange={inputHandler}
                              value={nameContact}
                            />
                          </div>
                        </div>
                        <div className="col mt-4">
                          <label>Apellido del Contacto</label>
                          <div>
                            <input
                              className="form-control here"
                              type="text"
                              id="lastnameContact"
                              onChange={inputHandler}
                              value={lastnameContact}
                            />
                          </div>
                        </div>
                        <div className="col mt-4">
                          <label>Email de Contacto</label>
                          <div>
                            <input
                              className="form-control here"
                              type="email"
                              id="emailContact"
                              onChange={inputHandler}
                              value={emailContact}
                            />
                          </div>
                        </div>
                        <div className="col mt-4">
                          <label>Puesto / Cargo del Contacto</label>
                          <div>
                            <input
                              className="form-control here"
                              type="text"
                              id="positionContact"
                              onChange={inputHandler}
                              value={positionContact}
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
                              id="telephoneNumberContact"
                              onChange={inputHandler}
                              value={telephoneNumberContact}
                            />
                          </div>
                        </div>
                        <div className="col mt-4">
                          <label>Relacion con la Empresa</label>
                          <div>
                            <select
                              id="relWithCompanyContact"
                              className="form-control here"
                              name="relWithCompanyContact"
                              value={relWithCompanyContact}
                              onChange={inputHandler}
                            >
                              <option value={"Seleccionar"}>Seleccionar</option>
                              <option value={"inCompany"}>
                                Trabajo en la empresa
                              </option>
                              <option value={"outCompany"}>
                                Trabajo en una consultora
                              </option>
                            </select>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className=" mt-5">
                            <button onClick={SaveChangesBtn} className="btn">
                              Guardar Cambios
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

export default CompanyProfile;
