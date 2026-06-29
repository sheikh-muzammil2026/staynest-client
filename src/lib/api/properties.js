import { authClient } from "../auth-client";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URI || 'http://localhost:8000';

/**
 * Helper function to get authorization headers securely
 */
const getAuthHeaders = async (customHeaders = {}) => {
    const { data: token } = await authClient.token();
    return {
        'Content-Type': 'application/json',
        ...(token?.token ? { 'Authorization': `Bearer ${token.token}` } : {}),
        ...customHeaders
    };
};

/**
 * 📊 Fetch all properties for admin tracking (Protected)
 */
export const trackAllProperties = async () => {
    const headers = await getAuthHeaders();
    const res = await fetch(`${BASE_URL}/admin/properties`, { headers });
    return await res.json();
};

/**
 * 🔍 Fetch paginated properties with filter and search options (Public)
 */
export const getAllProperties = async (search = "", type = "all", sort = "", page = 1, limit = 9) => {
    try {
        const queryParams = new URLSearchParams({
            search,
            type,
            sort,
            page: page.toString(),
            limit: limit.toString()
        }).toString();

        const response = await fetch(`${BASE_URL}/properties?${queryParams}`);
        if (!response.ok) throw new Error("Failed to fetch properties");
        
        return await response.json();
    } catch (error) {
        console.error("API error (getAllProperties):", error);
        return { properties: [], totalPages: 1, currentPage: 1, totalProperties: 0 };
    }
};

/**
 * ⭐ Fetch hand-vetted featured properties (Public)
 */
export const getFeaturedProperties = async () => {
    try {
        const res = await fetch(`${BASE_URL}/featuredProperties`);
        if (!res.ok) throw new Error(`Failed to fetch featured properties. Status: ${res.status}`);
        
        return await res.json();
    } catch (error) {
        console.error("Error in getFeaturedProperties:", error.message);
        return [];
    }
};

/**
 * 🏠 Fetch single property details by ID (Public)
 */
export const PropertyDetailsById = async (id) => {
    const res = await fetch(`${BASE_URL}/properties/${id}`);
    return await res.json();
};

/**
 * ➕ Add a new property listing (Owner Only - Protected)
 */
export const addProperty = async (propertyData) => {
    const headers = await getAuthHeaders();
    
    const response = await fetch(`${BASE_URL}/properties/owner`, {
        method: 'POST',
        headers,
        body: JSON.stringify(propertyData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Something went wrong!');
    return data;
};

/**
 * 🏢 Fetch all properties belonging to a specific owner (Protected)
 */
export const getOwnerProperties = async (email) => {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/properties/owner/${email}`, { headers });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch owner properties');
    return data;
};

/**
 * 🔄 Update property details by ID (Owner Only - Protected)
 */
export const updatePropertyById = async (id, propertyData) => {
    const headers = await getAuthHeaders();
    const res = await fetch(`${BASE_URL}/properties/owner/${id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(propertyData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update property");
    return data;
};

/**
 * 🗑️ Delete property by ID (Owner Only - Protected)
 */
export const deletePropertyByIdWithOwner = async (id) => {
    const headers = await getAuthHeaders();
    const res = await fetch(`${BASE_URL}/properties/owner/${id}`, {
        method: 'DELETE',
        headers
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to delete property");
    return data;
};

/**
 * 👑 Update verification status or add feedback (Admin Only - Protected)
 */
export const updatePropertyStatus = async (id, newStatus, feedback = '') => {
    const headers = await getAuthHeaders();
    const res = await fetch(`${BASE_URL}/properties/admin?newStatus=${newStatus}&feedback=${encodeURIComponent(feedback)}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ id })
    });
    return await res.json();
};

/**
 * 🛑 Hard delete property from platform (Admin Only - Protected)
 */
export const deletePropertyById = async (id) => {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${BASE_URL}/properties/admin`, {
            method: 'DELETE',
            headers,
            body: JSON.stringify({ id })
        });

        if (!res.ok) throw new Error("Network response was not ok");
        return await res.json();
    } catch (error) {
        console.error("API Error (deletePropertyById):", error);
        throw error;
    }
};

export const updatePropertyDetails = async (id, payload) => {
    const headers = await getAuthHeaders();
    const res = await fetch(`${BASE_URL}/properties/owner/${id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update property");
    return data;
};
            
