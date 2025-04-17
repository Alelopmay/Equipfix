import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaUserPlus, FaEdit } from "react-icons/fa";
import { getAllWorkers, createWorker, deleteWorker } from "../../Services/WorkersService";
import "bootstrap/dist/css/bootstrap.min.css";
import HorizontalMenu from "../../Components/Menu/HorizontalMenu";

function Workers() {
    const [worker, setWorker] = useState({
        name: "",
        surname: "",
        password: "",
        username: "",
        category: "sub admin" // Valor predeterminado
    });

    const [workers, setWorkers] = useState([]);
    const [message, setMessage] = useState("");
    const [view, setView] = useState("form");

    useEffect(() => {
        fetchWorkers();
    }, []);

    const fetchWorkers = async () => {
        try {
            const data = await getAllWorkers();
            setWorkers(data);
        } catch (error) {
            console.error("Error al obtener trabajadores:", error);
        }
    };

    const handleChange = (e) => {
        setWorker({ ...worker, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (worker.id) {
                setMessage("Trabajador actualizado exitosamente ✅");
            } else {
                await createWorker(worker);
                setMessage("Trabajador creado exitosamente ✅");
            }
            setWorker({ name: "", surname: "", password: "", username: "", category: "sub admin" });
            fetchWorkers();
            setView("list");
        } catch (error) {
            setMessage("Error al crear o actualizar el trabajador ❌");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteWorker(id);
            setMessage("Trabajador eliminado ✅");
            fetchWorkers();
        } catch (error) {
            setMessage("Error al eliminar trabajador ❌");
        }
    };

    const handleCancelEdit = () => {
        setWorker({ name: "", surname: "", password: "", username: "", category: "sub admin" });
        setView("list");
    };

    return (
        <div className="d-flex flex-column vh-100" style={{ backgroundColor: "#1e3a5f", color: "white" }}>
            <header className="bg-dark text-white py-3 w-100">
                <div className="container text-center">
                    <h2 className="mb-0">Gestión de Trabajadores</h2>
                    <p className="mb-0">Administra los trabajadores registrados en el sistema.</p>
                </div>
            </header>
            <HorizontalMenu />
            <main className="container my-4 flex-grow-1">
                <div className="row g-4">
                    <div className="col-12 col-md-5">
                        <h2 className="text-info mb-3 text-center text-md-start">
                            <FaUserPlus /> {view === "form" ? "Crear Nuevo Trabajador" : "Editar Trabajador"}
                        </h2>
                        <form onSubmit={handleSubmit} className="p-4 rounded shadow-lg" style={{ backgroundColor: "#334155" }}>
                            {message && <div className="alert alert-info">{message}</div>}
                            <div className="mb-3">
                                <label className="form-label">Nombre</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={worker.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Apellido</label>
                                <input
                                    type="text"
                                    name="surname"
                                    className="form-control"
                                    value={worker.surname}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Nombre de Usuario</label>
                                <input
                                    type="text"
                                    name="username"
                                    className="form-control"
                                    value={worker.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Contraseña</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={worker.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Categoría</label>
                                <select
                                    name="category"
                                    className="form-control"
                                    value={worker.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="sub admin">Sub Admin</option>
                                    <option value="mantenimiento">Mantenimiento</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-info w-100" style={{ backgroundColor: "#0dcaf0", color: "#1e3a5f" }}>
                                {view === "form" ? <FaUserPlus /> : <FaEdit />} {view === "form" ? "Crear Trabajador" : "Guardar Cambios"}
                            </button>
                            {worker.id && (
                                <button
                                    type="button"
                                    className="btn btn-secondary w-100 mt-3"
                                    onClick={handleCancelEdit}
                                    style={{ backgroundColor: "#6c757d", color: "#ffffff" }}
                                >
                                    Cancelar Edición
                                </button>
                            )}
                        </form>
                    </div>

                    <div className="col-12 col-md-7">
                        <h3 className="text-info mb-3 text-center text-md-start">Lista de Trabajadores</h3>
                        <div className="table-responsive">
                            <table className="table table-dark table-striped">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Usuario</th>
                                        <th>Categoría</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {workers.map(worker => (
                                        <tr key={worker.id}>
                                            <td>{worker.name}</td>
                                            <td>{worker.surname}</td>
                                            <td>{worker.username}</td>
                                            <td>{worker.category}</td>
                                            <td>
                                                <button
                                                    className="btn btn-danger btn-sm me-2"
                                                    onClick={() => handleDelete(worker.id)}
                                                    style={{ backgroundColor: "#dc3545" }}
                                                >
                                                    <FaTrashAlt /> Eliminar
                                                </button>
                                                <button
                                                    className="btn btn-warning btn-sm"
                                                    style={{ backgroundColor: "#f0ad4e" }}
                                                    onClick={() => {
                                                        setWorker(worker);
                                                        setView("form");
                                                    }}
                                                >
                                                    <FaEdit /> Editar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="bg-dark text-white py-3 w-100 text-center">
                <p className="mb-0">© 2025 Sistema de Gestión de Trabajadores | Todos los derechos reservados</p>
            </footer>
        </div>
    );
}

export default Workers;
