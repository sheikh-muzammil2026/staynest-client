import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';

export const metadata = {
    title: "Tenant Dashboard",
    description: "Manage your rented properties and leases.",
};
export default async function TenantLayout({ children }) {
    const user = await getUserSession();
    if (user?.role !== 'tenant') {
        redirect('/auth/login');
    }

    return <>{children}</>;
}