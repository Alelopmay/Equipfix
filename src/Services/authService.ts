const API_URL = "https://equipmentmaintenance.onrender.com/auth/login";


export const login = async (username, password) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Error en la autenticación");
        }

        console.log("Respuesta del backend:", data); // Depuración

        localStorage.setItem("token", data.token);
        localStorage.setItem("category", data.category);

        return data.category;
    } catch (error) {
        console.error("Error en la autenticación:", error.message);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("category");
};

export const getUserCategory = () => {
    return localStorage.getItem("category");
};
