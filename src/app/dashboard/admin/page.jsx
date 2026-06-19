import AdminHome from '@/components/dashboard/admin/adminHome';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const adminHomePage = async () => {
    const user = await getUserSession();
    return (
        <div>
            <AdminHome user={user} />
        </div>
    );
};

export default adminHomePage;