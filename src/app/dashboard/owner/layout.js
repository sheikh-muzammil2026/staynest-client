import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';


export const metadata = {
    title: "Owner Dashboard",
    description: "Manage your properties, tenants, and payouts.",
};

export default async function OwnerLayout({ children }) {
    const user = await getUserSession();

    if (user?.role !== 'owner') {
        redirect('/auth/login');
    }

    return <>{children}</>;
}