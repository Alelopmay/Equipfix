export interface Company {
    id?: number; // Opcional porque aún no existe al crearlo
    name: string;
    address: string;
    location?: string; // En el backend es un Point, pero aquí lo guardamos como una string "lat,lng"
    associationDate: string;
}