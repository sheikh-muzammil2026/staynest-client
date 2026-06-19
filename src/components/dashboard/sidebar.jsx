"use client";

import Link from "next/link";
import { dashboardConfig } from "./dashboardConfig";

export default function Sidebar({ role = "tenant", activeTab, setActiveTab }) {

    const currentConfig = dashboardConfig[role] || dashboardConfig.tenant;

    return (
        <aside className="w-full lg:w-64 bg-white dark:bg-[#131B2E]/50 backdrop-blur-md border-b lg:border-b-0 lg:border-r border-slate-200/60 dark:border-slate-800/80 p-6 flex flex-col justify-between transition-colors duration-300">

            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto whitespace-nowrap lg:whitespace-normal w-full">
                {/* Dynamic Logo & Title Area */}
                <div className="hidden lg:flex items-center gap-2 mb-8 px-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-sky-400 flex items-center justify-center text-white font-black text-xs">
                        {currentConfig.logoText}
                    </div>
                    <div>
                        <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Workspace</p>
                        <h2 className="text-sm font-black text-slate-950 dark:text-white tracking-tight mt-0.5">
                            {currentConfig.title}
                        </h2>
                    </div>
                </div>

                {/* Dynamic Routes Generation */}
                {currentConfig.routes.map((route, idx) => {
                    // লেবেল থেকে স্লাগ তৈরি করা (যেমন: "📋 My Bookings" -> "bookings")
                    const routeKey = route.label.toLowerCase().split(" ").pop();
                    const path = route.path;
                    console.log(path, "routekey from sidebar");
                    const isActive = activeTab === routeKey;

                    return (
                        <Link href={`${path}`} key={idx}><button

                            onClick={() => setActiveTab(routeKey)}
                            className={`px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-left transition flex-shrink-0 lg:w-full ${isActive
                                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/10"
                                : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/60"
                                }`}
                        >
                            {route.label}
                        </button></Link>
                    );
                })}
            </div>

            {/* Static Footer Section inside Sidebar (Optional) */}
            <div className="hidden lg:block px-2 pt-4 border-t border-slate-100 dark:border-slate-800/60">
                <p className="text-[10px] text-slate-400 font-medium">Logged in as:</p>
                <p className="text-xs font-bold text-indigo-500 capitalize">{role}</p>
            </div>

        </aside>
    );
}