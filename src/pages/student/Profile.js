import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../../context/UserContext";
import "./Profile.css";
import CvComponent from "../../components/forms/studetnRegisterForms/CvComponent";

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [legajo, setLegajo] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [cuilOrCuit, setCuilOrCuit] = useState("");
  const [githubURL, setGithubURL] = useState("");
  const [linkedinURL, setLinkedinURL] = useState("");
  const [street, setStreet] = useState("");
  const [numberStreet, setNumberStreet] = useState("");
  const [sex, setSex] = useState("");
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [location, setLocation] = useState("");
  const [personalPhone, setPersonalPhone] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [subjectsApproved, setSubjectsApproved] = useState("");
  const [specialtyPlan, setSpecialtyPlan] = useState("");
  const [currentYear, setCurrentYear] = useState("");
  const [shiftProgress, setShiftProgress] = useState("");
  const [averagesWithDeferrals, setAveragesWithDeferrals] = useState("");
  const [averagesWithoutDeferrals, setAveragesWithoutDeferrals] = useState("");
  const [studentData, setStudentData] = useState({});
  const [dataCareer, setDataCareer] = useState([]);

  const { jwt } = useContext(UserContext);
  const navigate = useNavigate();

  const errorsList = () => {
    const errorsList = [];
    if (
      !(
        githubURL &&
        linkedinURL &&
        street &&
        numberStreet &&
        sex &&
        country &&
        province &&
        location &&
        personalPhone &&
        specialty &&
        subjectsApproved &&
        specialtyPlan &&
        currentYear &&
        shiftProgress &&
        averagesWithDeferrals &&
        averagesWithoutDeferrals
      )
    ) {
      errorsList.push({ message: "Los campos deben estar completos" });
    }
    return errorsList;
  };

  useEffect(() => {
    fetch("https://localhost:7172/api/Careers", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((form) => {
        setDataCareer(form);
      });
  }, []);

  useEffect(() => {
    fetch("https://localhost:7172/api/UsersInfo/Student", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setStudentData(data);
      });
  }, [jwt]);

  useEffect(() => {
    setFirstName(studentData.firstName);
    setLastName(studentData.lastName);
    setEmail(studentData.email);
    setDocumentType(studentData.documentType);
    setDocumentNumber(studentData.dni);
    setLegajo(studentData.legajo);
    setBirthDate(studentData.birthDate);
    setCuilOrCuit(studentData.cuil);
    setGithubURL(studentData.githubProfileURL);
    setLinkedinURL(studentData.linkedinProfileURL);
    setStreet(studentData.address);
    setNumberStreet(studentData.addressNum);
    setSex(studentData.sex);
    setCountry(studentData.country);
    setProvince(studentData.province);
    setLocation(studentData.city);
    setPersonalPhone(studentData.phoneNumb);
    setSpecialty(studentData.careerId);
    setSubjectsApproved(studentData.approvedSubjets);
    setSpecialtyPlan(studentData.planDeEstudio);
    setCurrentYear(studentData.currentCareerYear);
    setShiftProgress(studentData.turn);
    setAveragesWithDeferrals(studentData.averageWithFails);
    setAveragesWithoutDeferrals(studentData.average);
  }, [studentData]);

  const inputHandler = (e) => {
    switch (e.target.id) {
      case "firstName":
        setFirstName(e.target.value);
        break;
      case "lastName":
        setLastName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "documentType":
        setDocumentType(e.target.value);
        break;
      case "documentNumber":
        setDocumentNumber(e.target.value);
        break;
      case "legajo":
        setLegajo(e.target.value);
        break;
      case "birthDate":
        setBirthDate(e.target.value);
        break;
      case "cuilOrCuit":
        setCuilOrCuit(e.target.value);
        break;
      case "githubURL":
        setGithubURL(e.target.value);
        break;
      case "linkedinURL":
        setLinkedinURL(e.target.value);
        break;
      case "street":
        setStreet(e.target.value);
        break;
      case "numberStreet":
        setNumberStreet(e.target.value);
        break;
      case "sex":
        setSex(e.target.value);
        break;
      case "country":
        setCountry(e.target.value);
        break;
      case "province":
        setProvince(e.target.value);
        break;
      case "location":
        setLocation(e.target.value);
        break;
      case "personalPhone":
        setPersonalPhone(e.target.value);
        break;
      case "specialty":
        setSpecialty(e.target.value);
        break;
      case "subjectsApproved":
        setSubjectsApproved(e.target.value);
        break;
      case "specialtyPlan":
        setSpecialtyPlan(e.target.value);
        break;
      case "currentYear":
        setCurrentYear(e.target.value);
        break;
      case "shiftProgress":
        setShiftProgress(e.target.value);
        break;
      case "averagesWithDeferrals":
        setAveragesWithDeferrals(e.target.value);
        break;
      case "averagesWithoutDeferrals":
        setAveragesWithoutDeferrals(e.target.value);
        break;
      default:
        break;
    }
  };

  const updateData = {
    GithubProfileURL: githubURL,
    LinkedinProfileURL: linkedinURL,
    Address: street,
    AddressNum: numberStreet,
    Email: email,
    Sex: sex,
    Country: country,
    Province: province,
    City: location,
    PhoneNumb: personalPhone,
    CareerId: specialty,
    ApprovedSubjets: subjectsApproved,
    PlanDeEstudio: specialtyPlan,
    CurrentCareerYear: currentYear,
    Turn: shiftProgress,
    AverageWithFails: averagesWithDeferrals,
    average: averagesWithoutDeferrals,
  };

  const dataValidation = (e) => {
    e.preventDefault();
    const errors = errorsList();
    if (errors.length === 0) {
      fetch("https://localhost:7172/api/UsersInfo/UpdateDataStudent", {
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
            navigate("/ofertas");
          }, 3000)
        )
        .catch((err) => {
          console.log(err.message);
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

  return (
    <div className="divFormProfile">
      <header></header>
      <ToastContainer className="mt-5" />
      <div className="container containProfile2">
        <div className="row">
          <div className="col-md-12 nomargin">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-13">
                    <h3 className="editarPerfilTitle">Editar Perfil</h3>
                    <hr />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 ">
                    <form className="formProfile">
                      <div className="form-group row row-cols-4">
                        <div className="col mt-5">
                          <label>Nombre</label>
                          <div>
                            <input
                              type="text"
                              name="firstName"
                              id="firstName"
                              className="form-control here"
                              readOnly
                              value={firstName}
                              onChange={inputHandler}
                            />
                          </div>
                        </div>
                        <div className="col mt-5">
                          <label>Apellido</label>
                          <div>
                            <input
                              type="text"
                              name="lastName"
                              id="lastName"
                              className="form-control here"
                              placeholder="Apellido"
                              readOnly
                              value={lastName}
                              onChange={inputHandler}
                            />
                          </div>
                        </div>
                        <div className="col mt-5">
                          <label>Email</label>
                          <div>
                            <input
                              type="text"
                              name="email"
                              id="email"
                              className="form-control here"
                              readOnly
                              value={email}
                              onChange={inputHandler}
                            />
                          </div>
                        </div>
                        <div className="col mt-4">
                          <label>Tipo y Numero de Documento</label>
                          <div>
                            <select
                              id="documentType"
                              name="documentType"
                              className="form-control here"
                              readOnly
                              value={documentType}
                              onChange={inputHandler}
                            >
                              <option value={"Seleccionar"}>Seleccionar</option>
                              <option value={"DocumentoUnico"}>
                                Documento Unico
                              </option>
                              <option value={"LibretaCivica"}>
                                Libreta Civica
                              </option>
                              <option value={"LibretaDeEnrolamiento"}>
                                Libreta de Enrolamiento
                              </option>
                              <option value={"Pasaporte"}>Pasaporte</option>
                            </select>
                            <input
                              readOnly
                              type="number"
                              name="documentNumber"
                              id="documentNumber"
                              className="form-control here"
                              value={documentNumber}
                              onChange={inputHandler}
                            />
                          </div>
                        </div>
                        <div className="col mt-4">
                          <label>Legajo</label>
                          <div>
                            <input
                              type="number"
                              name="legajo"
                              id="legajo"
                              className="form-control here"
                              readOnly
                              value={legajo}
                              onChange={inputHandler}
                            />
                          </div>
                        </div>
                        <div className="col mt-4">
                          <label>Fecha de Nacimiento</label>
                          <div>
                            <input
                              type="text"
                              name="birthDate"
                              id="birthDate"
                              className="form-control here"
                              readOnly
                              value={birthDate}
                              onChange={inputHandler}
                            />
                          </div>
                        </div>
                        <div className="col mt-4">
                          <label>Numero de Telefono</label>
                          <div>
                            <input
                              type="number"
                              name="personalPhone"
                              id="personalPhone"
                              className="form-control here"
                              value={personalPhone}
                              onChange={inputHandler}
                            />
                          </div>
                        </div>
                        <div className="col mt-4">
                          <label>CUIL O CUIT</label>
                          <div>
                            <input
                              type="number"
                              name="cuilOrCuit"
                              id="cuilOrCuit"
                              className="form-control here"
                              readOnly
                              value={cuilOrCuit}
                              placeholder="(Sin guiones)"
                              onChange={inputHandler}
                            />
                          </div>
                        </div>
                        <div className="col mt-4">
                          <label>URL Perfil Linkedin</label>
                          <div>
                            <input
                              type="text"
                              name="linkedinURL"
                              id="linkedinURL"
                              className="form-control here"
                              value={linkedinURL}
                              onChange={inputHandler}
                            />
                          </div>
                        </div>
                        <div className="col mt-4">
                          <label>URL Perfil Github</label>
                          <div>
                            <input
                              type="text"
                              name="githubURL"
                              id="githubURL"
                              className="form-control here"
                              value={githubURL}
                              onChange={inputHandler}
                            />
                          </div>
                        </div>
                        <div className="col mt-4">
                          <label>Calle</label>
                          <div>
                            <input
                              type="text"
                              name="street"
                              id="street"
                              className="form-control here"
                              value={street}
                              onChange={inputHandler}
                            />
                          </div>
                        </div>
                        <div className="col mt-4">
                          <label>Numero de Calle</label>
                          <div>
                            <input
                              type="number"
                              name="numberStreet"
                              id="numberStreet"
                              className="form-control here"
                              value={numberStreet}
                              onChange={inputHandler}
                            />
                          </div>
                        </div>
                        <div className="col mt-4">
                          <label>Sexo</label>
                          <div>
                            <input
                              type="text"
                              name="sex"
                              id="sex"
                              className="form-control here"
                              value={sex}
                              onChange={inputHandler}
                            />
                          </div>
                        </div>
                        <CvComponent />
                        <div className="col mt-4">
                          <label>Pais</label>
                          <div>
                            <input
                              type="text"
                              name="country"
                              id="country"
                              className="form-control here"
                              value={country}
                              onChange={inputHandler}
                            />
                          </div>
                        </div>
                        <div className="col mt-4">
                          <label>Provincia</label>
                          <div>
                            <input
                              type="text"
                              name="province"
                              id="province"
                              className="form-control here"
                              value={province}
                              onChange={inputHandler}
                            />
                          </div>
                        </div>
                        <div className="col mt-4">
                          <label>Localidad</label>
                          <div>
                            <input
                              type="text"
                              name="location"
                              id="location"
                              className="form-control here"
                              value={location}
                              onChange={inputHandler}
                            />
                          </div>
                        </div>
                        <div className="col mt-4">
                          <label>Especialidad</label>
                          <div>
                            <select
                              type="number"
                              name="specialty"
                              id="specialty"
                              className="form-control here"
                              value={specialty}
                              onChange={inputHandler}
                            >
                              <option value={"Seleccionar"}>Seleccionar</option>
                              {dataCareer.map((career) => (
                                <option key={career.id} value={career.id}>
                                  {career.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col mt-4">
                          <label>Materias aprobadas</label>
                          <div>
                            <input
                              type="number"
                              name="subjectsApproved"
                              id="subjectsApproved"
                              className="form-control here"
                              value={subjectsApproved}
                              onChange={inputHandler}
                            />
                          </div>
                        </div>
                        <div className="col mt-4">
                          <label>Plan Especialidad</label>
                          <div>
                            <input
                              type="text"
                              name="specialtyPlan"
                              id="specialtyPlan"
                              className="form-control here"
                              value={specialtyPlan}
                              onChange={inputHandler}
                            />
                          </div>
                        </div>
                        <div className="col mt-4">
                          <label>Año que Cursa</label>
                          <div>
                            <input
                              type="number"
                              name="currentYear"
                              id="currentYear"
                              className="form-control here"
                              value={currentYear}
                              onChange={inputHandler}
                            />
                          </div>
                        </div>
                        <div className="col mt-4">
                          <label>Turno que cursa</label>
                          <div>
                            <select
                              id="shiftProgress"
                              name="shiftProgress"
                              className="form-control here"
                              value={shiftProgress}
                              onChange={inputHandler}
                            >
                              <option value={"Seleccionar"}>Seleccionar</option>
                              <option value={"Mañana"}>Mañana</option>
                              <option value={"Tarde"}>Tarde</option>
                              <option value={"Noche"}>Noche</option>
                            </select>
                          </div>
                        </div>
                        <div className="coll mt-4">
                          <label>Promedio con Aplazos</label>
                          <div>
                            <input
                              type="number"
                              name="averagesWithDeferrals"
                              id="averagesWithDeferrals"
                              className="form-control here"
                              value={averagesWithDeferrals}
                              onChange={inputHandler}
                            />
                          </div>
                        </div>
                        <div className="col mt-4">
                          <label>Promedio sin Aplazos</label>
                          <div>
                            <input
                              type="number"
                              name="averagesWithoutDeferrals"
                              id="averagesWithoutDeferrals"
                              className="form-control here"
                              value={averagesWithoutDeferrals}
                              onChange={inputHandler}
                            />
                          </div>
                        </div>
                        <div className="col-11">
                          <div className="mt-5">
                            <button onClick={dataValidation} className="button">
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

export default Profile;
