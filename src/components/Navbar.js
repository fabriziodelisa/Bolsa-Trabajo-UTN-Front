import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import "./Navbar.css";
import utnLogo from "../assets/white-utn-logo.png";

const Navbar = () => {
  const { jwt, role } = useContext(UserContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="navbar-brand">
          Bolsa de Trabajo
          <img src={utnLogo} alt="UTN Logo" className="navbar-logo" />
        </div>
        <div className="" id="navbarNav">
          <ul className="navbar-nav">
            {jwt && role === 'Student' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/ofertas">
                    Ofertas laborales
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/historial-aplicaciones">
                    Historial de aplicaciones
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/perfil">
                    Perfil
                  </Link>
                </li>
              </>
            )}
            {jwt && role === 'Company' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/ofertas">
                    Mis Ofertas
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/crearOferta">
                    Crear Oferta
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/perfilEmpresa">
                    Perfil
                  </Link>
                </li>
              </>
            )}
            {(jwt === null || role === null) && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/ingreso">
                    Ingresar
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/registro">
                    Registrarse
                  </Link>
                </li>
              </>
            )}
            {jwt ? <Logout /> : ""}
          </ul>
        </div>
      </div >
    </nav >
  );
};

export default Navbar;
