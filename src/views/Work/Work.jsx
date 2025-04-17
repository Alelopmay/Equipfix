import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getInspectionDetailsById } from "../../Services/INspectionService";
import { FaArrowLeft, FaSave, FaArchive } from "react-icons/fa";
import { getUserIdFromToken } from "../../Services/authUtils";
import "bootstrap/dist/css/bootstrap.min.css";

const Work = () => {
    const { inspectionId } = useParams();
    const navigate = useNavigate();

    const [inspectionDetails, setInspectionDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showReportForm, setShowReportForm] = useState(false);
    const [formData, setFormData] = useState({
        date: "",
        title: "",
        description: "",
        maintenanceType: "",
        duration: "",
        startTime: "",
        endTime: "",
        equipmentId: "",
        workerId: "",
    });

    useEffect(() => {
        const fetchInspectionDetails = async () => {
            try {
                const data = await getInspectionDetailsById(inspectionId);
                setInspectionDetails(data);
            } catch (err) {
                setError("Error al cargar los detalles de la inspección.");
            } finally {
                setLoading(false);
            }
        };

        if (inspectionId) fetchInspectionDetails();
    }, [inspectionId]);

    useEffect(() => {
        const userId = getUserIdFromToken();
        setFormData((prevState) => ({
            ...prevState,
            workerId: userId,
        }));
    }, []);

    const goBack = () => navigate(-1);

    const toggleReportForm = () => setShowReportForm(!showReportForm);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        alert("Reporte enviado!");
        setFormData({
            date: "",
            title: "",
            description: "",
            maintenanceType: "",
            duration: "",
            startTime: "",
            endTime: "",
            equipmentId: inspectionDetails?.equipment_serial || "",
            workerId: formData.workerId,
        });
        setShowReportForm(false);
    };

    const handleArchive = () => {
        alert("Inspección archivada.");
    };

    if (loading) return <div className="text-center text-light mt-5">Cargando detalles...</div>;
    if (error) return <div className="text-center text-danger mt-5">{error}</div>;
    if (!inspectionDetails) return <div className="text-center text-warning mt-5">Inspección no encontrada.</div>;

    const {
        inspection_id,
        inspection_date,
        inspection_description,
        inspection_completed,
        worker_name,
        worker_surname,
        equipment_serial,
        equipment_type,
        equipment_brand,
        equipment_installation_date,
        company_name,
        company_address,
        company_association_date
    } = inspectionDetails;

    return (
        <div
            className="min-vh-100 d-flex flex-column"
            style={{
                background: "linear-gradient(to bottom right, #0f2027, #203a43, #2c5364)",
                color: "#fff",
            }}
        >
            {/* Encabezado con fondo armónico */}
            <div className="w-100 py-3 px-4" style={{ backgroundColor: "#1a2a36" }}>
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <h2 className="text-white fw-bold mb-0">Detalle de Inspección</h2>
                    <button className="btn btn-outline-light d-flex align-items-center gap-2" onClick={goBack}>
                        <FaArrowLeft /> Volver
                    </button>
                </div>
            </div>

            {/* Contenido con columnas decorativas */}
            <div className="flex-grow-1 d-flex">
                {/* Columna izquierda decorativa */}
                <div
                    className="d-none d-lg-block"
                    style={{
                        width: "50px",
                        backgroundColor: "#1b2c3d",
                    }}
                />

                {/* Contenido principal */}
                <div className="flex-grow-1 d-flex justify-content-center px-3 py-5">
                    <div
                        className="container p-4 shadow-lg rounded"
                        style={{
                            backgroundColor: "#1f2937",
                            border: "1px solid rgba(255,255,255,0.1)",
                            boxShadow: "0 0 30px rgba(0, 255, 255, 0.1)",
                            maxWidth: "1100px",
                            width: "100%",
                        }}
                    >
                        <div className="d-flex justify-content-between align-items-center border-bottom border-light pb-3 mb-4">
                            <h3 className="text-info fw-bold mb-0">Inspección #{inspection_id}</h3>
                            <div className="d-flex gap-2">
                                <button className="btn btn-outline-success" onClick={toggleReportForm}>
                                    <FaSave /> Hacer Informe
                                </button>
                                <button className="btn btn-outline-warning" onClick={handleArchive}>
                                    <FaArchive /> Archivar
                                </button>
                            </div>
                        </div>

                        {/* Información de la inspección */}
                        <div className="row mb-4">
                            <div className="col-md-6 border-end pe-4">
                                <h5 className="text-uppercase border-bottom pb-2 mb-3">Información de la Inspección</h5>
                                <p><strong>Fecha:</strong> {new Date(inspection_date).toLocaleDateString()}</p>
                                <p><strong>Estado:</strong> {inspection_completed ? <span className="text-success">✅ Completada</span> : <span className="text-warning">⏳ Pendiente</span>}</p>
                                <p><strong>Descripción:</strong> {inspection_description || "Sin información"}</p>
                            </div>
                            <div className="col-md-6 ps-4">
                                <h5 className="text-uppercase border-bottom pb-2 mb-3">Trabajador Asignado</h5>
                                <p><strong>Nombre:</strong> {worker_name} {worker_surname}</p>
                            </div>
                        </div>

                        {/* Detalles del equipo */}
                        <div className="row mb-4">
                            <div className="col-md-12">
                                <h5 className="text-uppercase border-bottom pb-2 mb-3">Detalles del Equipo</h5>
                                <div className="row">
                                    <div className="col-md-3"><p><strong>Tipo:</strong> {equipment_type}</p></div>
                                    <div className="col-md-3"><p><strong>Marca:</strong> {equipment_brand}</p></div>
                                    <div className="col-md-3"><p><strong>Serial:</strong> {equipment_serial}</p></div>
                                    <div className="col-md-3"><p><strong>Instalación:</strong> {new Date(equipment_installation_date).toLocaleDateString()}</p></div>
                                </div>
                            </div>
                        </div>

                        {/* Empresa */}
                        <div className="row">
                            <div className="col-md-12">
                                <h5 className="text-uppercase border-bottom pb-2 mb-3">Datos de la Empresa</h5>
                                <div className="row">
                                    <div className="col-md-6"><p><strong>Nombre:</strong> {company_name}</p></div>
                                    <div className="col-md-6"><p><strong>Dirección:</strong> {company_address}</p></div>
                                    <div className="col-md-6"><p><strong>Asociada desde:</strong> {new Date(company_association_date).toLocaleDateString()}</p></div>
                                </div>
                            </div>
                        </div>

                        {/* Formulario para el informe */}
                        {showReportForm && (
                            <div className="card my-4 bg-dark text-light">
                                <div className="card-header bg-info text-white">
                                    <h3><FaSave /> Crear Reporte</h3>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleFormSubmit}>
                                        {/* Campos del formulario aquí... */}
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Columna derecha decorativa */}
                <div
                    className="d-none d-lg-block"
                    style={{
                        width: "50px",
                        backgroundColor: "#1b2c3d",
                    }}
                />
            </div>
        </div>
    );
};

export default Work;

