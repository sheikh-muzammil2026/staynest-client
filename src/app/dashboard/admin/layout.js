
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }) {
  const user = await getUserSession();

  if (user?.role !== 'admin') {
    redirect('/UnauthorizedPage')
  }

  return <>{children}</>;
}