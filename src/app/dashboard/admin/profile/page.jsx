import UserProfile from '@/components/shared/userProfile';
import { getSession } from '@/lib/core/session';
import React from 'react';

const AdminProfilePage = async () => {
    const user = await getSession()
    return (
        <div>
            <UserProfile user={user} />
        </div>
    );
};

export default AdminProfilePage;