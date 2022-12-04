import { useContext } from "react";
import { Button, Modal, Form } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import UserContext from "../../context/UserContext";

function AddCareerModal({ url, setShowModal, visible, form, setForm, setDeletedOrUpdated, deletedOrUpdated }) {
    const {jwt} = useContext(UserContext);
    const handleNewCareer = () => {
        if (form.name === '' || form.abbreviation === '' || form.totalSubjets === null || form.totalSubjets <= 0) {
            toast("Ingrese datos válidos", {
                autoClose: 3000,
                hideProgressBar: false,
                type: "error",
                theme: "dark",
                position: toast.POSITION.TOP_LEFT,
            });
        } else {
            fetch(url, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
                body: JSON.stringify(form),
            })
                .then((r) => r.json())
                .then((r) => {
                    setDeletedOrUpdated(!deletedOrUpdated);
                    setForm({
                        name: '',
                        abbreviation: '',
                        type: 0,
                        totalSubjets: null,
                    });
                    setShowModal(false);
                    toast(`${r.name} creada correctamente`, {
                        autoClose: 3000,
                        hideProgressBar: false,
                        type: "success",
                        theme: "dark",
                        position: toast.POSITION.TOP_RIGHT,
                    });
                })
                .catch((e) => console.log(e));
        }
    }
    return (
        <>
            <ToastContainer className="mt-5" />
            <Modal
                show={visible}
                onExit={() => setShowModal(false)}
                onHide={() => setShowModal(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Agregar Carrera
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="type">
                            <Form.Label>Tipo</Form.Label>
                            <Form.Select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} aria-label="Default select example">
                                <option value={0}>Grado</option>
                                <option value={1}>Tecnicatura</option>
                                <option value={2}>Posgrado</option>
                                <option value={3}>Maestría</option>
                                <option value={4}>Especialización</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="abbreviation">
                            <Form.Label>Abreviatura</Form.Label>
                            <Form.Control onChange={(e) => setForm({ ...form, abbreviation: e.target.value })} type="text" placeholder="Ingrese la abreviatura" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="careerName">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control onChange={(e) => setForm({ ...form, name: e.target.value })} type="text" placeholder="Ingrese el nombre de la carrera" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="totalSubjets">
                            <Form.Label>Cantidad de materias</Form.Label>
                            <Form.Control onChange={(e) => setForm({ ...form, totalSubjets: e.target.value })} type="number" placeholder="Ingrese la cantidad de materias" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="success" onClick={handleNewCareer}>Agregar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddCareerModal;