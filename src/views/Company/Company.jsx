import React, { useState, useEffect } from "react";
import { FaTrash, FaRegEdit, FaBuilding } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import HorizontalMenu from "../../Components/Menu/HorizontalMenu";
import { getAllCompanies, createCompany, deleteCompany, updateCompany } from "../../Services/CompanyService";
import { toast, ToastContainer } from 'react-toastify'; // Importar toastify
import 'react-toastify/dist/ReactToastify.css'; // Estilos de toastify
import './Company.css';
const Company = () => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [associationDate, setAssociationDate] = useState("");
    const [companies, setCompanies] = useState([]);
    const [companyToEdit, setCompanyToEdit] = useState(null);

    // Cargar empresas desde el backend
    useEffect(() => {
        const fetchCompaniesData = async () => {
            const data = await getAllCompanies();
            setCompanies(data);
        };
        fetchCompaniesData();
    }, []);

    const formatDate = (date) => {
        if (date) {
            const newDate = new Date(date);
            return newDate.toISOString().split("T")[0];
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const companyData = { name, address, associationDate };

        const newCompany = await createCompany(companyData);
        if (newCompany) {
            setCompanies([...companies, newCompany]);
            resetForm();
            toast.success("¡Empresa registrada exitosamente!"); // Mensaje de éxito
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar esta empresa?")) {
            await deleteCompany(id);
            setCompanies(companies.filter((company) => company.id !== id));
            toast.error("¡Empresa eliminada exitosamente!"); // Mensaje de eliminación
        }
    };

    const handleEdit = (company) => {
        setCompanyToEdit(company);
        setName(company.name);
        setAddress(company.address);
        setAssociationDate(company.associationDate);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const companyData = { name, address, associationDate };

        const updatedCompany = await updateCompany(companyToEdit.id, companyData);
        if (updatedCompany) {
            setCompanies(companies.map((company) => (company.id === updatedCompany.id ? updatedCompany : company)));
            setCompanyToEdit(null);
            resetForm();
            toast.success("¡Empresa actualizada exitosamente!"); // Mensaje de éxito
        }
    };

    const handleCancelEdit = () => {
        setCompanyToEdit(null);
        resetForm();
    };

    const resetForm = () => {
        setName("");
        setAddress("");
        setAssociationDate("");
    };

    return (
        <div className="d-flex flex-column vh-100" style={{ backgroundColor: "#1e3a5f", color: "white" }}>
            <header className="bg-dark text-white py-3 w-100">
                <div className="container text-center">
                    <h2 className="mb-0">Gestión de Empresas</h2>
                    <p className="mb-0">Administra las empresas registradas en el sistema.</p>
                </div>
            </header>

            <HorizontalMenu />

            <main className="container my-4 flex-grow-1">
                <div className="row g-4">
                    {/* Formulario para agregar o editar una empresa */}
                    <div className="col-12 col-md-5">
                        <h2 className="text-info mb-3 text-center text-md-start">
                            <FaBuilding /> {companyToEdit ? "Editar Empresa" : "Registrar Empresa"}
                        </h2>
                        <form onSubmit={companyToEdit ? handleUpdate : handleSubmit} className="p-4 rounded shadow-lg" style={{ backgroundColor: "#334155" }}>
                            <div className="mb-3">
                                <label>Nombre</label>
                                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label>Dirección</label>
                                <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label>Fecha de Asociación</label>
                                <input type="date" className="form-control" value={formatDate(associationDate)} onChange={(e) => setAssociationDate(e.target.value)} required />
                            </div>

                            <button type="submit" className="btn btn-info w-100">
                                <FaBuilding /> {companyToEdit ? "Guardar Cambios" : "Registrar"}
                            </button>
                            {companyToEdit && (
                                <button type="button" onClick={handleCancelEdit} className="btn btn-secondary w-100 mt-2">
                                    Cancelar Edición
                                </button>
                            )}
                        </form>
                    </div>

                    {/* Carrusel vertical con barra de desplazamiento usando Bootstrap */}
                    <div className="col-12 col-md-7">
                        <h3 className="text-info mb-3 text-center text-md-start">Lista de Empresas</h3>
                        <div className="overflow-auto" style={{ maxHeight: '500px' }}>
                            {/* Lista de empresas en forma de tarjetas */}
                            {companies.map((company) => (
                                <div
                                    key={company.id}
                                    className="bg-dark text-white border border-info rounded p-3 mb-2 shadow"
                                >
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <h5 className="text-info">{company.name}</h5>
                                            <p className="mb-1"><strong>Dirección:</strong> {company.address}</p>
                                            <p className="mb-2"><strong>Asociación:</strong> {company.associationDate}</p>
                                        </div>
                                        <div className="d-flex flex-column gap-2">
                                            <button onClick={() => handleDelete(company.id)} className="btn btn-danger btn-sm">
                                                <FaTrash /> Eliminar
                                            </button>
                                            <button onClick={() => handleEdit(company)} className="btn btn-warning btn-sm">
                                                <FaRegEdit /> Editar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <footer className="bg-dark text-white py-3 w-100 text-center">
                <p className="mb-0">© 2025 Sistema de Mantenimiento | Todos los derechos reservados</p>
            </footer>

            <ToastContainer />
        </div>
    );
};

export default Company;

