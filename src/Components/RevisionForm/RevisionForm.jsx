import React, { useState, useEffect } from 'react';
import { getAllWorkers } from '../../Services/WorkersService';
import { getAllEquipments } from '../../Services/EquipmentService';

const RevisionForm = () => {
    const [formData, setFormData] = useState({
        workerId: '',
        equipmentId: '',
        date: '',  // Cambiado reviewDate a date
        completed: false,
        description: '',
    });

    const [workers, setWorkers] = useState([]);
    const [equipments, setEquipments] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                const data = await getAllWorkers();
                setWorkers(data);
            } catch (error) {
                console.error('Error al obtener los trabajadores:', error);
            }
        };

        const fetchEquipments = async () => {
            try {
                const data = await getAllEquipments();
                setEquipments(data);
            } catch (error) {
                console.error('Error al obtener los equipos:', error);
            }
        };

        fetchWorkers();
        fetchEquipments();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que los campos no estén vacíos
        if (!formData.workerId || !formData.equipmentId || !formData.date || !formData.description) {
            setError('Todos los campos son obligatorios.');
            return;
        }

        // Validar formato de la fecha
        const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(formData.date);
        if (!isValidDate) {
            setError('La fecha debe estar en formato YYYY-MM-DD.');
            return;
        }

        // Convertir la fecha al formato adecuado "YYYY-MM-DD"
        const [year, month, day] = formData.date.split('-');
        if (parseInt(year) < 1900 || parseInt(year) > 2100) {
            setError('El año debe estar entre 1900 y 2100.');
            return;
        }

        // No necesitamos la hora, simplemente mantendremos la fecha tal como está
        const dateFormatted = `${year}-${month}-${day}`;

        const requestData = {
            workerId: parseInt(formData.workerId, 10),
            equipmentId: parseInt(formData.equipmentId, 10),
            date: dateFormatted, // Cambiado reviewDate por date
            completed: Boolean(formData.completed),
            description: formData.description,
        };

        console.log("📤 Enviando datos:", JSON.stringify(requestData, null, 2));

        try {
            const response = await fetch('http://localhost:8080/inspections', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData),
            });

            // Verifica si la respuesta fue exitosa
            if (response.ok) {
                alert('Inspección creada con éxito');
                setFormData({ workerId: '', equipmentId: '', date: '', completed: false, description: '' });
            } else {
                const errorData = await response.json();
                console.error("⚠️ Respuesta del servidor:", errorData);
                setError(errorData.message || 'Error al crear la inspección.');
            }
        } catch (err) {
            console.error("❌ Error en la solicitud:", err);
            setError('Error al enviar la solicitud.');
        }
    };

    return (
        <div className="revision-form-container bg-dark text-white p-3 p-md-4 rounded shadow-lg">
            <h1 className="text-info text-center text-md-start mb-4">Crear Inspección</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Empleado</label>
                    <select name="workerId" value={formData.workerId} onChange={handleChange} className="form-control">
                        <option value="">Selecciona un empleado</option>
                        {workers.map(worker => <option key={worker.id} value={worker.id}>{worker.name}</option>)}
                    </select>
                </div>

                <div className="mb-3">
                    <label>Equipo</label>
                    <select name="equipmentId" value={formData.equipmentId} onChange={handleChange} className="form-control">
                        <option value="">Selecciona un equipo</option>
                        {equipments.map(equipment => <option key={equipment.id} value={equipment.id}>{equipment.serialNumber}</option>)}
                    </select>
                </div>

                <div className="mb-3">
                    <label>Fecha de Inspección</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} className="form-control" />
                </div>

                <div className="mb-3">
                    <label>Descripción</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} className="form-control"></textarea>
                </div>

                <button type="submit" className="btn btn-info w-100 btn-lg">Crear Inspección</button>
            </form>
        </div>
    );
};

export default RevisionForm;
