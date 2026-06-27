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
 * 💳 Fetch all transaction records (Protected)
 */
export const getTransactions = async () => {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${SERVER_URI}/transactions`, { headers });
        
        if (!res.ok) throw new Error("Failed to fetch transactions");
        
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error in getTransactions API:", error);
        return [];
    }
};
