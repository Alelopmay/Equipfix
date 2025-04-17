import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCalendarAlt, FaTools, FaClock, FaRegFileAlt } from "react-icons/fa";
import "./ReportList.css";

const ReportList = ({ reports }) => {
    const [selectedReport, setSelectedReport] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleViewDetails = (reportId) => {
        const report = reports.find((report) => report.id === reportId);
        setSelectedReport(report);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedReport(null);
    };

    return (
        <div>
            <h3 className="text-center my-4">📋 Informes del Equipo</h3>

            {/* Contenedor con scroll vertical */}
            <div className="container report-container">
                <div className="report-scroll">
                    <div className="row">
                        {reports.map((report) => (
                            <div key={report.id} className="col-md-6 mb-3">
                                <div className="card report-card shadow-lg">
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title text-primary text-truncate" title={report.title}>
                                            {report.title}
                                        </h5>
                                        <p className="text-truncate">
                                            <FaCalendarAlt /> <strong>Fecha:</strong> {report.date}
                                        </p>
                                        <p className="text-truncate">
                                            <FaTools /> <strong>Tipo:</strong> {report.maintenanceType}
                                        </p>
                                        <Button
                                            variant="info"
                                            className="mt-auto w-100"
                                            onClick={() => handleViewDetails(report.id)}
                                        >
                                            <FaRegFileAlt /> Ver
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal de detalles del reporte */}
            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Detalles del Reporte</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedReport && (
                        <div className="report-paper p-4">
                            <h5 className="report-title"><strong>{selectedReport.title}</strong></h5>
                            <p className="report-date">
                                <FaCalendarAlt /> <strong>Fecha:</strong> {selectedReport.date}
                            </p>
                            <hr />
                            <p><strong>Descripción:</strong> {selectedReport.description}</p>
                            <p><FaTools /> <strong>Tipo de Mantenimiento:</strong> {selectedReport.maintenanceType}</p>
                            <p><FaClock /> <strong>Duración:</strong> {selectedReport.duration} horas</p>
                            <p><strong>Hora de Inicio:</strong> {selectedReport.startTime}</p>
                            <p><strong>Hora de Fin:</strong> {selectedReport.endTime}</p>
                            <hr />
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ReportList;
