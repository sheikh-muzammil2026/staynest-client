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
 * 📝 Submit a new property review (Protected)
 */
export const submitReview = async (newReview) => {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${SERVER_URI}/reviews`, {
            method: "POST",
            headers,
            body: JSON.stringify(newReview)
        });

        if (!res.ok) throw new Error("Failed to submit review");

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error in submitReview API:", error);
        return { error: error.message };
    }
};

/**
 * 📋 Fetch all reviews (Public / Protected depending on backend)
 */
export const getReviews = async () => {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${SERVER_URI}/reviews`, { headers });

        if (!res.ok) throw new Error("Failed to fetch reviews");

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error in getReviews API:", error);
        return [];
    }
};
