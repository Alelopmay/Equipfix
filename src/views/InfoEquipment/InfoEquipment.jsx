import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaClipboardList, FaArrowLeft } from "react-icons/fa";
import { getReportById, createReport } from "../../Services/ReportService";
import { getEquipmentById } from "../../Services/EquipmentService";
import EquipmentDetails from "../../Components/EquipmentDetails/EquipmentDetails";
import ReportForm from "../../Components/ReportForm/ReportForm";
import ReportList from "../../Components/ReportList/ReportList";
import "bootstrap/dist/css/bootstrap.min.css";

const InfoEquipment = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        date: "",
        title: "",
        description: "",
        maintenanceType: "",
        duration: "",
        workerId: 1,
        equipmentId: id,
        startTime: "00:00:00",
        endTime: "00:00:00",
    });

    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (id) {
            const fetchEquipment = async () => {
                try {
                    await getEquipmentById(id);
                } catch (error) {
                    console.error("Error al obtener el equipo:", error);
                }
            };

            const fetchReports = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/reports/equipment/${id}`);
                    if (response.ok) {
                        const data = await response.json();
                        setReports(data);
                    } else {
                        console.error("Error al obtener los informes:", response.status);
                    }
                } catch (error) {
                    console.error("Error de conexión:", error);
                }
            };

            fetchEquipment();
            fetchReports();
        }
    }, [id]);

    const fetchReportDetails = async (reportId) => {
        try {
            const data = await getReportById(reportId);
            setSelectedReport(data);
            setShowModal(true);
        } catch (error) {
            console.error("Error al obtener detalles del informe:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.date || !formData.title || !formData.maintenanceType || !formData.duration) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        if (isNaN(formData.duration) || formData.duration <= 0) {
            alert("La duración debe ser un número válido mayor que 0.");
            return;
        }

        try {
            const response = await createReport({ ...formData, startTime: formData.startTime || "00:00:00", endTime: formData.endTime || "00:00:00" });

            if (response.ok) {
                alert("Reporte creado con éxito");
                window.location.reload();
            } else {
                throw new Error("Error al crear el reporte");
            }
        } catch (error) {
            console.error("Error al crear el reporte:", error);
            alert("Error al crear el reporte: " + error.message);
        }
    };

    return (
        <div className="container-fluid min-vh-100 p-4" style={{ backgroundColor: "#1e293b", color: "#f8fafc" }}>
            {/* Encabezado con estilos mejorados */}
            <header
                className="d-flex align-items-center justify-content-between text-center p-4 shadow-lg rounded border"
                style={{
                    background: "linear-gradient(to right, #0dcaf0, #1e3a5f)",
                    border: "3px solid #0dcaf0",
                    color: "white"
                }}
            >
                <button
                    className="btn btn-lg text-light fw-bold px-4"
                    style={{ backgroundColor: "#0dcaf0", borderRadius: "10px", border: "2px solid white" }}
                    onClick={() => navigate(-1)}
                >
                    <FaArrowLeft className="me-2" /> Volver
                </button>

                <div className="flex-grow-1">
                    <h1
                        className="fw-bold text-uppercase"
                        style={{
                            background: "linear-gradient(45deg, #f8fafc, #c9e3f5)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        }}
                    >
                        <FaClipboardList className="me-2" /> Gestión de Equipos y Reportes
                    </h1>
                    <p className="fs-5">Consulta, gestiona y registra reportes de mantenimiento de equipos.</p>
                </div>
            </header>

            {/* Información del equipo */}
            <div className="mb-4">
                {id && <EquipmentDetails equipmentId={id} />}
            </div>

            {/* Sección de Reportes */}
            <div className="row">
                <div className="col-lg-6">
                    <div className="card p-3 shadow-lg border-0" style={{ backgroundColor: "#334155", color: "#f8fafc" }}>
                        <div className="card-header text-dark fw-bold text-center" style={{ backgroundColor: "#0dcaf0", borderRadius: "10px" }}>
                            <h4><FaClipboardList /> Crear Reporte</h4>
                        </div>
                        <div className="card-body">
                            <ReportForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} />
                        </div>
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="card p-3 shadow-lg border-0" style={{ backgroundColor: "#334155", color: "#f8fafc" }}>
                        <div className="card-header text-dark fw-bold text-center" style={{ backgroundColor: "#0dcaf0", borderRadius: "10px" }}>
                            <h4>📋 Reportes Anteriores</h4>
                        </div>
                        <div className="card-body">
                            <ReportList reports={reports} fetchReportDetails={fetchReportDetails} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de Detalles del Reporte */}
            {showModal && selectedReport && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content border" style={{ backgroundColor: "#1e293b", color: "#f8fafc", border: "3px solid #0dcaf0" }}>
                            <div className="modal-header border-0">
                                <h5 className="modal-title text-info fw-bold">Detalles del Informe</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p><strong>📅 Fecha:</strong> {selectedReport.date}</p>
                                <p><strong>🏷️ Título:</strong> {selectedReport.title}</p>
                                <p><strong>📝 Descripción:</strong> {selectedReport.description}</p>
                                <p><strong>🛠️ Tipo de Mantenimiento:</strong> {selectedReport.maintenanceType}</p>
                                <p><strong>⏳ Duración:</strong> {selectedReport.duration} horas</p>
                                <p><strong>🕒 Inicio:</strong> {selectedReport.startTime}</p>
                                <p><strong>🕒 Fin:</strong> {selectedReport.endTime}</p>
                            </div>
                            <div className="modal-footer border-0">
                                <button type="button" className="btn text-light fw-bold px-4" style={{ backgroundColor: "#0dcaf0", borderRadius: "10px" }} onClick={() => setShowModal(false)}>
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InfoEquipment;
