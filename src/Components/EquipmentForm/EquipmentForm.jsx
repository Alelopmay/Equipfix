import React, { useState, useEffect } from 'react';
import { createEquipment } from '../../Services/EquipmentService';
import { getAllCompanies } from '../../Services/CompanyService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EquipmentForm = ({ onSuccess }) => {
    const [companies, setCompanies] = useState([]);
    const [createdSuccessfully, setCreatedSuccessfully] = useState(false);
    const [newEquipment, setNewEquipment] = useState({
        serialNumber: '',
        type: '',
        brand: '',
        installationDate: '',
        description: '',
        companyId: ''
    });

    const equipmentTypes = [
        'Ordenador',
        'Equipo Electrónico de Mantenimiento',
        'Armario Eléctrico',
        'Aparato de Refrigeración',
        'Otro'
    ];

    const brandOptions = [
        'Privada',
        'Dell',
        'HP',
        'Lenovo',
        'Siemens',
        'Schneider Electric',
        'LG',
        'Samsung',
        'Bosch'
    ];

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const data = await getAllCompanies();
                setCompanies(data);
            } catch (error) {
                console.error('Error al obtener las empresas:', error);
                toast.error('Error al cargar las empresas.');
            }
        };

        fetchCompanies();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEquipment(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCreateEquipment = async (e) => {
        e.preventDefault();

        const isEmpty = Object.values(newEquipment).some(val => val === '');
        if (isEmpty) {
            toast.warn("Por favor, complete todos los campos.");
            return;
        }

        try {
            await createEquipment(newEquipment, newEquipment.companyId);
            toast.success("Equipo creado con éxito!");

            // Mostrar mensaje visual de confirmación
            setCreatedSuccessfully(true);

            // Limpiar formulario
            setNewEquipment({
                serialNumber: '',
                type: '',
                brand: '',
                installationDate: '',
                description: '',
                companyId: ''
            });

            // Ejecutar callback (opcional)
            if (onSuccess) onSuccess();

            // Ocultar mensaje luego de 3 segundos
            setTimeout(() => setCreatedSuccessfully(false), 3000);

        } catch (error) {
            console.error("Error al crear el equipo:", error);
            toast.error("Error al crear el equipo. Intente de nuevo.");
        }
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-10 col-lg-8">
                    <div className="card bg-dark text-light shadow-lg border-primary border-2 rounded-4">
                        <div className="card-header bg-primary text-light text-center rounded-top-4">
                            <h5 className="mb-0 fw-bold">Zona Especial - Registro de Equipos</h5>
                        </div>
                        <div className="card-body">

                            {createdSuccessfully && (
                                <div className="alert alert-success text-center fw-bold rounded-3 shadow-sm">
                                    ✅ El equipo se ha creado correctamente.
                                </div>
                            )}

                            <form onSubmit={handleCreateEquipment}>
                                <div className="mb-3">
                                    <label className="form-label text-primary">Número de Serie</label>
                                    <input type="text" name="serialNumber"
                                        className="form-control bg-secondary text-light border-primary rounded-3 shadow-sm"
                                        placeholder="Ej. SN123456" value={newEquipment.serialNumber}
                                        onChange={handleInputChange} required />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label text-primary">Tipo de Equipo</label>
                                    <select name="type"
                                        className="form-select bg-secondary text-light border-primary rounded-3 shadow-sm"
                                        value={newEquipment.type} onChange={handleInputChange} required>
                                        <option value="">Seleccione tipo</option>
                                        {equipmentTypes.map((type, index) => (
                                            <option key={index} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label text-primary">Marca</label>
                                    <select name="brand"
                                        className="form-select bg-secondary text-light border-primary rounded-3 shadow-sm"
                                        value={newEquipment.brand} onChange={handleInputChange} required>
                                        <option value="">Seleccione marca</option>
                                        {brandOptions.map((brand, index) => (
                                            <option key={index} value={brand}>{brand}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label text-primary">Fecha de Instalación</label>
                                    <input type="date" name="installationDate"
                                        className="form-control bg-secondary text-light border-primary rounded-3 shadow-sm"
                                        value={newEquipment.installationDate}
                                        onChange={handleInputChange} required />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label text-primary">Descripción</label>
                                    <textarea name="description" rows="3"
                                        className="form-control bg-secondary text-light border-primary rounded-3 shadow-sm"
                                        placeholder="Detalles del equipo o ubicación..." value={newEquipment.description}
                                        onChange={handleInputChange} required />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label text-primary">Empresa</label>
                                    <select name="companyId"
                                        className="form-select bg-secondary text-light border-primary rounded-3 shadow-sm"
                                        value={newEquipment.companyId} onChange={handleInputChange} required>
                                        <option value="">Seleccione una empresa</option>
                                        {companies.map(company => (
                                            <option key={company.id} value={company.id}>{company.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <button type="submit"
                                    className="btn btn-success w-100 rounded-3 shadow-sm fw-bold">
                                    Crear Equipo
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EquipmentForm;
