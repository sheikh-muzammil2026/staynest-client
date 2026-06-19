"use client";
import Sidebar from "@/components/dashboard/sidebar";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function DashboardLayout({ children }) {

    const [activeTab, setActiveTab] = useState("profile");
    const { data: session } = authClient.useSession()
    const user = session?.user;
    const userRole = user?.role;
    console.log(userRole, "user role from dashboard layout");

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#090D16] text-slate-950 dark:text-white transition-colors duration-300 pt-20 flex flex-col lg:flex-row">

            {/* 🛠️ Dynamic Sidebar Render */}
            <Sidebar
                role={userRole}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            <main className="flex-1 p-6 sm:p-10 max-w-7xl mx-auto w-full">
                {children}
            </main>

        </div>
    );
}