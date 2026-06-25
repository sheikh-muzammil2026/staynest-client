"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Menu, X } from "lucide-react";
import { dashboardConfig } from "./dashboardConfig";

export default function Sidebar({ role = "tenant" }) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const currentConfig = dashboardConfig[role] || dashboardConfig.tenant;

    // মেনু টগল করার ফাংশন
    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            {/* 📱 মোবাইল ও ট্যাবলেটের জন্য টপ বার এবং হ্যামবার্গার বাটন */}
            <div className="lg:hidden w-full bg-white dark:bg-[#131B2E] border-b border-slate-200/60 dark:border-slate-800/80 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-sky-400 flex items-center justify-center text-white font-black text-xs">
                        {currentConfig.logoText}
                    </div>
                    <h2 className="text-sm font-black text-slate-950 dark:text-white tracking-tight">
                        {currentConfig.title}
                    </h2>
                </Link>

                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/60 transition"
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* 🪟 মোবাইল ড্রয়ারের জন্য ব্যাকড্রপ (অন্ধকার আবহ) */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity"
                    onClick={toggleSidebar}
                />
            )}

            {/* 🧭 মূল সাইডবার কম্পোনেন্ট */}
            <aside className={`
                fixed top-0 bottom-0 left-0 z-40 lg:sticky lg:top-0
                w-64 h-full bg-white dark:bg-[#131B2E]/50 backdrop-blur-md 
                border-r border-slate-200/60 dark:border-slate-800/80 p-6 
                flex flex-col justify-between transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}>

                <div className="flex flex-col gap-2 w-full">
                    {/* 🏠 লোগো এরিয়া (শুধুমাত্র ডেক্সটপে দৃশ্যমান) */}
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

                    {/* মোবাইল ড্রয়ারের ভেতরে ক্লোজ বাটন */}
                    <div className="lg:hidden flex justify-end mb-4">
                        <button onClick={toggleSidebar} className="p-1 rounded-md text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900">
                            <X size={18} />
                        </button>
                    </div>

                    {/* ডাইনামিক রুটস বা লিংকসমূহ */}
                    <div className="flex flex-col gap-2 w-full overflow-y-auto max-h-[calc(100vh-200px)] lg:max-h-none">
                        {currentConfig.routes.map((route, idx) => {
                            const isActive = pathname === route.path;

                            return (
                                <Link
                                    href={route.path}
                                    key={idx}
                                    className="w-full"
                                    onClick={() => setIsOpen(false)} // লিংকে ক্লিক করলে মোবাইল মেনু বন্ধ হয়ে যাবে
                                >
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

                {/* 🔄 নিচের অংশ: ব্যাক বাটন ও ইউজার ইনফো (সব ডিভাইসেই সুন্দর দেখাবে) */}
                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/60 mt-auto">
                    <Link href="/" className="w-full block">
                        <button className="w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/80 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all border border-dashed border-slate-200 dark:border-slate-800">
                            <ArrowLeft size={14} className="animate-pulse" />
                            Go Back Home
                        </button>
                    </Link>

                    <div className="px-2">
                        <p className="text-[10px] text-slate-400 font-medium">Logged in as:</p>
                        <p className="text-xs font-bold text-indigo-500 capitalize">{role}</p>
                    </div>
                </div>
            </aside>
        </>
    );
}