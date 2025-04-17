import React, { useState, useEffect } from "react";
import { FaTrash, FaEye, FaSearch, FaBuilding, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getEquipmentsByCompany, deleteEquipment } from "../../Services/EquipmentService";
import { getAllCompanies } from "../../Services/CompanyService";
import { Link, useLocation } from "react-router-dom";

const EquipmentList = ({ refresh }) => {
    const [equipments, setEquipments] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [searchSerial, setSearchSerial] = useState("");
    const [selectedCompany, setSelectedCompany] = useState("");
    const [filteredEquipments, setFilteredEquipments] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const location = useLocation();
    const isOnWorkAria = location.pathname === "/WorkAria";

    useEffect(() => {
        const fetchEquipments = async () => {
            try {
                const data = await getEquipmentsByCompany();
                const formattedData = data.map((e) => ({
                    id: e[0],
                    company_name: e[1],
                    serial_number: e[2],
                    type: e[3],
                    brand: e[4],
                    installation_date: e[5],
                    description: e[6]?.substring(0, 30) || "",
                    company_id: e[7],
                }));
                setEquipments(formattedData);
                setFilteredEquipments(formattedData);
            } catch (error) {
                console.error("Error al obtener los equipos:", error);
                alert("Error al obtener la lista de equipos.");
            }
        };

        const fetchCompanies = async () => {
            try {
                const data = await getAllCompanies();
                setCompanies(data);
            } catch (error) {
                console.error("Error al obtener las empresas:", error);
                alert("Error al obtener la lista de empresas.");
            }
        };

        fetchEquipments();
        fetchCompanies();
    }, [refresh]);

    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de que deseas eliminar este equipo?")) return;

        try {
            await deleteEquipment(id);
            alert("Equipo eliminado correctamente.");
            setEquipments(prev => prev.filter(equipment => equipment.id !== id));
        } catch (error) {
            console.error("Error al eliminar el equipo:", error);
            alert("No se pudo eliminar el equipo. Inténtelo de nuevo.");
        }
    };

    useEffect(() => {
        const filtered = equipments.filter(
            (equipment) =>
                equipment.serial_number.toLowerCase().includes(searchSerial.toLowerCase()) &&
                (selectedCompany === "" || equipment.company_name === selectedCompany)
        );
        setFilteredEquipments(filtered);
        setCurrentIndex(0); // Reset al cambiar filtro
    }, [searchSerial, selectedCompany, equipments]);

    const nextPage = () => {
        if (currentIndex + 6 < filteredEquipments.length) setCurrentIndex(currentIndex + 6);
    };

    const prevPage = () => {
        if (currentIndex - 6 >= 0) setCurrentIndex(currentIndex - 6);
    };

    return (
        <div className="container my-4">
            {/* Filtros */}
            <div className="row g-2 mb-3">
                <div className="col-12 col-md-6">
                    <div className="input-group">
                        <span className="input-group-text"><FaSearch /></span>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Buscar por número de serie..."
                            value={searchSerial}
                            onChange={(e) => setSearchSerial(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="input-group">
                        <span className="input-group-text"><FaBuilding /></span>
                        <select
                            className="form-select form-select-sm"
                            value={selectedCompany}
                            onChange={(e) => setSelectedCompany(e.target.value)}
                        >
                            <option value="">Todas las empresas</option>
                            {companies.map((company) => (
                                <option key={company.id} value={company.name}>
                                    {company.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Navegación */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={prevPage}
                    disabled={currentIndex === 0}
                >
                    <FaChevronLeft /> Anterior
                </button>
                <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={nextPage}
                    disabled={currentIndex + 6 >= filteredEquipments.length}
                >
                    Siguiente <FaChevronRight />
                </button>
            </div>

            {/* Grid de tarjetas */}
            <div className="row g-3">
                {filteredEquipments.length > 0 ? (
                    filteredEquipments.slice(currentIndex, currentIndex + 6).map((equipment) => (
                        <div key={equipment.id} className="col-12 col-md-6 col-lg-4">
                            <div className="card h-100 bg-dark text-light border-primary rounded-4 shadow-sm">
                                <div className="card-body d-flex flex-column justify-content-between">
                                    <h6 className="card-title mb-2 text-primary">{equipment.company_name}</h6>
                                    <p className="mb-1"><strong>Serie:</strong> {equipment.serial_number}</p>
                                    <p className="mb-1"><strong>Tipo:</strong> {equipment.type}</p>
                                    <p className="mb-1"><strong>Marca:</strong> {equipment.brand}</p>
                                    <p className="mb-2"><strong>Descripción:</strong> {equipment.description}</p>
                                    <div className="d-flex justify-content-between mt-auto pt-2">
                                        <Link to={`/equipments/${equipment.id}`} className="btn btn-info btn-sm">
                                            <FaEye /> Ver
                                        </Link>
                                        {!isOnWorkAria && (
                                            <button
                                                onClick={() => handleDelete(equipment.id)}
                                                className="btn btn-danger btn-sm"
                                            >
                                                <FaTrash /> Eliminar
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center text-muted">
                        No hay equipos registrados.
                    </div>
                )}
            </div>
        </div>
    );
};

export default EquipmentList;
