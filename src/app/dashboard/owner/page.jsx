import OwnerDashboard from '@/components/dashboard/owner/page';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const ownerDashboardPage = async () => {
    const user = await getUserSession()
    return (
        <OwnerDashboard
        user={user} 
        />
    );
};

export default ownerDashboardPage;
