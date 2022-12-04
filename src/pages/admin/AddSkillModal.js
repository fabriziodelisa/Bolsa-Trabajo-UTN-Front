import { useContext } from "react";
import { Button, Modal, Form } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import UserContext from "../../context/UserContext";

function AddSkillModal({ url, setShowModal, visible, form, setForm, setDeletedOrUpdated, deletedOrUpdated }) {
    const {jwt} = useContext(UserContext);
    const handleNewSkill = () => {
        if (form.skillName === '') {
            toast("Ingrese datos válidos", {
                autoClose: 3000,
                hideProgressBar: false,
                type: "error",
                theme: "dark",
                position: toast.POSITION.TOP_LEFT,
            });
        } else {
            console.log(form);
            fetch(`${url}/CreateSkill`, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
                body: JSON.stringify({
                    skillName: form.name
                }),
            })
                .then((r) => r.json())
                .then((r) => {
                    setDeletedOrUpdated(!deletedOrUpdated);
                    setForm({
                        skillName: '',
                    });
                    setShowModal(false);
                    toast(`${r.skillName} creada correctamente`, {
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
                        Agregar Habilidad
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="careerName">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control onChange={(e) => setForm({ ...form, name: e.target.value })} type="text" placeholder="Ingrese el nombre de la habilidad" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="success" onClick={handleNewSkill}>Agregar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddSkillModal;