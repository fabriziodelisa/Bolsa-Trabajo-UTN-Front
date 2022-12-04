import { useState, useEffect, useContext } from "react";
import "../../components/forms/Forms.css";
import "./AddJobPosition.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../../context/UserContext";
import ModalDescription from "./addJobPosition/ModalDescription";

const AddJobPosition = () => {
  const { jwt, active } = useContext(UserContext);
  const [careers, setCareers] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [location, setLocation] = useState("");
  const [positionsToCover, setPositionsToCover] = useState(null);
  const [startDate, setStartDate] = useState("0000-00-00");
  const [endDate, setEndDate] = useState("0000-00-00");
  const [careerId, setCareerId] = useState(null);
  const [workDay, setWorkDay] = useState(0);
  const [jobType, setJobType] = useState(0);
  const [frameworkAgreement, setFrameworkAgreement] = useState(false);
  const [showModalDescription, setShowModalDescription] = useState(false);

  const validation = () => {
    return positionsToCover === null || startDate === "0000-00-00" || (endDate === "0000-00-00" && jobType === 0) || careerId === null || (workDay === null && jobType === 1) || jobType === null;
  }

  useEffect(() => {
    fetch("https://localhost:7172/api/Careers/", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt}`
      },
    })
      .then((r) => r.json())
      .then((res) => {
        setCareers(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [jwt]);

  const createJobPosition = (e) => {
    e.preventDefault();
    if (validation()) {
      toast("Ingrese los datos correctamente", {
        autoClose: 3000,
        hideProgressBar: false,
        type: "warning",
        theme: "dark",
        position: toast.POSITION.TOP_LEFT,
      });
    } else {
      fetch("https://localhost:7172/api/JobPosition/AddJobPosition", {
        method: 'POST',
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          jobTitle: jobTitle,
          jobDescription: jobDescription,
          location: location,
          careerId: careerId,
          positionsToCover: positionsToCover,
          frameworkAgreement: frameworkAgreement,
          startDate: startDate,
          endDate: jobType === 0 ? endDate : startDate,
          jobType: jobType,
          workDay: workDay,
          activeAccount: active,
        }),
      })
        .then((r) => r.json())
        .then((res) => {
          if (res.success) {
            toast(res.message, {
              autoClose: 3000,
              hideProgressBar: false,
              type: "success",
              theme: "dark",
              position: toast.POSITION.TOP_LEFT,
            });
          } else {
            toast(res.message, {
              autoClose: 3000,
              hideProgressBar: false,
              type: "warning",
              theme: "dark",
              position: toast.POSITION.TOP_LEFT,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const inputHandler = (e) => {
    switch (e.target.id) {
      case "jobType":
        console.log(e.target.value);
        console.log(e.target.id);
        setJobType(parseInt(e.target.value));
        break;
      case "jobTitle":
        setJobTitle(e.target.value);
        break;
      case "jobDescription":
        setJobDescription(e.target.value);
        break;
      case "location":
        setLocation(e.target.value);
        break;
      case "positionsToCover":
        setPositionsToCover(parseInt(e.target.value));
        break;
      case "startDate":
        setStartDate(e.target.value);
        break;
      case "endDate":
        setEndDate(e.target.value);
        break;
      case "careerId":
        setCareerId(parseInt(e.target.value));
        break;
      case "workDay":
        setWorkDay(parseInt(e.target.value));
        break;
      case "frameworkAgreement":
        setFrameworkAgreement(e.target.checked);
        break;
      default:
        break;
    }
  };

  const showModal = (e) => {
    e.preventDefault();
    setShowModalDescription(true);
  }

  return (
    <div className="container-fluid main">
      <ToastContainer className="mt-5" />
      <ModalDescription value={jobDescription} inputHandler={inputHandler} show={showModalDescription} setShowModalDescription={setShowModalDescription} />
      <div id="wrapper" className="wrapper wrapper-addJobPosition">
        <h3>Crear oferta laboral</h3>
        <form>
          <div className="form-field d-flex flex-column align-items-center justify-content-center">
            <label htmlFor="jobType" className="my-1">Tipo de contrato</label>
            <select
              id="jobType"
              name="jobType"
              select={jobType}
              onChange={inputHandler}
            >
              <option id={0} value={0}>Pasantía</option>
              <option id={1} value={1}>Relación de Dependencia</option>
            </select>
          </div>
          <div className="form-field d-flex align-items-center justify-content-center">
            <input
              type="text"
              name="jobTitle"
              id="jobTitle"
              value={jobTitle}
              placeholder="Título del puesto"
              onChange={inputHandler}
            />
            <input
              type="text"
              name="location"
              id="location"
              value={location}
              placeholder="Lugar de trabajo"
              onChange={inputHandler}
            />
          </div>
          <div className="form-field d-flex align-items-center justify-content-center">
            <div className="w-50 d-flex flex-column justify-content-center align-items-center mx-1">
              <label htmlFor="startDate">Fecha de inicio</label>
              <input
                type="date"
                name="startDate"
                id="startDate"
                className="w-100"
                value={startDate}
                placeholder="Fecha de inicio"
                onChange={inputHandler}
              />
            </div>
            {jobType === 0 ? (
              <div className="w-50 d-flex flex-column justify-content-center align-items-center mx-1">
                <label htmlFor="endDate">Fecha de fin</label>
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  value={endDate}
                  className="w-100"
                  placeholder="Fecha de fin"
                  onChange={inputHandler}
                />
              </div>
            ) : (
              <input
                type="number"
                name="positionsToCover"
                id="positionsToCover"
                className={jobType === 0 ? "positionsToCoverWhenInternship" : "positionsToCoverWhenEmployment"}
                value={positionsToCover}
                placeholder="Posiciones a cubrir"
                onChange={inputHandler}
              />
            )}
          </div>
          <div className="form-field d-flex align-items-center justify-content-center">
            <select
              id="careerId"
              name="careerId"
              select={careerId}
              onChange={inputHandler}
            >
              <option value={null}>Carrera</option>
              {careers.map((career) => {
                return <option key={career.id} value={career.id}>{career.name}</option>
              })}
            </select>
            {jobType === 0 ? (
              <input
                type="number"
                name="positionsToCover"
                id="positionsToCover"
                value={positionsToCover}
                placeholder="Posiciones a cubrir"
                onChange={inputHandler}
              />
            ) : (
              <select
                id="workDay"
                name="workDay"
                select={workDay}
                onChange={inputHandler}
              >
                <option value={0}>Jornada laboral</option>
                <option value={0}>Tiempo completo</option>
                <option value={1}>Tiempo parcial</option>
              </select>
            )}
          </div>
          {jobType === 0 && (
            <div className="form-field d-flex align-items-center justify-content-start" style={{ margin: '0 0 15px 0' }}>
              <label htmlFor="frameworkAgreement">¿Tiene un convenio marco firmado por la UTN?</label>
              <input type="checkbox" name="frameworkAgreement" id="frameworkAgreement" value={frameworkAgreement} onChange={inputHandler} />
            </div>
          )}
          <div className="form-field d-flex justify-content-center align-items-center">
            <button onClick={showModal} className="description-button button mt-3">
              Mostrar descripción
            </button>
            <button onClick={createJobPosition} className="button mt-3">
              Agregar oferta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJobPosition;
