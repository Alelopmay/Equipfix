const API_URL = 'https://equipmentmaintenance.onrender.com';

export const getAllEquipments = async () => {
    try {
        const response = await fetch(`${API_URL}/equipments`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los equipos:', error);
        throw error;
    }
};

export const getEquipmentById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/equipments/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener el equipo:', error);
        throw error;
    }
};

export const createEquipment = async (equipmentData, companyId) => {
    try {
        const response = await fetch(`${API_URL}/equipments?companyId=${companyId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(equipmentData),
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Error al registrar el equipo');
        }
    } catch (error) {
        console.error('Error de conexión:', error);
    }
};

// Actualizar un equipo
export const updateEquipment = async (id, equipmentData) => {
    try {
        const response = await fetch(`${API_URL}/equipments/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(equipmentData),
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Error al actualizar el equipo');
        }
    } catch (error) {
        console.error('Error de conexión:', error);
    }
};

// Eliminar un equipo
export const deleteEquipment = async (id) => {
    try {
        const response = await fetch(`${API_URL}/equipments/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            return true;
        } else {
            throw new Error('Error al eliminar el equipo');
        }
    } catch (error) {
        console.error('Error de conexión:', error);
        return false;
    }
};

// Obtener equipos por empresa
export const getEquipmentsByCompany = async () => {
    try {
        const response = await fetch(`${API_URL}/equipments/by-company`);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Error al obtener los equipos por empresa');
        }
    } catch (error) {
        console.error('Error de conexión:', error);
    }
};