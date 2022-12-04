import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./CompanyData.css";
import "react-toastify/dist/ReactToastify.css";

const CompanyDataPag1 = ({ setBoolPage2, UpdateData }) => {
  const [postalCode, setPostalcode] = useState("");
  const [cuit, setCuit] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [sector, setSector] = useState("");
  const [webURL, setWebURL] = useState("");
  const [legalAdress, setLegalAdress] = useState("");

  const inputHandler = (e) => {
    switch (e.target.id) {
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
      default:
        break;
    }
  };

  const datos = {
    PostalCode: postalCode,
    Cuit: cuit,
    TelephoneNumber: telephoneNumber,
    Sector: sector,
    Web: webURL,
    LegalAdress: legalAdress,
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      postalCode &&
      cuit &&
      telephoneNumber &&
      sector &&
      legalAdress
    ) {
      setBoolPage2(true);
      UpdateData(datos);
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
    <div className="divFormCompanyData">
      <header></header>
      <div className="container">
        <ToastContainer className="mt-5" />
        <div className="row  d-flex justify-content-center">
          <div className="col-md-12 companyData">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-13">
                    <h3>Complete los datos de la empresa</h3>
                    <hr />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <form className="formCompanyData">
                      <div class="row row-cols-3">
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
                              id="cuit"
                              onChange={inputHandler}
                              value={cuit}
                            />
                          </div>
                        </div>
                        <div className="col">
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
                        <div className="col-12">
                          <div className="mt-5">
                            <button onClick={submitHandler} className="button">
                              Guardar y Continuar
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

export default CompanyDataPag1;
