import React, { useState, useEffect } from "react";
import { FaSave, FaClipboardList } from "react-icons/fa";
import { getUserIdFromToken } from "../../Services/authUtils";
import { createReport } from "../../Services/ReportService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReportForm = ({ formData, setFormData, onReportCreated }) => {
    const [userId, setUserId] = useState(null);

    const maintenanceTypes = ["Preventivo", "Correctivo", "Predictivo"];

    useEffect(() => {
        const userIdFromToken = getUserIdFromToken();
        setUserId(userIdFromToken);
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault(); // Evita recargar la página

        if (!userId) {
            toast.error("Error: No se pudo obtener el ID del trabajador.");
            return;
        }

        const updatedFormData = { ...formData, workerId: userId };

        try {
            const response = await createReport(updatedFormData);
            console.log("Reporte creado exitosamente:", response);

            // Mostrar mensaje de éxito
            toast.success("✅ Reporte creado correctamente!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });

            // Limpiar el formulario después de crear el reporte
            setFormData({
                date: "",
                title: "",
                description: "",
                maintenanceType: "",
                duration: "",
                startTime: "",
                endTime: "",
            });

            if (onReportCreated && typeof onReportCreated === "function") {
                onReportCreated(response);
            }
        } catch (error) {
            console.error("Error al crear el reporte:", error);
            toast.error("❌ Error al crear el reporte, intenta de nuevo.");
        }
    };

    return (
        <div className="card my-4 bg-dark text-light">
            <ToastContainer /> {/* Para mostrar notificaciones */}
            <div className="card-header bg-info text-white">
                <h3><FaClipboardList /> Crear Reporte</h3>
            </div>
            <div className="card-body">
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Fecha:</label>
                        <input
                            type="date"
                            className="form-control"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Título:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Descripción:</label>
                        <textarea
                            className="form-control"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Tipo de Mantenimiento:</label>
                        <select
                            className="form-select"
                            value={formData.maintenanceType}
                            onChange={(e) => setFormData({ ...formData, maintenanceType: e.target.value })}
                            required
                        >
                            <option value="">Seleccione un tipo</option>
                            {maintenanceTypes.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Duración (horas):</label>
                        <input
                            type="number"
                            className="form-control"
                            min="1"
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Hora de inicio:</label>
                        <input
                            type="time"
                            className="form-control"
                            value={formData.startTime}
                            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Hora de fin:</label>
                        <input
                            type="time"
                            className="form-control"
                            value={formData.endTime}
                            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-info w-100">
                        <FaSave /> Guardar Reporte
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReportForm;
