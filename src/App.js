import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import JobPositions from "./pages/student/JobPositions";
import AddJobPosition from "./pages/company/AddJobPosition"
import Profile from "./pages/student/Profile";
import StudentData from "./pages/student/StudentData";
import CompanyData from "./pages/company/CompanyData";
import CompanyProfile from "./pages/company/CompanyProfile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import JobApplyHistory from "./pages/student/JobApplyHistory";
import ReplaceRoute from "./hooks/ReplaceRoute";
import { UserContextProvider } from "./context/UserContext";
import utnLogo from "./assets/logo-utn.png";
import "./App.css";

const App = () => {
  const location = useLocation();
  console.log();
  return (
    <>
      <UserContextProvider>
        <Navbar />
        <Routes>
          <Route path="/ingreso" element={<Login />}></Route>
          <Route path="/registro" element={<Register />}></Route>
          <Route path="/ofertas" element={<JobPositions />}></Route>
          <Route path="/crearOferta" element={<AddJobPosition />}></Route>
          <Route path="/datosAlumno" element={<StudentData />}></Route>
          <Route path="/datosEmpresa" element={<CompanyData />}></Route>
          <Route path="/perfil" element={<Profile />}></Route>
          <Route path="/perfilEmpresa" element={<CompanyProfile />}></Route>
          <Route path="/adminDashboard" element={<AdminDashboard />}></Route>
          <Route path="/historial-aplicaciones" element={<JobApplyHistory />}></Route>
          <Route path="*" element={<ReplaceRoute />}></Route>
        </Routes>
        {location.pathname === '/ingreso' || location.pathname === '/registro' || location.pathname === '/adminDashboard' ? (
          null
        ) : (
          <footer className="footerCompany">
            <div id="divFooter" className="container">
              <div id="divLeftRight" className="row justify-content-center">
                <div id="divLeft" className="col-4">
                  <figure>
                    <img src={utnLogo} alt="UTN Logo" className="logo" />
                  </figure>
                </div>
                <div id="divRight" className="col-4">
                  <div className="divUniversity">
                    <p>FACULTAD REGIONAL ROSARIO</p>
                  </div>
                  <div className="divContact">
                    <p> Localidad: Zeballos 1341 - Rosario</p>
                  </div>
                  <div className="divPhone">
                    <p>Telefono: 0341-4481871</p>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        )}
      </UserContextProvider>
    </>
  );
};

export default App;
