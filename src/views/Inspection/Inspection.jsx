import React from 'react';
import RevisionForm from '../../Components/RevisionForm/RevisionForm';
import RevisionList from '../../Components/RevisionList/RevisionList';
import HorizontalMenu from "../../Components/Menu/HorizontalMenu";

const InspectionComponent = () => {
    return (
        <div className="d-flex flex-column vh-100" style={{ backgroundColor: "#1e3a5f", color: "white" }}>
            {/* Encabezado */}
            <header className="py-3 w-100 shadow-lg" style={{ backgroundColor: "#0a192f" }}>
                <div className="container text-center">
                    <h1 className="mb-0 text-info">Gestión de Inspecciones</h1>
                </div>
            </header>
            <HorizontalMenu />

            {/* Contenido Principal */}
            <main className="container-fluid my-4 flex-grow-1">
                <div className="row g-4 justify-content-center">
                    {/* Formulario de Inspección */}
                    <div className="col-12 col-md-6">
                        <h2 className="text-info text-center text-md-start">Formulario de Inspección</h2>
                        <div className="p-4 rounded shadow-lg" style={{ backgroundColor: "#334155" }}>
                            <RevisionForm />
                        </div>
                    </div>

                    {/* Lista de Inspecciones */}
                    <div className="col-12 col-md-6">
                        <h2 className="text-info text-center text-md-start">Lista de Inspecciones</h2>
                        <div className="p-4 rounded shadow-lg" style={{ backgroundColor: "#334155" }}>
                            <RevisionList />
                        </div>
                    </div>
                </div>
            </main>

            {/* Pie de Página */}
            <footer className="py-3 w-100 text-center shadow-lg" style={{ backgroundColor: "#0a192f" }}>
                <p className="mb-0">© 2025 Sistema de Inspecciones | Todos los derechos reservados</p>
            </footer>
        </div>
    );
};

export default InspectionComponent;
