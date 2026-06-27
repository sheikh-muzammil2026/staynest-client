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
 * 👥 Fetch all registered users (Admin Only - Protected)
 */
export const getUsers = async () => {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${SERVER_URI}/users`, { headers });
        
        if (!res.ok) throw new Error("Failed to fetch users");
        
        const users = await res.json();
        return users;
    } catch (error) {
        console.error("Error in getUsers API:", error);
        return [];
    }
};

/**
 * 🔄 Update a user's role (Admin Only - Protected)
 */
export const updateUserRole = async (id, newRole) => {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${SERVER_URI}/users/role`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({ id, role: newRole })
        });
        
        if (!res.ok) throw new Error("Failed to update user role");
        
        return await res.json();
    } catch (error) {
        console.error("Error in updateUserRole API:", error);
        return { error: error.message };
    }
};

/**
 * 🗑️ Delete a user account by ID (Admin Only - Protected)
 */
export const deleteUserById = async (id) => {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${SERVER_URI}/users`, {
            method: 'DELETE',
            headers,
            body: JSON.stringify({ id })
        });
        
        if (!res.ok) throw new Error("Failed to delete user");
        
        return await res.json();
    } catch (error) {
        console.error("Error in deleteUserById API:", error);
        throw error;
    }
};
