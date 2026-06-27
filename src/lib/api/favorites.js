import { authClient } from "../auth-client";

const SERVER_URI = process.env.NEXT_PUBLIC_SERVER_URI || 'http://localhost:8000';

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
 * ❤️ Add a property to favorites (Protected)
 */
export const submitFavorites = async (payload) => {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${SERVER_URI}/favorites`, {
            method: "POST",
            headers,
            body: JSON.stringify(payload)
        });
        if (!res.ok) return { error: "Failed to submit" };
        return await res.json();
    } catch (error) {
        console.error("Error submitting favorite:", error);
        return { error: error.message };
    }
};

/**
 * 🗑️ Remove a property from favorites (Protected)
 */
export const removeFromFavorite = async (favItemId, tenantEmail) => {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${SERVER_URI}/favorites?favItemId=${favItemId}&tenantEmail=${tenantEmail}`, {
            method: "DELETE",
            headers,
            cache: 'no-store'
        });
        if (!res.ok) return { error: "Failed to delete" };
        return await res.json();
    } catch (error) {
        console.error("Error deleting favorite:", error);
        return null;
    }
};

/**
 * 📋 Fetch all favorite properties for a specific user (Protected)
 */
export const getFavorites = async (email) => {
    try {
        if (!email) {
            console.error("Email is missing in getFavorites call");
            return [];
        }

        const headers = await getAuthHeaders();

        const res = await fetch(`${SERVER_URI}/favorites?email=${email}`, {
            headers,
            cache: 'no-store'
        });
        if (!res.ok) {
            console.error(`Server returned status: ${res.status}`);
            return [];
        }
        return await res.json();
    } catch (error) {
        console.error("Error fetching favorites:", error);
        return [];
    }
};

/**
 * 🔍 Check if a specific property is already favorited (Protected)
 */
export const checkFavorite = async (email, propertyId) => {
    try {
        if (!email || !propertyId) return { isFavorite: false };

        const headers = await getAuthHeaders();
        const res = await fetch(`${SERVER_URI}/favorites/check?email=${email}&propertyId=${propertyId}`, {
            headers,
            cache: 'no-store'
        });
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        return await res.json();
    } catch (error) {
        console.error("Error in checkFavorite API:", error);
        return { isFavorite: false };
    }
};