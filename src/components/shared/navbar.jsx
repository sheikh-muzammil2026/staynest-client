"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";


export default function Navbar() {
    const [darkMode, setDarkMode] = useState(false);
    const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {
        const theme = localStorage.getItem("theme");
        if (theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            setDarkMode(true);
            document.documentElement.classList.add("dark");
        }
    }, []);

    const toggleTheme = () => {
        if (darkMode) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setDarkMode(false);
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setDarkMode(true);
        }
    };

    const { data: session } = authClient.useSession()
    const user = session?.user;
    const userRole = user?.role;


    const handleLogout = async () => {
        await authClient.signOut();

    };

    return (
        <nav className="fixed w-full bg-white/70 dark:bg-[#090D16]/70 backdrop-blur-xl z-50 border-b border-slate-200/50 dark:border-slate-800/50 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-400 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-500/20">
                            D
                        </div>
                        <span className="text-xl font-black tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                            Dwell<span className="text-indigo-500">X</span>
                        </span>
                    </Link>

                    {/* Desktop Nav Items & Theme Toggle */}
                    <div className="hidden md:flex items-center gap-8 font-medium">
                        <Link href="/" className="text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition">Home</Link>
                        <Link href="/properties" className="text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition">All Properties</Link>

                        {/* 🛠️ ডাইনামিক ড্যাশবোর্ড রুট (ইউজার লগইন থাকলে রোল অনুযায়ী দেখাবে) */}
                        {user && (
                            <Link
                                href={`/dashboard/${userRole}`}
                                className="text-indigo-600 dark:text-indigo-400 font-bold hover:opacity-80 transition"
                            >
                                Dashboard
                            </Link>
                        )}

                        {/* Theme Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:scale-105 transition"
                            aria-label="Toggle Theme"
                        >
                            {darkMode ? "☀️" : "🌙"}
                        </button>

                        {/* 🔐 অ্যাথেনটিকেশন বাটন গ্রপ */}
                        {user ? (
                            // লগইন থাকলে: শুধু Logout বাটন দেখাবে
                            <button
                                onClick={handleLogout}
                                className="px-5 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white transition font-semibold text-sm"
                            >
                                Logout
                            </button>
                        ) : (
                            // লগইন না থাকলে: Login এবং Get Started বাটন দেখাবে
                            <>
                                <Link href="/auth/login" className="text-slate-700 dark:text-slate-300 hover:text-indigo-500 transition">Login</Link>
                                <Link href="/auth/register" className="px-5 py-2.5 rounded-xl bg-slate-950 text-white dark:bg-indigo-600 dark:hover:bg-indigo-500 hover:bg-slate-800 transition shadow-md font-semibold text-sm">
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Hamburger Menu Icon (Mobile) */}
                    <div className="flex md:hidden items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                        >
                            {darkMode ? "☀️" : "🌙"}
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-slate-700 dark:text-white focus:outline-none"
                        >
                            <span className="text-2xl">{isOpen ? "✕" : "☰"}</span>
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="md:hidden bg-white dark:bg-[#090D16] border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 flex flex-col gap-4 font-medium transition-colors duration-300">
                    <Link href="/" onClick={() => setIsOpen(false)} className="text-slate-600 dark:text-slate-300 py-1">Home</Link>
                    <Link href="/properties" onClick={() => setIsOpen(false)} className="text-slate-600 dark:text-slate-300 py-1">All Properties</Link>

                    {/* মোবাইল ড্যাশবোর্ড লিঙ্ক */}
                    {user && (
                        <Link
                            href={`/dashboard/${userRole}`}
                            onClick={() => setIsOpen(false)}
                            className="text-indigo-600 dark:text-indigo-400 font-bold py-1"
                        >
                            Dashboard
                        </Link>
                    )}

                    <hr className="border-slate-100 dark:border-slate-800/60" />

                    {/* মোবাইল অ্যাথেনটিকেশন বাটন */}
                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="w-full py-2.5 text-center rounded-xl bg-rose-500/10 text-rose-500 font-bold text-sm"
                        >
                            Logout
                        </button>
                    ) : (
                        <div className="flex flex-col gap-3">
                            <Link href="/auth/login" onClick={() => setIsOpen(false)} className="w-full py-2.5 text-center text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm">
                                Login
                            </Link>
                            <Link href="/auth/register" onClick={() => setIsOpen(false)} className="w-full py-2.5 text-center bg-indigo-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-indigo-500/10">
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}