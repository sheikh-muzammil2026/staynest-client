const SERVER_URI = process.env.NEXT_PUBLIC_SERVER_URI;

export const submitFavorites = async (payload) => {
    try {
        const res = await fetch(`${SERVER_URI}/favorites`, {
            method: "POST",
            headers: { "content-type": 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!res.ok) return { error: "Failed to submit" };
        return await res.json();
    } catch (error) {
        console.error("Error submitting favorite:", error);
        return { error: error.message };
    }
};

export const removeFromFavorite = async (favItemId, tenantEmail) => {
    try {
        const res = await fetch(`${SERVER_URI}/favorites?favItemId=${favItemId}&tenantEmail=${tenantEmail}`, {
            method: "DELETE",
            headers: { 'content-type': 'application/json' },
            cache: 'no-store'
        });
        if (!res.ok) return { error: "Failed to delete" };
        return await res.json();
    } catch (error) {
        console.error("Error deleting favorite:", error);
        return null;
    }
};

export const getFavorites = async () => {
    try {
        // Next.js SSR/Build এরর এড়াতে ফুল URL হ্যান্ডেলিং
        const res = await fetch(`${SERVER_URI}/favorites`, { cache: 'no-store' });
        if (!res.ok) {
            console.error(`Server returned status: ${res.status}`);
            return []; // নিরাপদ খালি অ্যারে রিটার্ন
        }
        return await res.json();
    } catch (error) {
        console.error("Error fetching favorites:", error);
        return []; // ক্র্যাশ না করে খালি অ্যারে দেবে
    }
};

export const checkFavorite = async (email, propertyId) => {
    try {
        if (!email || !propertyId) return { isFavorite: false };

        const res = await fetch(`${SERVER_URI}/favorites/check?email=${email}&propertyId=${propertyId}`, {
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