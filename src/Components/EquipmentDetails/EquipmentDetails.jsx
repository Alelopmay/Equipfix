import React, { useEffect, useState } from "react";
import { getEquipmentById } from "../../Services/EquipmentService";
import { format } from "date-fns"; // Para formatear la fecha

const EquipmentDetails = ({ equipmentId }) => {
    const [equipment, setEquipment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Llamada al servicio para obtener el equipo por su ID
        const fetchEquipment = async () => {
            try {
                const data = await getEquipmentById(equipmentId);
                setEquipment(data); // Guardamos el equipo en el estado
            } catch (error) {
                setError("No se pudo obtener la información del equipo.");
            } finally {
                setLoading(false); // Ya terminamos de cargar los datos
            }
        };

        fetchEquipment();
    }, [equipmentId]); // Este efecto se ejecuta cada vez que cambia el ID del equipo

    if (loading) return <div className="text-center">Cargando...</div>;
    if (error) return <div className="text-center text-danger">{error}</div>;

    // Formatear la fecha de instalación si existe
    const formattedDate = equipment.installationDate
        ? format(new Date(equipment.installationDate), "dd/MM/yyyy")
        : "Fecha no disponible";

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8">
                    {/* Tarjeta con nuevos estilos, sombras y bordes subrayados */}
                    <div className="card shadow-lg rounded-3 border-0" style={{ backgroundColor: "#f4f7fc" }}>
                        <div className="card-header" style={{ backgroundColor: "#003366", color: "white", textAlign: "center", borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                            <h4 className="m-0">Detalles del Equipo</h4>
                        </div>
                        <div className="card-body" style={{ backgroundColor: "#ffffff", color: "#333", padding: "30px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
                            {/* Información organizada en columnas */}
                            <div className="row">
                                {/* Fila 1: Información del equipo */}
                                <div className="col-12 col-md-6 mb-4">
                                    <div className="d-flex flex-column align-items-start">
                                        <span className="fw-bold text-muted" style={{ textDecoration: "underline" }}>Serie</span>
                                        <span>{equipment.serialNumber}</span>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 mb-4">
                                    <div className="d-flex flex-column align-items-start">
                                        <span className="fw-bold text-muted" style={{ textDecoration: "underline" }}>Tipo</span>
                                        <span>{equipment.type}</span>
                                    </div>
                                </div>

                                {/* Fila 2: Información adicional */}
                                <div className="col-12 col-md-6 mb-4">
                                    <div className="d-flex flex-column align-items-start">
                                        <span className="fw-bold text-muted" style={{ textDecoration: "underline" }}>Marca</span>
                                        <span>{equipment.brand}</span>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 mb-4">
                                    <div className="d-flex flex-column align-items-start">
                                        <span className="fw-bold text-muted" style={{ textDecoration: "underline" }}>Fecha de Instalación</span>
                                        <span>{formattedDate}</span>
                                    </div>
                                </div>

                                {/* Fila 3: Descripción */}
                                <div className="col-12 mb-4">
                                    <div className="d-flex flex-column align-items-start">
                                        <span className="fw-bold text-muted" style={{ textDecoration: "underline" }}>Descripción</span>
                                        <span>{equipment.description || "Descripción no disponible"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EquipmentDetails;
