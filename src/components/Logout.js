import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

const Logout = () => {
  const { setJwt } = useContext(UserContext);
  const logout = () => {
    window.sessionStorage.removeItem('jwt');
    setJwt(null);
  }
  return (
    <li className="nav-item">
      <Link className="nav-link" onClick={logout} to="/ingreso">
        Cerrar Sesion
      </Link>
    </li>
  );
};

export default Logout;
