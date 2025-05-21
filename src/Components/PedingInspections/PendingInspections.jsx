import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Para redirigir a /work/:id
import { getInspectionsByWorker, archiveInspection } from "../../Services/InspectionService";
import { getUserIdFromToken } from "../../Services/authUtils";
import { FaArchive, FaMapMarkerAlt } from "react-icons/fa"; // ✅ Iconos necesarios

const PendingInspections = () => {
    const [inspections, setInspections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // ✅ Hook para redirección
    const workerId = getUserIdFromToken();

    useEffect(() => {
        if (!workerId) {
            setError("No se encontró el ID del trabajador.");
            setLoading(false);
            return;
        }

        const fetchInspections = async () => {
            try {
                const allInspections = await getInspectionsByWorker(workerId);
                const today = new Date().toISOString().split("T")[0];

                const pendingInspections = allInspections.filter(
                    (inspection) => !inspection.completed && inspection.date < today
                );

                setInspections(pendingInspections);
            } catch (err) {
                console.error(err);
                setError("Error al cargar inspecciones.");
            } finally {
                setLoading(false);
            }
        };

        fetchInspections();
    }, [workerId]);

    const handleArchiveInspection = async (id) => {
        try {
            await archiveInspection(id);
            setInspections((prevInspections) =>
                prevInspections.filter((insp) => insp.id !== id)
            );
        } catch (err) {
            console.error("Error al archivar la inspección:", err);
            setError("Error al archivar la inspección.");
        }
    };

    const handleUbicar = (inspectionId) => {
        navigate(`/work/${inspectionId}`);
    };

    if (loading) return <p className="text-center text-light">Cargando inspecciones...</p>;
    if (error) return <p className="text-center text-danger">{error}</p>;
    if (inspections.length === 0)
        return <p className="text-center text-warning">No hay inspecciones pendientes.</p>;

    return (
        <div className="container p-3">
            <h3 className="text-info text-center">Inspecciones Pendientes</h3>
            <ul className="list-group">
                {inspections.map((inspection) => (
                    <li
                        key={inspection.id}
                        className="list-group-item d-flex justify-content-between align-items-center bg-dark text-white"
                    >
                        <div>
                            <strong>Equipo:</strong> {inspection.equipment ? inspection.equipment.name : "No asignado"}
                            <br />
                            <strong>Fecha:</strong> {inspection.date || "Sin fecha"}
                        </div>
                        <div className="d-flex">
                            <button
                                className="btn btn-info me-2"
                                onClick={() => handleUbicar(inspection.id)}
                            >
                                <FaMapMarkerAlt className="me-2" />
                                Información de ubicación
                            </button>
                            <button
                                className="btn btn-success btn-sm"
                                onClick={() => handleArchiveInspection(inspection.id)}
                            >
                                <FaArchive /> Archivar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PendingInspections;
