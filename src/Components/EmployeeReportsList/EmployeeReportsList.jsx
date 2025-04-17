import React, { useEffect, useState } from "react";
import { getReportsByWorkerId, updateReport, getReportById } from "../../Services/ReportService";
import { getUserIdFromToken } from "../../Services/authUtils";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const EmployeeReportsList = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReports = async () => {
            const workerId = getUserIdFromToken();
            if (!workerId) {
                setError("No se pudo obtener el ID del usuario.");
                setLoading(false);
                return;
            }

            try {
                const data = await getReportsByWorkerId(workerId);
                setReports(data);
            } catch (err) {
                setError("Error al cargar los reportes.");
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    const handleViewReport = async (reportId) => {
        try {
            const report = await getReportById(reportId);
            setSelectedReport(report);
            setShowModal(true);
            setEditMode(false);
        } catch (error) {
            console.error("Error al obtener el reporte:", error);
        }
    };

    const handleEditReport = (report) => {
        setSelectedReport(report);
        setFormData(report);
        setShowModal(true);
        setEditMode(true);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSaveChanges = async () => {
        try {
            await updateReport(formData.id, formData);
            setReports((prevReports) => prevReports.map((r) => (r.id === formData.id ? formData : r)));
            setShowModal(false);
        } catch (error) {
            console.error("Error al actualizar el reporte:", error);
        }
    };

    if (loading) return <p className="text-center text-light">Cargando reportes...</p>;
    if (error) return <p className="text-center text-danger">{error}</p>;
    if (reports.length === 0) return <p className="text-center text-light">No hay reportes disponibles.</p>;

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4 text-light">Mis Reportes</h2>
            <div className="row">
                {reports.map((report) => (
                    <div className="col-md-6 col-lg-4" key={report.id}>
                        <div className="card bg-dark text-light mb-4 shadow-lg rounded-3">
                            <div className="card-body">
                                <h5 className="card-title text-info">{report.title}</h5>
                                <p className="card-text">{report.description}</p>
                                <p className="card-text">
                                    <small className="text-muted">{report.date}</small>
                                </p>
                                <div className="d-flex justify-content-between">
                                    <Button variant="outline-success" onClick={() => handleViewReport(report.id)}>
                                        Ver Informe
                                    </Button>
                                    <Button variant="outline-warning" onClick={() => handleEditReport(report)}>
                                        Editar Informe
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{editMode ? "Editar Reporte" : "Detalles del Reporte"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {editMode ? (
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Título</Form.Label>
                                <Form.Control type="text" name="title" value={formData.title} onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control as="textarea" name="description" value={formData.description} onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Tipo de Mantenimiento</Form.Label>
                                <Form.Control type="text" name="maintenanceType" value={formData.maintenanceType} onChange={handleInputChange} />
                            </Form.Group>
                        </Form>
                    ) : (
                        <div>
                            <p><strong>Fecha:</strong> {selectedReport?.date}</p>
                            <p><strong>Título:</strong> {selectedReport?.title}</p>
                            <p><strong>Descripción:</strong> {selectedReport?.description}</p>
                            <p><strong>Tipo de Mantenimiento:</strong> {selectedReport?.maintenanceType}</p>
                            <p><strong>Duración:</strong> {selectedReport?.duration}</p>
                            <p><strong>Hora de Inicio:</strong> {selectedReport?.startTime}</p>
                            <p><strong>Hora de Fin:</strong> {selectedReport?.endTime}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {editMode && <Button variant="primary" onClick={handleSaveChanges}>Guardar Cambios</Button>}
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default EmployeeReportsList;