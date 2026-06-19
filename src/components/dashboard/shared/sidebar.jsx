"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { dashboardConfig } from "./dashboardConfig";

export default function Sidebar({ role = "tenant" }) {
    const pathname = usePathname();
    const currentConfig = dashboardConfig[role] || dashboardConfig.tenant;

    return (
        <aside className="w-full lg:w-64 bg-white dark:bg-[#131B2E]/50 backdrop-blur-md border-b lg:border-b-0 lg:border-r border-slate-200/60 dark:border-slate-800/80 p-6 flex flex-col justify-between h-full transition-colors duration-300">

            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible whitespace-nowrap lg:whitespace-normal w-full">

                {/* 🏠 Logo Area (Now links to Home Page) */}
                <Link href="/" className="hidden lg:flex items-center gap-2 mb-8 px-2 hover:opacity-80 transition-opacity cursor-pointer group">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-sky-400 flex items-center justify-center text-white font-black text-xs group-hover:scale-105 transition-transform">
                        {currentConfig.logoText}
                    </div>
                    <div>
                        <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Workspace</p>
                        <h2 className="text-sm font-black text-slate-950 dark:text-white tracking-tight mt-0.5">
                            {currentConfig.title}
                        </h2>
                    </div>
                </Link>

                {/* Dynamic Routes */}
                <div className="flex flex-row lg:flex-col gap-2 w-full">
                    {currentConfig.routes.map((route, idx) => {
                        const isActive = pathname === route.path;

                        return (
                            <Link href={route.path} key={idx} className="w-full">
                                <span className={`block px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-left transition ${isActive
                                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/10"
                                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/60"
                                    }`}>
                                    {route.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* 🔄 Bottom Section: Back to Home Button & User Info */}
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/60 hidden lg:block">

                {/* 👈 Go Back Home Dedicated Button */}
                <Link href="/" className="w-full block">
                    <button className="w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/80 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all border border-dashed border-slate-200 dark:border-slate-800">
                        <ArrowLeft size={14} className="animate-pulse" />
                        Go Back Home
                    </button>
                </Link>

                {/* Footer Login Status */}
                <div className="px-2">
                    <p className="text-[10px] text-slate-400 font-medium">Logged in as:</p>
                    <p className="text-xs font-bold text-indigo-500 capitalize">{role}</p>
                </div>
            </div>
        </aside>
    );
}