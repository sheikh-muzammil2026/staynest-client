import TenantHome from '@/components/dashboard/tenant/tenantHome';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const tenantDashboardHomePage = async () => {
    const user = await getUserSession();
    return (
        <div>
            <TenantHome user={user} />
        </div>
    );
};

export default tenantDashboardHomePage;