import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaTools } from "react-icons/fa";
import { BsGearFill } from "react-icons/bs";
import { login } from "../../Services/authService";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const category = await login(username, password);
            switch (category.toLowerCase().replace(" ", "_")) {
                case "sub_admin":
                    navigate("/home");
                    break;
                case "mantenimiento":
                    navigate("/WorkAria");
                    break;
                default:
                    setError("Rol no reconocido");
            }
        } catch (error) {
            setError("Usuario o contraseña incorrectos");
        }
    };

    return (
        <div
            className="d-flex flex-column vh-100 justify-content-center align-items-center position-relative"
            style={{
                backgroundColor: "#1e3a5f",
                overflow: "hidden",
                backgroundImage: "radial-gradient(#0dcaf020 1px, transparent 1px)",
                backgroundSize: "40px 40px",
            }}
        >
            {/* Título superior */}
            <div className="text-center mb-4">
                <h1 style={{
                    color: "#0dcaf0",
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    textShadow: "2px 2px 10px rgba(0,0,0,0.6)"
                }}>
                    Plataforma de Mantenimiento
                </h1>
                <p className="text-light" style={{ fontSize: "1.1rem", opacity: 0.8 }}>
                    Control y seguimiento técnico eficiente
                </p>
            </div>

            {/* Icono decorativo */}
            <BsGearFill
                size={100}
                className="position-absolute"
                style={{
                    top: 30,
                    right: 30,
                    opacity: 0.05,
                    transform: "rotate(45deg)"
                }}
                color="#0dcaf0"
            />

            {/* Tarjeta login con decoraciones */}
            <div
                className="card p-4 shadow-lg border-0 rounded position-relative glass-effect"
                style={{
                    width: "370px",
                    background: "#334155",
                    border: "1px solid #0dcaf0",
                    boxShadow:
                        "0 0 20px rgba(13, 202, 240, 0.25), inset 0 0 10px rgba(255,255,255,0.05)",
                    transition: "all 0.4s ease",
                    backdropFilter: "blur(2px)",
                }}
            >
                {/* Glow decorativo en esquinas */}
                <div
                    className="position-absolute"
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "12px",
                        boxShadow: "0 0 30px rgba(13, 202, 240, 0.2)",
                        zIndex: -1,
                        top: 0,
                        left: 0
                    }}
                ></div>

                <div className="text-center mb-3">
                    <FaTools size={50} color="#0dcaf0" />
                    <h2 className="mt-2" style={{
                        color: "#0dcaf0",
                        textShadow: "1px 1px 6px rgba(0,0,0,0.3)"
                    }}>
                        Iniciar Sesión
                    </h2>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label text-light">Usuario</label>
                        <div className="input-group rounded bg-dark border border-info shadow-sm">
                            <span className="input-group-text bg-transparent border-0">
                                <FaUser color="#0dcaf0" />
                            </span>
                            <input
                                type="text"
                                className="form-control bg-transparent text-light border-0"
                                placeholder="Ingrese su usuario"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                style={{
                                    outline: "none",
                                    boxShadow: "inset 0 0 5px rgba(13, 202, 240, 0.2)",
                                }}
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label text-light">Contraseña</label>
                        <div className="input-group rounded bg-dark border border-info shadow-sm">
                            <span className="input-group-text bg-transparent border-0">
                                <FaLock color="#0dcaf0" />
                            </span>
                            <input
                                type="password"
                                className="form-control bg-transparent text-light border-0"
                                placeholder="Ingrese su contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{
                                    outline: "none",
                                    boxShadow: "inset 0 0 5px rgba(13, 202, 240, 0.2)",
                                }}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn w-100 fw-bold text-dark"
                        style={{
                            backgroundColor: "#0dcaf0",
                            border: "none",
                            boxShadow: "0 0 12px rgba(13, 202, 240, 0.6)",
                            transition: "all 0.3s ease-in-out",
                        }}
                        onMouseOver={(e) => e.target.style.boxShadow = "0 0 18px rgba(13, 202, 240, 0.9)"}
                        onMouseOut={(e) => e.target.style.boxShadow = "0 0 12px rgba(13, 202, 240, 0.6)"}
                    >
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
