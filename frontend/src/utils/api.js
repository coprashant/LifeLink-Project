export const apiFetch = async (endpoint, options = {}) => {
    // This ensures every request starts with /api
    const url = endpoint.startsWith('/api') ? endpoint : `/api${endpoint}`;

    const defaultOptions = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        //Allows session cookies to be sent
        credentials: 'include', 
    };

    const response = await fetch(url, defaultOptions);

    // If the server says "Not logged in" (401), we can handle it globally
    if (response.status === 401 && !url.includes('/login')) {
        console.warn("Session expired or unauthorized");
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return await response.json();
    }
    
    // Fallback for non-JSON or errors
    const text = await response.text();
    throw new Error(text || "Server error");
};

export const handleLogout = async (setUser, navigate) => {
    try {
        await apiFetch('/auth/logout', { method: 'POST' });
        setUser(null); // Clear local state
        navigate('/login'); // Send back to login
    } catch (err) {
        console.error("Logout failed", err);
    }
};