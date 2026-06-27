export const submitBookings = async (payload) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/bookings`, {
        method: "POST",
        headers: {
            "content-type": 'application/json'
        },
        body: JSON.stringify(payload)

    })
    const data = await res.json();
    return data;
}

export const getAllBookings = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/bookings`)
    const data = await res.json()
    return data;
}

export const getOwnerBookings = async (ownerEmail) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/bookings/owner?ownerEmail=${ownerEmail}`)
    const data = res.json();
    return data;
}


export const getTenantBookings = async (tenantEmail) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/bookings/tenant?tenantEmail=${tenantEmail}`)
    const data = res.json();
    return data;
}

export const updateBookingStatus = async (id, status) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/bookings/status`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status }),
    });
    if (!res.ok) throw new Error("Failed to update booking status");
    return res.json();
};
