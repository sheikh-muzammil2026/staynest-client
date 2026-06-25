
export const trackAllProperties = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/admin/properties`);
    const data = await res.json();
    return data;

};

// export const getAllProperties = async (search = "", type = "all", sort = "") => {
//     try {
//         const queryParams = new URLSearchParams({
//             search,
//             type,
//             sort
//         }).toString();

//         const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/properties?${queryParams}`);
//         if (!response.ok) {
//             throw new Error("Failed to fetch properties");
//         }
//         return await response.json();
//     } catch (error) {
//         console.error("API error:", error);
//         return [];
//     }
// };

export const getAllProperties = async (search = "", type = "all", sort = "", page = 1, limit = 9) => {
    try {
        const queryParams = new URLSearchParams({
            search,
            type,
            sort,
            page: page.toString(),
            limit: limit.toString()
        }).toString();

        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/properties?${queryParams}`);
        if (!response.ok) {
            throw new Error("Failed to fetch properties");
        }
        return await response.json();
    } catch (error) {
        console.error("API error:", error);
        return { properties: [], totalPages: 1, currentPage: 1, totalProperties: 0 };
    }
};
export const getFeaturedProperties = async () => {
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/featuredProperties`, {
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch featured properties. Status: ${res.status}`);
        }
        const data = await res.json();
        return data;

    } catch (error) {
        console.error("Error in getFeaturedProperties:", error.message);
        return [];
    }
};


export const PropertyDetailsById = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/properties/${id}`);
    const data = await res.json();
    return data;
}


export const addProperty = async (propertyData) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/properties/owner`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(propertyData),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
    }
    return data;
};


export const getOwnerProperties = async (email) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/properties/owner/${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch owner properties');
    }
    return data;
};


export const updatePropertyStatus = async (id, newStatus, feedback = '') => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/properties/admin?newStatus=${newStatus}&feedback=${encodeURIComponent(feedback)}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ id })
    });
    const data = await res.json();
    return data;
};

export const deletePropertyById = async (id) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/properties/admin`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ id })
        });

        if (!res.ok) throw new Error("Network response was not ok");

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("API Error (deletePropertyById):", error);
        throw error;
    }
};