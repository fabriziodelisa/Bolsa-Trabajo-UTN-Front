import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const ReplaceRoute = () => {

  const { jwt, role } = useContext(UserContext);

  if (jwt) {

    if (role === "Student") {
      return <Navigate to="/ofertas" replace="true" />
    } else if (role === "Company") {
      return <Navigate to="/crearOferta" replace="true" />
    } else {
      return <Navigate to="/adminDashboard" replace="true" />
    }
  } else {
    return <Navigate to="/ingreso" replace="true" />
  }
}

export default ReplaceRoute;