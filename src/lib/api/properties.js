import { authClient } from "../auth-client";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URI || 'http://localhost:8000';

/**
 * 📊 Fetch all properties for admin tracking
 */
export const trackAllProperties = async () => {
    const res = await fetch(`${BASE_URL}/admin/properties`);
    return await res.json();
};

/**
 * 🔍 Fetch paginated properties with filter and search options
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
 * ⭐ Fetch hand-vetted featured properties
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
 * 🏠 Fetch single property details by ID
 */
export const PropertyDetailsById = async (id) => {
    const res = await fetch(`${BASE_URL}/properties/${id}`);
    return await res.json();
};

/**
 * ➕ Add a new property listing (Owner Only)
 */
export const addProperty = async (propertyData) => {
    const { data: token } = await authClient.token();
    
    const response = await fetch(`${BASE_URL}/properties/owner`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer: ${token?.token}`
        },
        body: JSON.stringify(propertyData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Something went wrong!');
    return data;
};

/**
 * 🏢 Fetch all properties belonging to a specific owner
 */
export const getOwnerProperties = async (email) => {
    const response = await fetch(`${BASE_URL}/properties/owner/${email}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch owner properties');
    return data;
};

/**
 * 🔄 Update property details by ID (Owner Only)
 */
export const updatePropertyById = async (id, propertyData) => {
    const res = await fetch(`${BASE_URL}/properties/owner/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(propertyData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update property");
    return data;
};

/**
 * 🗑️ Delete property by ID (Owner Only)
 */
export const deletePropertyByIdWithOwner = async (id) => {
    const res = await fetch(`${BASE_URL}/properties/owner/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to delete property");
    return data;
};

/**
 * 👑 Update verification status or add feedback (Admin Only)
 */
export const updatePropertyStatus = async (id, newStatus, feedback = '') => {
    const res = await fetch(`${BASE_URL}/properties/admin?newStatus=${newStatus}&feedback=${encodeURIComponent(feedback)}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id })
    });
    return await res.json();
};

/**
 * 🛑 Hard delete property from platform (Admin Only)
 */
export const deletePropertyById = async (id) => {
    try {
        const res = await fetch(`${BASE_URL}/properties/admin`, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ id })
        });

        if (!res.ok) throw new Error("Network response was not ok");
        return await res.json();
    } catch (error) {
        console.error("API Error (deletePropertyById):", error);
        throw error;
    }
};
