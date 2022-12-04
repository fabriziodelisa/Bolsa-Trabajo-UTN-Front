import { useState, useContext } from 'react';
import "./AdminDashboard.css";
import { Row, Col, Button, Form } from 'react-bootstrap';
import DashboardTable from "./DashboardTable";
import { HandleUpdateCareer, HandleDeleteCareer, HandleDeleteSkill, ActivateDeactivateUser } from "./Handlers";
import UserContext from "../../context/UserContext";

const AdminDashboard = () => {
  const { jwt } = useContext(UserContext);
  const [deletedOrUpdated, setDeletedOrUpdated] = useState(false);
  const [selectedSettings, setSelectedSettings] = useState([
    { id: 'carreras', isSelected: true },
    { id: 'habilidades', isSelected: false },
    { id: 'alumnos', isSelected: false },
    { id: 'empresas', isSelected: false },
  ]);
  const handleSidebarButton = (e) => {
    switch (e.target.id) {
      case "carreras":
        setSelectedSettings([
          { id: e.target.id, isSelected: true },
          { id: "alumnos", isSelected: false },
          { id: "empresas", isSelected: false },
          { id: "habilidades", isSelected: false },
        ]);
        break;
      case "habilidades":
        setSelectedSettings([
          { id: e.target.id, isSelected: true },
          { id: "carreras", isSelected: false },
          { id: "alumnos", isSelected: false },
          { id: "empresas", isSelected: false },
        ]);
        break;
      case "alumnos":
        setSelectedSettings([
          { id: "carreras", isSelected: false },
          { id: e.target.id, isSelected: true },
          { id: "empresas", isSelected: false },
          { id: "habilidades", isSelected: false },
        ]);
        break;
      case "empresas":
        setSelectedSettings([
          { id: "carreras", isSelected: false },
          { id: "habilidades", isSelected: false },
          { id: "alumnos", isSelected: false },
          { id: e.target.id, isSelected: true },
        ]);
        break;
      default:
        break;
    }
  }

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="d-flex justify-content-center align-items-center title">
          <h4 className="m-0">Admin Dashboard</h4>
        </div>
        <ul className="p-0 list-style-none">
          <li>
            <button style={{ backgroundColor: selectedSettings.find(b => b.id === "carreras").isSelected ? '#719FED' : '#212529' }} onClick={handleSidebarButton} id="carreras" className="w-100 border-0 rounded-0 sidebar-button">Carreras</button>
          </li>
          <li>
            <button style={{ backgroundColor: selectedSettings.find(b => b.id === "habilidades").isSelected ? '#719FED' : '#212529' }} onClick={handleSidebarButton} id="habilidades" className="w-100 border-0 rounded-0 sidebar-button">Habilidades</button>
          </li>
          <li>
            <button style={{ backgroundColor: selectedSettings.find(b => b.id === "alumnos").isSelected ? '#719FED' : '#212529' }} onClick={handleSidebarButton} id="alumnos" className="w-100 border-0 rounded-0 sidebar-button">Alumnos</button>
          </li>
          <li>
            <button style={{ backgroundColor: selectedSettings.find(b => b.id === "empresas").isSelected ? '#719FED' : '#212529' }} onClick={handleSidebarButton} id="empresas" className="w-100 border-0 rounded-0 sidebar-button">Empresas</button>
          </li>
        </ul>
      </aside>
      <main className="content">
        <Row>
          {selectedSettings.find((x) => x.id === "carreras").isSelected && (
            <Col>
              <DashboardTable
                url='https://localhost:7172/api/Careers'
                deletedOrUpdated={deletedOrUpdated}
                title="Carreras"
                addFunctionality={true}
                setDeletedOrUpdated={setDeletedOrUpdated}
                columns={[
                  { field: 'col1', headerName: 'Id', width: 40, editable: false, align: 'center', headerAlign: 'center', },
                  { field: 'col2', headerName: 'Tipo', width: 125, editable: true, align: 'center', headerAlign: 'center', },
                  { field: 'col3', headerName: 'Abreviación', width: 125, editable: true, align: 'center', headerAlign: 'center', },
                  { field: 'col4', headerName: 'Nombre', width: 350, editable: true, align: 'center', headerAlign: 'center', },
                  { field: 'col5', headerName: 'Cant. Materias', width: 125, editable: true, align: 'center', headerAlign: 'center', },
                  {
                    field: 'col6', headerName: 'Acciones', width: 150, align: 'center', headerAlign: 'center', renderCell: (rowValues) => {
                      return (
                        <>
                          <Button
                            variant="success"
                            color="success"
                            style={{ margin: '0 5px 0 0' }}
                            onClick={() => HandleUpdateCareer(rowValues, setDeletedOrUpdated, deletedOrUpdated, jwt)}
                          >
                            Guardar
                          </Button>
                          <Button
                            variant="danger"
                            color="danger"
                            style={{ margin: '0 0 0 5px' }}
                            onClick={() => HandleDeleteCareer(rowValues, setDeletedOrUpdated, deletedOrUpdated, jwt)}
                          >
                            X
                          </Button>
                        </>
                      )
                    }
                  },
                ]} />
            </Col>
          )}
          {selectedSettings.find((x) => x.id === "habilidades").isSelected && (
            <Col>
              <DashboardTable
                url='https://localhost:7172/api/Skills'
                deletedOrUpdated={deletedOrUpdated}
                title="Habilidades"
                addFunctionality={true}
                setDeletedOrUpdated={setDeletedOrUpdated}
                columns={[
                  { field: 'col1', headerName: 'Id', width: 40, editable: false, align: 'center', headerAlign: 'center', },
                  { field: 'col2', headerName: 'Nombre', width: 125, editable: true, align: 'center', headerAlign: 'center', },
                  {
                    field: 'col3', headerName: 'Acciones', width: 150, align: 'center', headerAlign: 'center', renderCell: (rowValues) => {
                      return (
                        <>
                          <Button
                            variant="danger"
                            color="danger"
                            style={{ margin: '0 0 0 5px' }}
                            onClick={() => HandleDeleteSkill(rowValues, setDeletedOrUpdated, deletedOrUpdated, jwt)}
                          >
                            X
                          </Button>
                        </>
                      )
                    }
                  },
                ]} />
            </Col>
          )}
          {selectedSettings.find((x) => x.id === "alumnos").isSelected && (
            <Col>
              <DashboardTable
                url='https://localhost:7172/api/UsersInfo/GetAllStudents'
                deletedOrUpdated={deletedOrUpdated}
                title="Alumnos"
                columns={[
                  { field: 'col1', headerName: 'Legajo', width: 100, editable: false, align: 'center', headerAlign: 'center', },
                  { field: 'col2', headerName: 'DNI', width: 150, editable: false, align: 'center', headerAlign: 'center', },
                  { field: 'col3', headerName: 'Nombre', width: 150, editable: false, align: 'center', headerAlign: 'center', },
                  { field: 'col4', headerName: 'Apellido', width: 150, editable: false, align: 'center', headerAlign: 'center', },
                  {
                    field: 'col5', headerName: 'Habilitado', width: 120, editable: true, align: 'center', headerAlign: 'center', renderCell: (rowValues) => {
                      return (
                        <Form.Check
                          className="d-flex justify-content-center"
                          name="group1"
                          type="checkbox"
                          checked={rowValues.row.col5}
                          onChange={(e) => {
                            ActivateDeactivateUser(rowValues.id, e.target.checked, setDeletedOrUpdated, deletedOrUpdated, jwt);
                          }}
                        />
                      )
                    }
                  },
                ]} />
            </Col>
          )}
          {selectedSettings.find((x) => x.id === "empresas").isSelected && (
            <Col>
              <DashboardTable
                url='https://localhost:7172/api/UsersInfo/GetAllCompanies'
                deletedOrUpdated={deletedOrUpdated}
                title="Empresas"
                columns={[
                  { field: 'col1', headerName: 'Cuit', width: 200, editable: false, align: 'center', headerAlign: 'center', },
                  { field: 'col2', headerName: 'Razon Social', width: 200, editable: false, align: 'center', headerAlign: 'center', },
                  {
                    field: 'col3', headerName: 'Habilitado', width: 120, editable: true, align: 'center', headerAlign: 'center', renderCell: (rowValues) => {
                      return (
                        <Form.Check
                          className="d-flex justify-content-center"
                          name="group1"
                          type="checkbox"
                          checked={rowValues.row.col3}
                          onChange={(e) => {
                            ActivateDeactivateUser(rowValues.id, e.target.checked, setDeletedOrUpdated, deletedOrUpdated, jwt);
                          }}
                        />
                      )
                    }
                  },
                ]} />
            </Col>
          )}
        </Row>
      </main>
    </div>
  )
}

export default AdminDashboard;