import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaEye, FaTimes } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAllReports, deleteReport } from "../../Services/ReportService";
import HorizontalMenu from "../../Components/Menu/HorizontalMenu";
import { Modal, Button } from "react-bootstrap";

const Report = () => {
    const [reports, setReports] = useState([]);
    const [filteredReports, setFilteredReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedReport, setSelectedReport] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const data = await getAllReports();
                setReports(data);
                setFilteredReports(data);
            } catch (error) {
                console.error("Error al obtener los reportes:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchReports();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este reporte?")) {
            try {
                await deleteReport(id);
                const updated = reports.filter(report => report.id !== id);
                setReports(updated);
                setFilteredReports(updated);
                if (selectedReport?.id === id) setSelectedReport(null);
            } catch (error) {
                console.error("Error al eliminar el reporte", error);
            }
        }
    };

    const handleView = (report) => {
        console.log("Reporte seleccionado:", report); // Console log agregado
        setSelectedReport(report);
        setShowModal(true);
    };

    const handleFilter = () => {
        let filtered = reports;
        if (startDate) filtered = filtered.filter(r => new Date(r.date) >= new Date(startDate));
        if (endDate) filtered = filtered.filter(r => new Date(r.date) <= new Date(endDate));
        setFilteredReports(filtered);
        setSelectedReport(null);
        setShowModal(false);
    };

    return (
        <div className="d-flex flex-column vh-100" style={{ backgroundColor: "#1e3a5f", color: "white" }}>
            <header className="bg-dark text-white py-3 w-100">
                <div className="container text-center">
                    <h2 className="mb-0">Gestión de Reportes</h2>
                    <p className="mb-0">Administra los reportes registrados en el sistema.</p>
                </div>
            </header>
            <HorizontalMenu />

            <main className="container my-4 flex-grow-1">
                <h3 className="text-info mb-3 text-center">Lista de Reportes</h3>

                {/* Filtro por fecha */}
                <div className="mb-4 d-flex justify-content-center">
                    <input
                        type="date"
                        className="form-control me-2"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <input
                        type="date"
                        className="form-control me-2"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={handleFilter}>Filtrar</button>
                </div>

                {/* Tabla de reportes */}
                <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {loading ? (
                        <p>Cargando reportes...</p>
                    ) : (
                        <table className="table table-dark table-striped">
                            <thead className="thead-light">
                                <tr>
                                    <th>Título</th>
                                    <th>Fecha</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredReports.map((report) => (
                                    <tr key={report.id}>
                                        <td>{report.title}</td>
                                        <td>{report.date}</td>
                                        <td>
                                            <button
                                                onClick={() => handleView(report)}
                                                className="btn btn-info btn-sm me-2"
                                            >
                                                <FaEye /> Ver
                                            </button>
                                            <button
                                                onClick={() => handleDelete(report.id)}
                                                className="btn btn-danger btn-sm"
                                            >
                                                <FaTrashAlt /> Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Modal para detalles del reporte */}
                {/* Modal para detalles del reporte */}
                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Detalles del Reporte</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedReport && (
                            <>
                                <h5>{selectedReport.title}</h5>
                                <p><strong>ID:</strong> {selectedReport.id}</p>
                                <p><strong>Fecha:</strong> {new Date(selectedReport.date).toLocaleDateString()}</p>
                                <p><strong>Descripción:</strong><br />{selectedReport.description || "Sin descripción disponible."}</p>
                                <p><strong>Tipo de Mantenimiento:</strong> {selectedReport.maintenanceType}</p>
                                <p><strong>Duración:</strong> {selectedReport.duration}</p>
                                <p><strong>Hora de Inicio:</strong> {selectedReport.startTime}</p>
                                <p><strong>Hora de Finalización:</strong> {selectedReport.endTime}</p>
                            </>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            <FaTimes /> Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>

            </main>

            <footer className="bg-dark text-white py-3 text-center">
                <p className="mb-0">© 2025 Sistema de Reportes | Todos los derechos reservados</p>
            </footer>
        </div>
    );
};

export default Report;
