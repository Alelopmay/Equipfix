// src/services/ReportService.js

const API_URL = "http://localhost:8080/reports"; // URL de tu API

// Crear reporte
export const createReport = async (reportData) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reportData),
        });

        if (!response.ok) {
            throw new Error("Error al crear el reporte");
        }

        const data = await response.json();
        return data; // Retorna los datos del reporte creado
    } catch (error) {
        console.error("Error al crear el reporte:", error);
        throw error;
    }
};

// Obtener todos los reportes
export const getAllReports = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Error al obtener los reportes");
        }
        const data = await response.json();
        return data; // Retorna la lista de reportes
    } catch (error) {
        console.error("Error al obtener los reportes:", error);
        throw error;
    }
};

// Obtener un reporte por ID
export const getReportById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
            throw new Error("Error al obtener el reporte");
        }
        const data = await response.json();
        return data; // Retorna los datos del reporte
    } catch (error) {
        console.error("Error al obtener el reporte:", error);
        throw error;
    }
};

// Actualizar un reporte
export const updateReport = async (id, reportData) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reportData),
        });

        if (!response.ok) {
            throw new Error("Error al actualizar el reporte");
        }

        const data = await response.json();
        return data; // Retorna el reporte actualizado
    } catch (error) {
        console.error("Error al actualizar el reporte:", error);
        throw error;
    }
};

// Eliminar un reporte
export const deleteReport = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Error al eliminar el reporte");
        }

        return true; // El reporte se eliminó con éxito
    } catch (error) {
        console.error("Error al eliminar el reporte:", error);
        throw error;
    }
};

export const getReportsByWorkerId = async (workerId) => {
    try {
        const response = await fetch(`${API_URL}/worker/${workerId}`);
        if (!response.ok) {
            throw new Error("Error al obtener los reportes del trabajador");
        }
        const data = await response.json();
        return data; // Retorna la lista de reportes del trabajador
    } catch (error) {
        console.error("Error al obtener los reportes del trabajador:", error);
        throw error;
    }
};