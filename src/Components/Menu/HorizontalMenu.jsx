import React from "react";
import { FaBuilding, FaCogs, FaFileAlt, FaClipboardCheck, FaUsers, FaCalendarCheck, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const HorizontalMenu = () => {
    const navigate = useNavigate();

    return (
        <nav className="bg-dark w-100 py-2">
            <div className="container">
                <ul className="nav justify-content-center">
                    {/* Enlace al Inicio */}
                    <li className="nav-item">
                        <a
                            className="nav-link text-white px-3 py-2 rounded-pill"
                            style={{ fontSize: "1rem" }}
                            onClick={() => navigate("/home")}
                        >
                            <FaHome size={20} className="me-2" /> Inicio
                        </a>
                    </li>

                    {/* Elementos del menú */}
                    {[
                        { icon: <FaBuilding size={20} />, text: "Empresas", route: "/company" },
                        { icon: <FaCogs size={20} />, text: "Equipos", route: "/equipment" },
                        { icon: <FaFileAlt size={20} />, text: "Informes", route: "/Report" },
                        { icon: <FaClipboardCheck size={20} />, text: "Inspecciones", route: "/inspection" },
                        { icon: <FaUsers size={20} />, text: "Trabajadores", route: "/workers" },
                      
                    ].map(({ icon, text, route }, index) => (
                        <li key={index} className="nav-item">
                            <a
                                className="nav-link text-white px-3 py-2 rounded-pill"
                                style={{ fontSize: "1rem" }}
                                onClick={() => navigate(route)}
                            >
                                {icon} {text}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default HorizontalMenu;
