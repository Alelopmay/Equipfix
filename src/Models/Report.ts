export interface Report {
    id?: number; // El ID es opcional en caso de que esté siendo creado (sin asignar aún).
    date: string; // Se maneja como string en formato ISO (YYYY-MM-DD)
    title: string;
    description?: string; // Descripción opcional
    maintenanceType: string;
    duration: string; // La duración puede ser un string, por ejemplo, "02:00" (hh:mm).
    startTime: string; // Hora de inicio en formato HH:mm:ss
    endTime: string; // Hora de fin en formato HH:mm:ss
    workerId: number; // ID del trabajador
    equipmentId: number; // ID del equipo
}
