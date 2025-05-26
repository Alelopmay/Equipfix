// src/services/CompanyService.js
import axios from 'axios';

const API_URL = 'https://equipmentmaintenance.onrender.com/companies'; // URL base para la API

// Obtener todas las empresas
export const getAllCompanies = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data; // Devuelve los datos de las empresas
    } catch (error) {
        console.error('Error al obtener las empresas:', error);
        throw error;
    }
};

// Crear una nueva empresa
export const createCompany = async (companyDTO) => {
    try {
        const response = await axios.post(API_URL, companyDTO);
        return response.data; // Devuelve la empresa creada
    } catch (error) {
        console.error('Error al crear la empresa:', error);
        throw error;
    }
};

// Eliminar una empresa
export const deleteCompany = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error('Error al eliminar la empresa:', error);
        throw error;
    }
};

// Actualizar una empresa
export const updateCompany = async (id, companyDTO) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, companyDTO);
        return response.data; // Devuelve la empresa actualizada
    } catch (error) {
        console.error('Error al actualizar la empresa:', error);
        throw error;
    }
};
export const getCompanyById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data; // Devuelve la empresa encontrada
    } catch (error) {
        console.error('Error al obtener la empresa:', error);
        throw error;
    }
};