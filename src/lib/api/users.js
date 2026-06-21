// ১. সমস্ত ইউজার গেট করা
export const getUsers = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/users`);
    const users = await res.json();
    return users;
};

// ২. ইউজারের রোল পরিবর্তন করা (PATCH)
export const updateUserRole = async (id, newRole) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/users/role`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ id, role: newRole })
    });
    return await res.json();
};

// ৩. ইউজার ডিলিট করা (DELETE)
export const deleteUserById = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/users`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ id })
    });
    return await res.json();
};