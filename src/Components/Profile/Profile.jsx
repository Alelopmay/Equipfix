import React, { useEffect, useState } from "react";
import { FaCog } from "react-icons/fa";
import { getWorkerById } from "../../Services/WorkersService";
import { getUserIdFromToken } from "../../Services/authUtils";
const Profile = ({ onSettingsClick }) => {
    const [worker, setWorker] = useState(null);

    useEffect(() => {
        const fetchWorkerData = async () => {
            const userId = getUserIdFromToken();
            if (userId) {
                try {
                    const workerData = await getWorkerById(userId);
                    setWorker(workerData);
                } catch (error) {
                    console.error("Error al obtener los datos del trabajador:", error);
                }
            }
        };

        fetchWorkerData();
    }, []);

    return (
        <div className="d-flex align-items-center">
            {worker ? (
                <>
                    <span className="me-2">{worker.name} {worker.surname}</span>
                    <button className="btn btn-outline-light btn-sm" onClick={onSettingsClick}>
                        <FaCog size={20} />
                    </button>
                </>
            ) : (
                <span className="me-2">Cargando...</span>
            )}
        </div>
    );
};

export default Profile;
