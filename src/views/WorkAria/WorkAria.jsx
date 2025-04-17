import React, { useState, useEffect } from "react";
import { FaList, FaBriefcase, FaFileAlt, FaTools } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "../../Components/Profile/Profile";
import EquipmentList from "../../Components/EquipmentList/EquipmentList";
import WorkerInspections from "../../Components/WorkerInspections/WorkerInspections";
import PendingInspections from "../../Components/PedingInspections/PendingInspections";
import EmployeeReportsList from "../../Components/EmployeeReportsList/EmployeeReportsList";
import SettingsComponent from "../../Components/SettingsComponent/SettingsComponent"; // Importar ajustes
import { getInspectionsByWorker } from "../../Services/INspectionService";
import { getUserIdFromToken } from "../../Services/authUtils";

const WorkArea = () => {
    const [activeComponent, setActiveComponent] = useState("equipments");
    const [pendingCount, setPendingCount] = useState(0);
    const workerId = getUserIdFromToken();

    useEffect(() => {
        if (!workerId) return;

        const fetchPendingInspections = async () => {
            try {
                const inspections = await getInspectionsByWorker(workerId);
                const today = new Date().toISOString().split("T")[0];

                const delayedInspections = inspections.filter(
                    (inspection) => !inspection.completed && inspection.date < today
                );

                setPendingCount(delayedInspections.length);
            } catch (error) {
                console.error("Error al obtener inspecciones:", error);
            }
        };

        fetchPendingInspections();
    }, [workerId]);

    return (
        <div className="container-fluid p-4" style={{ backgroundColor: "#1e3a5f", color: "white", minHeight: "100vh" }}>
            {/* Header */}
            <header className="d-flex justify-content-between align-items-center p-3 rounded shadow-lg" style={{ backgroundColor: "#102a43", color: "white" }}>
                <h2>Gestión de Mantenimiento</h2>
                <Profile onSettingsClick={() => setActiveComponent("settings")} />
            </header>

            {/* Sidebar & Main Content */}
            <div className="d-flex flex-nowrap mt-3" style={{ height: "calc(100vh - 120px)" }}>
                {/* Sidebar */}
                <aside
                    className="p-3 rounded shadow-lg flex-shrink-0"
                    style={{
                        minWidth: "250px",
                        maxWidth: "300px",
                        backgroundColor: "#334155",
                        height: "100%",
                        overflowY: "auto",
                    }}
                >
                    <h5 className="text-center mb-4 text-white">Menú</h5>
                    <ul className="list-unstyled">
                        <li className="mb-3">
                            <button
                                className="btn w-100 d-flex align-items-center justify-content-start text-white p-3 rounded shadow-sm"
                                style={{ backgroundColor: "#444c56", border: "none" }}
                                onClick={() => setActiveComponent("equipments")}
                            >
                                <FaList className="me-3" size={20} />
                                Lista de Equipos
                            </button>
                        </li>
                        <li className="mb-3 position-relative">
                            <button
                                className="btn w-100 d-flex align-items-center justify-content-start text-white p-3 rounded shadow-sm position-relative"
                                style={{ backgroundColor: "#444c56", border: "none" }}
                                onClick={() => setActiveComponent("pendingTasks")}
                            >
                                <FaBriefcase className="me-3" size={20} />
                                Tareas Pendientes
                                {pendingCount > 0 && (
                                    <span
                                        className="badge bg-danger position-absolute top-0 end-0 translate-middle"
                                        style={{ fontSize: "0.8rem", padding: "5px 8px", borderRadius: "50%" }}
                                    >
                                        {pendingCount}
                                    </span>
                                )}
                            </button>
                        </li>
                        <li className="mb-3">
                            <button
                                className="btn w-100 d-flex align-items-center justify-content-start text-white p-3 rounded shadow-sm"
                                style={{ backgroundColor: "#444c56", border: "none" }}
                                onClick={() => setActiveComponent("reports")}
                            >
                                <FaFileAlt className="me-3" size={20} />
                                Reportes
                            </button>
                        </li>
                        <li className="mb-3">
                            <button
                                className="btn w-100 d-flex align-items-center justify-content-start text-white p-3 rounded shadow-sm"
                                style={{ backgroundColor: "#444c56", border: "none" }}
                                onClick={() => setActiveComponent("workerInspections")}
                            >
                                <FaBriefcase className="me-3" size={20} />
                                Tareas del Día
                            </button>
                        </li>
                        <li className="mb-3">
                            <button
                                className="btn w-100 d-flex align-items-center justify-content-start text-white p-3 rounded shadow-sm"
                                style={{ backgroundColor: "#444c56", border: "none" }}
                                onClick={() => setActiveComponent("settings")}
                            >
                                <FaTools className="me-3" size={20} />
                                Configuración
                            </button>
                        </li>
                    </ul>
                </aside>

                {/* Main Content */}
                <main
                    className="flex-grow-1 ms-3 p-4 rounded shadow-lg"
                    style={{
                        minHeight: "60vh",
                        backgroundColor: "#102a43",
                        overflowY: "auto",
                    }}
                >
                    <h3 className="text-center text-info">Área de Gestión</h3>
                    <p className="text-center text-white">Seleccione una opción para visualizar la información correspondiente.</p>

                    {activeComponent === "equipments" && <EquipmentList />}
                    {activeComponent === "pendingTasks" && <PendingInspections />}
                    {activeComponent === "reports" && <EmployeeReportsList />}
                    {activeComponent === "workerInspections" && <WorkerInspections workerId={workerId} />}
                    {activeComponent === "settings" && <SettingsComponent />} {/* Muestra Configuración */}
                </main>
            </div>

            {/* Footer */}
            <footer className="bg-dark text-white text-center py-3 mt-4 rounded shadow-lg">
                <p className="mb-0">© 2025 Gestión de Mantenimiento | Todos los derechos reservados</p>
            </footer>
        </div>
    );
};

export default WorkArea;
