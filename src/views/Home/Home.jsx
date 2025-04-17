import { FaBuilding, FaCogs, FaFileAlt, FaClipboardCheck, FaUsers, FaSignOutAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div
            className="d-flex flex-column justify-content-between vh-100 position-relative"
            style={{ backgroundColor: "#1e3a5f", overflow: "hidden" }}
        >
            {/* Encabezado con botón de cerrar sesión */}
            <header className="bg-dark text-white py-3 shadow-lg">
                <div className="container d-flex justify-content-between align-items-center">
                    <div>
                        <h2 className="mb-1">Sistema de Mantenimiento</h2>
                        <p className="mb-0">Panel de administración para la gestión de mantenimiento.</p>
                    </div>
                    <button
                        className="btn btn-logout d-flex align-items-center gap-2 fw-bold"
                        onClick={() => navigate("/")}
                    >
                        <FaSignOutAlt size={20} /> Cerrar Sesión
                    </button>
                </div>
            </header>

            {/* Contenedor principal de botones */}
            <main className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center">
                <h1 className="text-info mb-4 fw-bold">Panel de Administración</h1>

                {/* Contenedor de botones */}
                <div className="container">
                    <div className="row g-4 justify-content-center">
                        {[
                            { icon: <FaBuilding size={40} />, text: "Empresas", route: "/company" },
                            { icon: <FaCogs size={40} />, text: "Equipos", route: "/equipment" },
                            { icon: <FaFileAlt size={40} />, text: "Informes", route: "/Report" },
                            { icon: <FaClipboardCheck size={40} />, text: "Inspecciones", route: "/inspection" },
                            { icon: <FaUsers size={40} />, text: "Trabajadores", route: "/workers" },
                        ].map(({ icon, text, route }, index) => (
                            <div key={index} className="col-md-4">
                                <button
                                    className="animated-btn w-100 py-3 d-flex align-items-center justify-content-center gap-3 shadow-lg"
                                    onClick={() => navigate(route)}
                                >
                                    {icon} {text}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Elementos decorativos */}
            <div className="decorative-circle top-left"></div>
            <div className="decorative-circle bottom-right"></div>

            {/* Pie de página */}
            <footer className="bg-dark text-white py-3 shadow-lg">
                <div className="container text-center">
                    <p className="mb-0">© 2025 Sistema de Mantenimiento | Todos los derechos reservados</p>
                </div>
            </footer>

            {/* Estilos para animaciones y mejoras visuales */}
            <style>
                {`
                /* Botones animados con borde blanco */
                .animated-btn {
                    font-size: 1.2rem;
                    background-color: #334155 !important; /* Color original */
                    color: white !important; /* Texto blanco */
                    border: 2px solid white !important; /* Borde blanco de 2px */
                    transition: all 0.3s ease-in-out;
                    border-radius: 12px;
                    position: relative;
                    overflow: hidden;
                }

                .animated-btn::before {
                    content: "";
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 300%;
                    height: 300%;
                    background: rgba(255, 255, 255, 0.1);
                    transition: all 0.4s ease-in-out;
                    border-radius: 50%;
                    transform: translate(-50%, -50%) scale(0);
                }

                .animated-btn:hover::before {
                    transform: translate(-50%, -50%) scale(1);
                }

                .animated-btn:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
                }

                .animated-btn:active {
                    transform: scale(0.95);
                }

                /* Botón de cerrar sesión */
                .btn-logout {
                    font-size: 1rem;
                    color: #1e3a5f; /* Color coherente con el tema */
                    background-color: #f8f9fa;
                    border: 2px solid #1e3a5f; /* Borde coherente con el fondo */
                    border-radius: 25px;
                    padding: 8px 16px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
                    transition: all 0.3s ease-in-out;
                }

                .btn-logout:hover {
                    color: #fff;
                    background-color: #1e3a5f;
                    border-color: #1e3a5f;
                    transform: scale(1.05);
                }

                .btn-logout:active {
                    transform: scale(0.95);
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
                }

                /* Elementos decorativos */
                .decorative-circle {
                    position: absolute;
                    width: 150px;
                    height: 150px;
                    background-color: #0dcaf0;
                    opacity: 0.2;
                    filter: blur(50px);
                    border-radius: 50%;
                }

                .top-left {
                    top: 10%;
                    left: 10%;
                }

                .bottom-right {
                    bottom: 15%;
                    right: 15%;
                    width: 200px;
                    height: 200px;
                    opacity: 0.1;
                    filter: blur(70px);
                }
                `}
            </style>
        </div>
    );
};

export default Home;
