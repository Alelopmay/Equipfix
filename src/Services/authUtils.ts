
export const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split(".")[1])); // Decodifica el payload del token
        return payload.sub; // `sub` es el ID del usuario según tu backend
    } catch (error) {
        console.error("Error al decodificar el token:", error);
        return null;
    }
};
