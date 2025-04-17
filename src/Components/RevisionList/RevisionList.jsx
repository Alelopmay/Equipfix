import React, { useState, useEffect } from "react";
import { getAllInspections } from "../../Services/INspectionService";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RevisionList = () => {
    const [inspections, setInspections] = useState([]);
    const [filteredInspections, setFilteredInspections] = useState([]);
    const [searchDate, setSearchDate] = useState("");
    const [filterStatus, setFilterStatus] = useState("todas");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInspections = async () => {
            try {
                const data = await getAllInspections();
                setInspections(data);
                setFilteredInspections(data);
            } catch (error) {
                console.error("Error al obtener las inspecciones:", error);
            }
        };
        fetchInspections();
    }, []);

    useEffect(() => {
        let filtered = inspections;

        if (searchDate) {
            filtered = filtered.filter(
                (inspection) =>
                    new Date(inspection.date).toLocaleDateString() ===
                    new Date(searchDate).toLocaleDateString()
            );
        }

        if (filterStatus === "realizadas")
            filtered = filtered.filter((inspection) => inspection.completed);
        else if (filterStatus === "no realizadas")
            filtered = filtered.filter((inspection) => !inspection.completed);

        setFilteredInspections(filtered);
    }, [searchDate, filterStatus, inspections]);

    const handleViewClick = (inspection) => {
        console.log("📝 Reporte seleccionado:", inspection);
        navigate(`/work/${inspection.id}`);
    };

    return (
        <div className="revision-container bg-dark text-white p-4 rounded shadow-lg">
            <h1 className="text-info text-center text-md-start mb-4">Inspecciones</h1>

            <div className="mb-3">
                <input
                    type="date"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                    className="form-control"
                />
            </div>

            <div className="d-flex flex-wrap gap-3 mb-4">
                <button
                    className={`btn ${filterStatus === "todas" ? "btn-primary" : "btn-outline-primary"} btn-sm`}
                    onClick={() => setFilterStatus("todas")}
                >
                    Ver Todas
                </button>
                <button
                    className={`btn ${filterStatus === "realizadas" ? "btn-success" : "btn-outline-success"} btn-sm`}
                    onClick={() => setFilterStatus("realizadas")}
                >
                    Realizadas
                </button>
                <button
                    className={`btn ${filterStatus === "no realizadas" ? "btn-danger" : "btn-outline-danger"} btn-sm`}
                    onClick={() => setFilterStatus("no realizadas")}
                >
                    No Realizadas
                </button>
            </div>

            {/* 🖥️ Tabla para escritorio */}
            <div className="table-responsive mt-2 d-none d-md-block" style={{ maxHeight: "400px", overflowY: "auto" }}>
                <table className="table table-dark table-striped text-center">
                    <thead>
                        <tr>
                            <th>Estado</th>
                            <th>Fecha</th>
                            <th>Descripción</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInspections.map((inspection) => (
                            <tr key={inspection.id}>
                                <td>
                                    <span
                                        className="d-inline-block rounded-circle"
                                        style={{
                                            width: "15px",
                                            height: "15px",
                                            backgroundColor: inspection.completed ? "green" : "red",
                                        }}
                                    ></span>
                                </td>
                                <td>{new Date(inspection.date).toLocaleDateString()}</td>
                                <td>{inspection.description}</td>
                                <td>
                                    <button
                                        className="btn btn-info btn-sm px-3 py-2 fw-bold"
                                        onClick={() => handleViewClick(inspection)}
                                    >
                                        <FaEye className="me-1" /> Ver Detalles
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 📱 Carrusel para móvil */}
            <div className="d-md-none mt-4" style={{ maxHeight: "400px", overflowY: "auto" }}>
                {filteredInspections.map((inspection) => (
                    <div key={inspection.id} className="card bg-secondary text-white mb-3 p-3 rounded">
                        <div className="d-flex justify-content-between align-items-center">
                            <h5 className="fs-4 mb-0">Estado:</h5>
                            <span
                                className="rounded-circle"
                                style={{
                                    width: "20px",
                                    height: "20px",
                                    backgroundColor: inspection.completed ? "green" : "red",
                                    display: "inline-block",
                                }}
                            ></span>
                        </div>
                        <p><strong>Fecha:</strong> {new Date(inspection.date).toLocaleDateString()}</p>
                        <p><strong>Descripción:</strong> {inspection.description}</p>
                        <div className="d-flex justify-content-center">
                            <button
                                className="btn btn-info btn-lg px-4 fw-bold d-flex align-items-center"
                                onClick={() => handleViewClick(inspection)}
                            >
                                <FaEye className="me-2" /> Ver Detalles
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RevisionList;
