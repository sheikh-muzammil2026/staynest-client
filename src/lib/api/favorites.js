export const submitFavorites = async (payload) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/favorites`, {
        method: "POST",
        headers: { "content-type": 'application/json' },
        body: JSON.stringify(payload)
    });
    return await res.json();
};

export const removeFromFavorite = async (favItemId, tenantEmail) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/favorites?favItemId=${favItemId}&tenantEmail=${tenantEmail}`, {
            method: "DELETE", 
            headers: { 'content-type': 'application/json' },
            cache: 'no-store' 
        });
        return await res.json();
    } catch (error) {
        console.error("Error deleting favorite:", error);
        return null;
    }
};



export const getFavorites = async()=>{
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/favorites`);
  const data = await res.json();
  return data;
}

export const checkFavorite = async (email, propertyId) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/favorites/check?email=${email}&propertyId=${propertyId}`);
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error in checkFavorite API:", error);
        return { isFavorite: false }; // সেফ ফলব্যাক
    }
};