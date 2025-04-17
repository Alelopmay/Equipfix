import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaArchive } from 'react-icons/fa';  // Importamos los iconos
import { getInspectionsByWorker } from '../../Services/INspectionService';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const WorkerInspections = ({ workerId }) => {
    const [inspections, setInspections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Usar el hook de navegación

    useEffect(() => {
        const fetchInspections = async () => {
            try {
                const data = await getInspectionsByWorker(workerId);
                // Filtrar las inspecciones para mostrar solo las del día
                const today = new Date();
                const todayInspections = data.filter((inspection) => {
                    const inspectionDate = new Date(inspection.date);
                    // Comparamos solo la fecha, sin considerar la hora
                    return inspectionDate.toDateString() === today.toDateString();
                });

                // Añadir una inspección de prueba
                todayInspections.push({
                    id: 1741526857841,
                    date: new Date(),
                    description: 'Inspección de prueba',
                    completed: false,
                });

                setInspections(todayInspections);
            } catch (err) {
                setError('No se pudieron cargar las inspecciones.');
            } finally {
                setLoading(false);
            }
        };

        if (workerId) {
            fetchInspections();
        }
    }, [workerId]);

    const handleUbicar = (inspectionId) => {
        console.log(`Ubicando la inspección con ID: ${inspectionId}`);
        // Redirigir a la página de "Work" pasando el id de la inspección
        navigate(`/work/${inspectionId}`);
    };

    const handleArchivar = (inspectionId) => {
        console.log(`Archivando la inspección con ID: ${inspectionId}`);
        // Aquí puedes agregar la lógica para archivar la inspección
    };

    if (loading) return <p>Cargando inspecciones...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="table-responsive">
            <h3>Inspecciones del Trabajador</h3>
            {inspections.length === 0 ? (
                <p>No hay inspecciones para hoy.</p>
            ) : (
                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Descripción</th>
                            <th>Completada</th>
                            <th>Acciones</th> {/* Columna de botones */}
                        </tr>
                    </thead>
                    <tbody>
                        {inspections.map((inspection) => (
                            <tr key={inspection.id}>
                                <td>{new Date(inspection.date).toLocaleDateString('es-ES')}</td>  {/* Asegurando formato de fecha */}
                                <td>{inspection.description}</td>
                                <td>{inspection.completed ? 'Sí' : 'No'}</td>
                                <td>
                                    {/* Botón Ubicar con icono */}
                                    <button
                                        className="btn btn-info me-2"
                                        onClick={() => handleUbicar(inspection.id)} // Redirigir al hacer click
                                    >
                                        <FaMapMarkerAlt className="me-2" />
                                        Ubicar
                                    </button>

                                    {/* Botón Archivar con icono */}
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => handleArchivar(inspection.id)}
                                    >
                                        <FaArchive className="me-2" />
                                        Archivar
                                    </button>
                                </td> {/* Aquí van los botones */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default WorkerInspections;
