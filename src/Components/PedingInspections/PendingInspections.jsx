import React, { useEffect, useState } from "react";
import { getInspectionsByWorker, archiveInspection } from "../../Services/INspectionService"; // Importa el servicio
import { getUserIdFromToken } from "../../Services/authUtils";
import { FaArchive } from "react-icons/fa";

const PendingInspections = () => {
    const [inspections, setInspections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const workerId = getUserIdFromToken(); // Obtener ID del trabajador desde el token

    useEffect(() => {
        if (!workerId) {
            setError("No se encontró el ID del trabajador.");
            setLoading(false);
            return;
        }

        const fetchInspections = async () => {
            try {
                const allInspections = await getInspectionsByWorker(workerId);
                const today = new Date().toISOString().split("T")[0]; // Fecha actual (YYYY-MM-DD)

                // Filtrar inspecciones pendientes (sin completar y con fecha anterior a hoy)
                const pendingInspections = allInspections.filter(
                    (inspection) => !inspection.completed && inspection.date < today
                );

                setInspections(pendingInspections);
            } catch (err) {
                setError("Error al cargar inspecciones.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchInspections();
    }, [workerId]);

    const handleArchiveInspection = async (id) => {
        try {
            await archiveInspection(id); // Usa la función del servicio
            setInspections((prevInspections) => prevInspections.filter((insp) => insp.id !== id));
        } catch (err) {
            console.error("Error al archivar la inspección:", err);
            setError("Error al archivar la inspección.");
        }
    };

    if (loading) return <p className="text-center text-light">Cargando inspecciones...</p>;
    if (error) return <p className="text-center text-danger">{error}</p>;
    if (inspections.length === 0) return <p className="text-center text-warning">No hay inspecciones pendientes.</p>;

    return (
        <div className="container p-3">
            <h3 className="text-info text-center">Inspecciones Pendientes</h3>
            <ul className="list-group">
                {inspections.map((inspection) => (
                    <li key={inspection.id} className="list-group-item d-flex justify-content-between align-items-center bg-dark text-white">
                        <div>
                            <strong>Equipo:</strong> {inspection.equipment ? inspection.equipment.name : "No asignado"} <br />
                            <strong>Fecha:</strong> {inspection.date || "Sin fecha"}
                        </div>
                        <button className="btn btn-success btn-sm" onClick={() => handleArchiveInspection(inspection.id)}>
                            <FaArchive /> Archivar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PendingInspections;
