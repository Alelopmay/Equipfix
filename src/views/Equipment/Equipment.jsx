import React, { useState } from 'react';
import EquipmentForm from '../../Components/EquipmentForm/EquipmentForm';   
import EquipmentList from '../../Components/EquipmentList/EquipmentList';
import HorizontalMenu from "../../Components/Menu/HorizontalMenu";

const Equipment = () => {
    const [refresh, setRefresh] = useState(false);
    const [activeTab, setActiveTab] = useState('list');

    return (
        <div className="d-flex flex-column vh-100" style={{ backgroundColor: "#1e3a5f", color: "white" }}>
            <header className="bg-dark text-white py-3 w-100">
                <div className="container text-center">
                    <h2 className="mb-0">Gestión de Equipos</h2>
                    <p className="mb-0">Administra los equipos registrados en el sistema.</p>
                </div>
            </header>
            <HorizontalMenu />

            <main className="container my-4 flex-grow-1">
                <div className="row g-4">
                    <div className="col-12 mb-4 d-flex justify-content-between align-items-center">
                        <button className={`btn btn-primary ${activeTab === 'form' ? 'active' : ''}`} onClick={() => setActiveTab('form')}>
                            Registrar Nuevo Equipo
                        </button>
                        <button className={`btn btn-secondary ${activeTab === 'list' ? 'active' : ''}`} onClick={() => setActiveTab('list')}>
                            Ver Equipos
                        </button>
                    </div>

                    {activeTab === 'form' && <EquipmentForm onSuccess={() => setRefresh(!refresh)} />}
                    {activeTab === 'list' && <EquipmentList refresh={refresh} />}
                </div>
            </main>
        </div>
    );
};

export default Equipment;
