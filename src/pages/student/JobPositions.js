import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import "./JobPositions.css";
import UserContext from "../../context/UserContext";
import { toast, ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faLocationDot, faBriefcase, faBusinessTime, faCalendarDays, faPerson } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithubSquare } from '@fortawesome/free-brands-svg-icons';

const JobPositions = () => {
  const { jwt, role, active } = useContext(UserContext);
  const [jobPositions, setJobPositions] = useState([]);
  const [selectedJobPosition, setSelectedJobPosition] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [modalShow, setModalShow] = useState(false);
  let firstEnter = useRef(false);

  useEffect(() => {
    if (role === "Student") {
      fetch('https://localhost:7172/api/JobPosition/GetAllJobPositions', {
        method: 'GET',
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
        .then((r) => r.json())
        .then((r) => {
          if (r.success) {
            setJobPositions(r.data);
          }
        });
    } else if (role === "Company") {
      fetch('https://localhost:7172/api/JobPosition/GetCompanyJobPositions', {
        method: 'GET',
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
        .then((r) => r.json())
        .then((r) => {
          if (r.success) {
            setJobPositions(r.data);
          }
        });
    }
  }, [jwt, role]);

  const onSelectJobPosition = useCallback(
    (id) => {
      if (jobPositions.length !== 0) {
        setSelectedJobPosition(jobPositions.find(x => x.id === id));
      }
    }, [jobPositions]);

  useEffect(() => {
    if (!firstEnter.current && jobPositions.length !== 0) {
      setSelectedJobPosition(jobPositions[0]);
      console.log(jobPositions);
      firstEnter.current = true;
    }
  }, [jobPositions, selectedJobPosition, setSelectedJobPosition]);

  const handleInput = (e) => {
    switch (e.target.id) {
      case 'search-text':
        setSearchText(e.target.value);
        break;
      default:
        break;
    }
  }

  const applyJobPosition = () => {
    setModalShow(false);
    fetch('https://localhost:7172/api/JobApply/CreateJobApply', {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        jobPositionId: selectedJobPosition.id,
      }),
    })
      .then((res) => res.json())
      .then((r) => {
        if (r.success) {
          toast(r.message, {
            autoClose: 3000,
            hideProgressBar: false,
            type: "success",
            theme: "dark",
            position: toast.POSITION.TOP_LEFT,
          });
        } else {
          toast(r.message, {
            autoClose: 3000,
            hideProgressBar: false,
            type: "warning",
            theme: "dark",
            position: toast.POSITION.TOP_LEFT,
          });
        }
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  const downloadCV = (studentId) => {
    fetch(`https://localhost:7172/api/UsersInfo/${studentId}`, {
      method: 'GET',
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => res.json())
      .then((r) => {
        if (!r.success) {
          toast(r.message, {
            autoClose: 3000,
            hideProgressBar: false,
            type: "warning",
            theme: "dark",
            position: toast.POSITION.TOP_LEFT,
          });
        }
      })
      .catch((err) => {
        console.log(err.message)
      })
  }


  return (
    <div className='divJobPositions'>
      <Modal
        onHide={() => setModalShow(false)}
        show={modalShow}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Esta seguro que desea aplicar a "{selectedJobPosition !== null && selectedJobPosition.jobTitle}"?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Si desea continuar con la postulacion pulse "Aplicar", en caso contrario pulse "Cancelar".
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setModalShow(false)}>Cancelar</Button>
          <Button variant="success" onClick={applyJobPosition}>Aplicar</Button>
        </Modal.Footer>
      </Modal>
      <div className="container-fluid main">
        <ToastContainer />
        <div className="main-card">
          <div className="job-positions">
            <ul className="list">
              <h3>{role === "Student" ? "Ofertas laborales" : "Mis Ofertas"}</h3>
              <div className="search">
                <input value={searchText} onChange={handleInput} id="search-text" className="search-filter job-position-filter" type="text" name="job-position-filter" placeholder='Buscar ofertas...' />
                <span className="icon-search"></span>
              </div>
              <div className="scrollable-jobPositions">
                {jobPositions && jobPositions.filter((jobPosition) => {
                  return jobPosition.jobTitle.includes(searchText) || jobPosition.location.includes(searchText) || jobPosition.company.companyName.includes(searchText);
                }).map((jobPosition) => {
                  return <div className="list-item" key={jobPosition.id} onClick={() => onSelectJobPosition(jobPosition.id)} style={{ backgroundColor: selectedJobPosition !== null && jobPosition.id === selectedJobPosition.id ? '#E2F0FE' : 'white' }}>
                    <h5>{jobPosition.jobTitle}</h5>
                    <div className="list-item__text">
                      Empresa: {jobPosition.company.companyName}
                    </div>
                    <div className="list-item__text">
                      Ubicación: {jobPosition.location}
                    </div>
                  </div>
                })}
              </div>
            </ul>
            <div className="details">
              {role === "Student" && (
                <div className="card-detail" key={selectedJobPosition !== null && selectedJobPosition.id}>
                  <div className="card-detail__title" style={{ justifyContent: selectedJobPosition !== null && selectedJobPosition.id ? "space-between" : "center" }}>
                    <h2>{selectedJobPosition !== null && selectedJobPosition.jobTitle}</h2>
                    {selectedJobPosition !== null && selectedJobPosition.id ? (
                      <input className="apply-button" type="submit" value='Aplicar' onClick={() => {
                        if (active) {
                          setModalShow(true);
                        } else {
                          toast("Para aplicar debés esperar a que un administrador habilite tu cuenta", {
                            autoClose: 3000,
                            hideProgressBar: false,
                            type: "warning",
                            theme: "dark",
                            position: toast.POSITION.TOP_LEFT,
                          });
                        }
                      }} />
                    ) : (
                      <div>No hay ofertas laborales disponibles</div>
                    )}
                  </div>
                  <div className="card-detail__body">
                    <div className="feature">
                      <FontAwesomeIcon icon={faLocationDot} />
                      <p className="mx-2">{selectedJobPosition && `Lugar de trabajo: ${selectedJobPosition.location}`}</p>
                    </div>
                    <div className="feature">
                      <FontAwesomeIcon icon={faBriefcase} />
                      <p className="mx-2">{selectedJobPosition && selectedJobPosition.jobType === 0 ? "Tipo: Pasantía" : "Tipo: Relación de dependencia"}</p>
                    </div>
                    {selectedJobPosition && selectedJobPosition.jobType === 1 && (
                      <div className="feature">
                        <FontAwesomeIcon icon={faBusinessTime} />
                        <p className="mx-2">{selectedJobPosition && selectedJobPosition.workDay === 0 ? "Jornada laboral: Tiempo completa" : "Jornada laboral: Tiempo parcial"}</p>
                      </div>
                    )}
                    {selectedJobPosition && selectedJobPosition.jobType === 0 ? (
                      <div className="feature">
                        <FontAwesomeIcon icon={faCalendarDays} />
                        <p className="mx-2">{selectedJobPosition && `Desde ${selectedJobPosition.startDate.substring(0, 10).split("-").reverse().join("-")} Hasta ${selectedJobPosition.endDate.substring(0, 10).split("-").reverse().join("-")}`}</p>
                      </div>
                    ) : (
                      <div className="feature">
                        <FontAwesomeIcon icon={faCalendarDays} />
                        <p className="mx-2">{selectedJobPosition && `Fecha de inicio: ${selectedJobPosition.startDate.substring(0, 10).split("-").reverse().join("-")}`}</p>
                      </div>
                    )}
                    <div className="feature">
                      <FontAwesomeIcon icon={faPerson} />
                      <p className="mx-2">{selectedJobPosition && `${selectedJobPosition.positionsToCover} puesto${selectedJobPosition.positionsToCover === 1 ? "" : "s"} disponible${selectedJobPosition.positionsToCover === 1 ? "" : "s"}`}</p>
                    </div>
                    <div className="description">
                      <p>{selectedJobPosition && selectedJobPosition.jobDescription}</p>
                    </div>
                  </div>
                </div>
              )}
              {role === "Company" && (
                <div className="card-detail" key={selectedJobPosition !== null && selectedJobPosition.id}>
                  <div className="card-detail__title">
                    <h2>{selectedJobPosition !== null && selectedJobPosition.jobTitle !== undefined ? `Postulantes para ${selectedJobPosition.jobTitle}` : null}</h2>
                  </div>
                  <div className="card-detail__body">
                    <ul className="students-list">
                      {selectedJobPosition !== null && selectedJobPosition.studentsWhoApplied && selectedJobPosition.studentsWhoApplied.length > 0 ? selectedJobPosition.studentsWhoApplied.map((student) => {
                        return <li key={student.id} className="student-detail">
                          <div className="name">
                            <div className="text">{student.firstName} {student.lastName}</div>
                            <div className="icon-container">
                              <a href={`https://${student.linkedinProfileURL}`} rel="noreferrer" target="_blank">
                                <FontAwesomeIcon className="icon" icon={faLinkedin} />
                              </a>
                              <div className="tooltiptext">Linkedin</div>
                            </div>
                            <div className="icon-container">
                              <a href={`http://${student.githubProfileURL}`} rel="noreferrer" target="_blank">
                                <FontAwesomeIcon className="icon" icon={faGithubSquare} />
                              </a>
                              <div className="tooltiptext">Github</div>
                            </div>
                            <div className="icon-container">
                              <div onClick={() => downloadCV(student.id)}>
                                <FontAwesomeIcon className="icon" icon={faDownload} />
                              </div>
                              <div className="tooltiptext">Descargar CV</div>
                            </div>
                          </div>
                          <div className="mail">{student.email}</div>
                        </li>
                      }) : (
                        <div>
                          Ningún estudiante ha postulado a esta oferta laboral
                        </div>
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobPositions;
