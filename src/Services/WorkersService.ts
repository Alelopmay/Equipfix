import axios from 'axios';

const API_URL = 'https://equipmentmaintenance.onrender.com/workers';

export const getAllWorkers = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data; // Devuelve los datos de los trabajadores
    } catch (error) {
        console.error('Error al obtener los trabajadores:', error);
        throw error;
    }
};

export const getWorkerById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data; // Devuelve el trabajador encontrado
    } catch (error) {
        console.error('Error al obtener el trabajador:', error);
        throw error;    
    }
};

export const createWorker = async (worker) => {
    try {
        const response = await axios.post(API_URL, worker);
        return response.data;  // Devuelve el trabajador creado
    } catch (error) {
        console.error('Error al crear el trabajador', error);
        throw error;  // Lanza un error para manejarlo en el componente
    }
};

// Actualizar un trabajador existente
export const updateWorker = async (id, worker) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, worker);
        return response.data;  // Devuelve el trabajador actualizado
    } catch (error) {
        console.error(`Error al actualizar el trabajador con ID ${id}`, error);
        throw error;  // Lanza un error para manejarlo en el componente
    }
};

// Eliminar un trabajador por ID
export const deleteWorker = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error(`Error al eliminar el trabajador con ID ${id}`, error);
        throw error;  // Lanza un error para manejarlo en el componente
    }
};