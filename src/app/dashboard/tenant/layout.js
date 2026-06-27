import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';

export default async function TenantLayout({ children }) {
    const user = await getUserSession();
    if (user?.role !== 'tenant') {
        redirect('/auth/login');
    }

    return <>{children}</>;
}