// Detect if we are running locally or on Vercel
const BASE_URL = import.meta.env.VITE_API_URL || ''; 

export const apiFetch = async (endpoint, options = {}) => {
    const path = endpoint.startsWith('/api') ? endpoint : `/api${endpoint}`;
    const url = `${BASE_URL}${path}`;

    const defaultOptions = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        credentials: 'include', 
    };

    try {
        const response = await fetch(url, defaultOptions);

        // Handle 401 Unauthorized globally
        if (response.status === 401 && !url.includes('/login') && !url.includes('/me')) {
            console.warn("Session expired or unauthorized");
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            
            // If the request was successful but the API returned an error field
            if (!response.ok) {
                throw new Error(data.message || "Request failed");
            }
            return data;
        }
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || `Error ${response.status}`);
        }

        return await response.text();
    } catch (err) {
        console.error("API Fetch Error:", err.message);
        throw err; 
    }
};

export const handleLogout = async (setUser, navigate) => {
    try {
        await apiFetch('/auth/logout', { method: 'POST' });
    } catch (err) {
        console.error("Logout request failed, cleaning up local state anyway", err);
    } finally {
        setUser(null); 
        navigate('/login'); 
    }
};