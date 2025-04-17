import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Hook de navegación
import { FaUser, FaLock, FaTools } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { login } from "../../Services/authService";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Hook para la navegación

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const category = await login(username, password);
            console.log("Categoría recibida:", category); // Depuración

            switch (category.toLowerCase().replace(" ", "_")) {  // Normaliza la categoría
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
            className="d-flex vh-100 justify-content-center align-items-center position-relative"
            style={{ backgroundColor: "#1e3a5f", overflow: "hidden" }}
        >
            <div className="card p-4 shadow-lg border-0 rounded" style={{ width: "350px", background: "#334155" }}>
                <div className="text-center mb-3">
                    <FaTools size={50} color="#0dcaf0" />
                    <h2 className="mt-2" style={{ color: "#0dcaf0" }}>Sistema de Mantenimiento</h2>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Usuario</label>
                        <div className="input-group">
                            <span className="input-group-text bg-transparent border-0">
                                <FaUser color="white" />
                            </span>
                            <input
                                type="text"
                                className="form-control bg-secondary text-light border-0"
                                placeholder="Ingrese su usuario"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <div className="input-group">
                            <span className="input-group-text bg-transparent border-0">
                                <FaLock color="white" />
                            </span>
                            <input
                                type="password"
                                className="form-control bg-secondary text-light border-0"
                                placeholder="Ingrese su contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-info w-100">Iniciar Sesión</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
