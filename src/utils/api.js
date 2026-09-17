const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export async function fetchWithAuth(url, options = {}) {
    let access = localStorage.getItem("access");

    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    if (access) {
        headers["Authorization"] = `Bearer ${access}`;
    }

    let response = await fetch(`${API_BASE_URL}${url}`, { ...options, headers });

    if (response.status === 401 && access) {
        const refresh = localStorage.getItem("refresh");
        if (refresh) {
            const refreshRes = await fetch(`${API_BASE_URL}/token/refresh/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refresh })
            });

            if (refreshRes.ok) {
                const data = await refreshRes.json();
                localStorage.setItem("access", data.access);
                headers["Authorization"] = `Bearer ${data.access}`;
                response = await fetch(`${API_BASE_URL}${url}`, { ...options, headers });
            } else {
                logout();
            }
        } else {
            logout();
        }
    }

    return response;
}

export function logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    window.location.href = "/";
}
