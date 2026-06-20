
import Sidebar from "@/components/dashboard/shared/sidebar";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {

    const user = await getUserSession();



    if (!user) {
        redirect("/auth/login");
    }

    return (
        <div className="h-screen w-full bg-[#F8FAFC] dark:bg-[#090D16] text-slate-950 dark:text-white transition-colors duration-300 flex flex-col lg:flex-row overflow-hidden">


            <div className="w-full lg:w-64 lg:h-full shrink-0">
                <Sidebar role={user?.role} />
            </div>

            {/* 🖥️ Main Content Area */}
            <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
                <div className="max-w-7xl mx-auto w-full">
                    {children}
                </div>
            </main>

        </div>
    );
}