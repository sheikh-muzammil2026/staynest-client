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
 * 📅 Submit a new booking request (Protected)
 */
export const submitBookings = async (payload) => {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${SERVER_URI}/bookings`, {
            method: "POST",
            headers,
            body: JSON.stringify(payload)
        });
        
        if (!res.ok) throw new Error("Failed to submit booking");
        return await res.json();
    } catch (error) {
        console.error("Error in submitBookings API:", error);
        return { error: error.message };
    }
};

/**
 * 📋 Fetch all bookings across the platform (Admin Only - Protected)
 */
export const getAllBookings = async () => {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${SERVER_URI}/bookings`, { headers });
        
        if (!res.ok) throw new Error("Failed to fetch all bookings");
        return await res.json();
    } catch (error) {
        console.error("Error in getAllBookings API:", error);
        return [];
    }
};

/**
 * 🏢 Fetch bookings for specific properties owned by the host (Owner Only - Protected)
 */
export const getOwnerBookings = async (ownerEmail) => {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${SERVER_URI}/bookings/owner?ownerEmail=${ownerEmail}`, { headers });
        
        if (!res.ok) throw new Error("Failed to fetch owner bookings");
        return await res.json();
    } catch (error) {
        console.error("Error in getOwnerBookings API:", error);
        return [];
    }
};

/**
 * 👤 Fetch bookings made by a specific tenant (Tenant Only - Protected)
 */
export const getTenantBookings = async (tenantEmail) => {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${SERVER_URI}/bookings/tenant?tenantEmail=${tenantEmail}`, { headers });
        
        if (!res.ok) throw new Error("Failed to fetch tenant bookings");
        return await res.json();
    } catch (error) {
        console.error("Error in getTenantBookings API:", error);
        return [];
    }
};

/**
 * 🔄 Approve or Reject a booking request (Owner Only - Protected)
 */
export const updateBookingStatus = async (id, status) => {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${SERVER_URI}/bookings/status`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({ id, status }),
        });
        
        if (!res.ok) throw new Error("Failed to update booking status");
        return await res.json();
    } catch (error) {
        console.error("Error in updateBookingStatus API:", error);
        throw error;
    }
};
