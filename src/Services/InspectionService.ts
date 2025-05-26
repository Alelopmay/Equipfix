import axios from "axios";

// La URL base para hacer las solicitudes a la API
const API_URL = "'https://equipmentmaintenance.onrender.com/inspections"; // Cambia la URL si tu API está en otra ruta o dominio

// Servicio para obtener todas las inspecciones
export const getAllInspections = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data; // Devuelve la lista de inspecciones
    } catch (error) {
        console.error("Error al obtener las inspecciones:", error);
        throw new Error("Error al obtener las inspecciones");
    }
};

// Servicio para obtener una inspección por ID
export const getInspectionById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data; // Devuelve la inspección encontrada
    } catch (error) {
        console.error("Error al obtener la inspección:", error);
        throw new Error("Error al obtener la inspección");
    }
};
export const getInspectionDetailsById = async (inspectionId) => {
    try {
        const response = await axios.get(`${API_URL}/inspection/${inspectionId}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener detalles de la inspección:", error);
        throw error;
    }
};

// Servicio para crear una nueva inspección
export const createInspection = async (inspectionData) => {
    try {
        const response = await axios.post(API_URL, inspectionData);
        return response.data; // Devuelve el mensaje de éxito
    } catch (error) {
        console.error("Error al crear la inspección:", error);
        throw new Error("Error al crear la inspección");
    }
};

// Servicio para eliminar una inspección
export const deleteInspection = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error("Error al eliminar la inspección:", error);
        throw new Error("Error al eliminar la inspección");
    }
};

// Obtener inspecciones por el ID del trabajador
export const getInspectionsByWorker = async (workerId) => {
    try {
        const response = await axios.get(`${API_URL}/worker/${workerId}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener inspecciones del trabajador:', error);
        throw error;
    }
};

// Servicio para archivar una inspección (cambiar completed a true)
export const archiveInspection = async (id) => {
    try {
        await axios.patch(`${API_URL}/${id}/archive`);
    } catch (error) {
        console.error("Error al archivar la inspección:", error);
        throw new Error("Error al archivar la inspección.");
    }
};
