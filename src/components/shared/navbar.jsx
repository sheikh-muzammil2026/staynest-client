"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

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

    return (
        <nav className="fixed w-full bg-white/70 dark:bg-[#090D16]/70 backdrop-blur-xl z-50 border-b border-slate-200/50 dark:border-slate-800/50 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">

                    {/* Unique Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-400 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-500/20">
                            D
                        </div>
                        <span className="text-xl font-black tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                            Dwell<span className="text-indigo-500">X</span>
                        </span>
                    </Link>

                    {/* Nav Items & Theme Toggle */}
                    <div className="hidden md:flex items-center gap-8 font-medium">
                        <Link href="/" className="text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition">Home</Link>
                        <Link href="/properties" className="text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition">All Properties</Link>

                        {/* Theme Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:scale-105 transition"
                            aria-label="Toggle Theme"
                        >
                            {darkMode ? "☀️" : "🌙"}
                        </button>

                        <Link href="/auth/login" className="text-slate-700 dark:text-slate-300 hover:text-indigo-500 transition">Login</Link>
                        <Link href="/auth/register" className="px-5 py-2.5 rounded-xl bg-slate-950 text-white dark:bg-indigo-600 dark:hover:bg-indigo-500 hover:bg-slate-800 transition shadow-md font-semibold text-sm">
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}