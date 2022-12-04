import React, { useState, useEffect, useContext, useCallback } from 'react';
import "./JobApplyHistory.css";
import UserContext from "../../context/UserContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faLocationDot, faBriefcase, faBusinessTime, faCalendarDays, faPerson } from '@fortawesome/free-solid-svg-icons';

const JobApplyHistory = () => {
  const { jwt, role } = useContext(UserContext);
  const [jobApplies, setJobApplies] = useState([]);
  const [selectedJobApply, setselectedJobApply] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetch('https://localhost:7172/api/JobApply/GetJobAppliesOfStudent', {
        method: 'GET',
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
        .then((r) => r.json())
        .then((r) => {
          if (r.success) {
            setJobApplies(r.data);
          }
        });
  }, [jwt]);

  const onSelectJobPosition = useCallback(
    (id) => {
      if (jobApplies.length !== 0) {
        setselectedJobApply(jobApplies.find(x => x.id === id));
      }
    }, [jobApplies]);

  useEffect(() => {
    if (jobApplies.length !== 0) {
      setselectedJobApply(jobApplies[0]);
    }
  }, [jobApplies, selectedJobApply, setselectedJobApply]);

  const handleInput = (e) => {
    switch (e.target.id) {
      case 'search-text':
        setSearchText(e.target.value);
        break;
      default:
        break;
    }
  }

  return (
    <div className='divJobApplies'>
      <div className="container-fluid main">
        <div className="main-card">
          <div className="job-positions">
            <ul className="list">
              <h3>Historia de aplicaciones</h3>
              <div className="search">
                <input value={searchText} onChange={handleInput} id="search-text" className="search-filter job-position-filter" type="text" name="job-position-filter" placeholder='Buscar ofertas...' />
                <span className="icon-search"></span>
              </div>
              <div className="scrollable-JobApplies">
                {jobApplies && jobApplies.filter((jobApply) => {
                  return jobApply.jobTitle.includes(searchText) || jobApply.location.includes(searchText) || jobApply.company.companyName.includes(searchText);
                }).map((jobApply) => {
                  return <div className="list-item" key={jobApply.id} onClick={() => onSelectJobPosition(jobApply.id)} style={{ backgroundColor: selectedJobApply !== null && jobApply.id === selectedJobApply.id ? '#E2F0FE' : 'white' }}>
                    <h5>{jobApply.jobTitle}</h5>
                    {role === "Student" && (
                      <>
                        <div className="list-item__text">
                          Empresa: {jobApply.company.companyName}
                        </div>
                        <div className="list-item__text">
                          Ubicación: {jobApply.location}
                        </div>
                      </>
                    )}
                  </div>
                })}
              </div>
            </ul>
            <div className="details">
              {jobApplies.length > 0 ? (
                <div className="card-detail" key={selectedJobApply !== null && selectedJobApply.id}>
                  <div className="card-detail__title" style={{ justifyContent: selectedJobApply !== null && selectedJobApply.id ? "space-between" : "center" }}>
                    <h2>{selectedJobApply !== null && selectedJobApply.jobTitle}</h2>
                  </div>
                  <div className="card-detail__body">
                    <div className="feature">
                      <FontAwesomeIcon icon={faLocationDot} />
                      <p className="mx-2">{selectedJobApply && `Lugar de trabajo: ${selectedJobApply.location}`}</p>
                    </div>
                    <div className="feature">
                      <FontAwesomeIcon icon={faBriefcase} />
                      <p className="mx-2">{selectedJobApply && selectedJobApply.jobType === 0 ? "Tipo: Pasantía" : "Tipo: Relación de dependencia"}</p>
                    </div>
                    {selectedJobApply && selectedJobApply.jobType === 1 && (
                      <div className="feature">
                        <FontAwesomeIcon icon={faBusinessTime} />
                        <p className="mx-2">{selectedJobApply && selectedJobApply.workDay === 0 ? "Jornada laboral: Tiempo completa" : "Jornada laboral: Tiempo parcial"}</p>
                      </div>
                    )}
                    {selectedJobApply && selectedJobApply.jobType === 0 ? (
                      <div className="feature">
                        <FontAwesomeIcon icon={faCalendarDays} />
                        <p className="mx-2">{selectedJobApply && `Desde ${selectedJobApply.startDate.substring(0, 10).split("-").reverse().join("-")} Hasta ${selectedJobApply.endDate.substring(0, 10).split("-").reverse().join("-")}`}</p>
                      </div>
                    ) : (
                      <div className="feature">
                        <FontAwesomeIcon icon={faCalendarDays} />
                        <p className="mx-2">{selectedJobApply && `Fecha de inicio: ${selectedJobApply.startDate.substring(0, 10).split("-").reverse().join("-")}`}</p>
                      </div>
                    )}
                    <div className="feature">
                        <FontAwesomeIcon icon={faPerson} />
                        <p className="mx-2">{selectedJobApply && `${selectedJobApply.positionsToCover} puesto${selectedJobApply.positionsToCover === 1 ? "" : "s"} disponible${selectedJobApply.positionsToCover === 1 ? "" : "s"}`}</p>
                      </div>
                    <div className="description">
                      <p>{selectedJobApply && selectedJobApply.jobDescription}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <h2>No has aplicado a ninguna oferta laboral</h2>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobApplyHistory;
