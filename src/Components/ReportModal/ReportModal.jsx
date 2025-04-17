import React from "react";

const ReportModal = ({ selectedReport, setShowModal }) => {
    if (!selectedReport) return null;

    return (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Detalles del Informe</h5>
                        <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <p><strong>Fecha:</strong> {selectedReport.date}</p>
                        <p><strong>Título:</strong> {selectedReport.title}</p>
                        <p><strong>Descripción:</strong> {selectedReport.description}</p>
                        <p><strong>Tipo de Mantenimiento:</strong> {selectedReport.maintenanceType}</p>
                        <p><strong>Duración:</strong> {selectedReport.duration} horas</p>
                        <p><strong>Hora de Inicio:</strong> {selectedReport.startTime}</p>
                        <p><strong>Hora de Fin:</strong> {selectedReport.endTime}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportModal;
