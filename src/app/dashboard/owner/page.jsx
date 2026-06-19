import UserProfile from '@/components/shared/userProfile';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const OwnerProfilePage = async () => {
    const user = await getUserSession();

    return (
        <div>
            <UserProfile user={user} />
        </div>
    );
};

export default OwnerProfilePage;