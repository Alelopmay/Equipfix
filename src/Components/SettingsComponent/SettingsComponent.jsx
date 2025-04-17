import React, { useState } from "react";

const SettingsComponent = () => {
    // Estados para las configuraciones
    const [darkMode, setDarkMode] = useState(true);
    const [language, setLanguage] = useState("es");
    const [notifications, setNotifications] = useState(true);

    // Alternar modo oscuro
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.style.backgroundColor = darkMode ? "#333" : "#222";
    };

    return (
        <div className="container my-5">
            <div className="card bg-dark text-light shadow-lg rounded-3 p-4">
                <h2 className="text-center mb-4 text-info">Configuración</h2>

                {/* Modo Oscuro */}
                <div className="form-check form-switch mb-3">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="darkModeSwitch"
                        checked={darkMode}
                        onChange={toggleDarkMode}
                    />
                    <label className="form-check-label" htmlFor="darkModeSwitch">
                        Activar modo oscuro
                    </label>
                </div>

                {/* Selección de idioma */}
                <div className="mb-3">
                    <label className="form-label">Idioma</label>
                    <select
                        className="form-select bg-secondary text-light"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option value="es">Español</option>
                        <option value="en">Inglés</option>
                        <option value="fr">Francés</option>
                    </select>
                </div>

                {/* Notificaciones */}
                <div className="form-check form-switch mb-3">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="notificationsSwitch"
                        checked={notifications}
                        onChange={() => setNotifications(!notifications)}
                    />
                    <label className="form-check-label" htmlFor="notificationsSwitch">
                        Recibir notificaciones
                    </label>
                </div>

                {/* Cambio de contraseña */}
                <div className="mb-3">
                    <label className="form-label">Nueva contraseña</label>
                    <input type="password" className="form-control bg-secondary text-light" />
                </div>
                <button className="btn btn-info w-100 mb-3">Actualizar contraseña</button>

                {/* Cerrar sesión */}
                <button className="btn btn-danger w-100">Cerrar sesión</button>
            </div>
        </div>
    );
};

export default SettingsComponent;
