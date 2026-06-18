"use client";
import { motion } from "framer-motion";

export default function Banner() {
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#090D16] overflow-hidden pt-20 transition-colors duration-300">

            {/* Modern Neon Ambient Glows */}
            <div className="absolute top-1/4 left-10 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-sky-500/10 dark:bg-sky-500/20 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

                {/* Tagline */}
                <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30 mb-6"
                >
                    ✨ Next-Gen Property Marketplace
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl sm:text-6xl font-black text-slate-950 dark:text-white tracking-tight leading-none max-w-4xl mx-auto"
                >
                    Your Next Premium Space, <br />
                    <span className="bg-gradient-to-r from-indigo-600 via-purple-500 to-sky-400 bg-clip-text text-transparent">
                        Effortlessly Secured.
                    </span>
                </motion.h1>

                {/* Unique Cyberpunk Glass Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-12 p-2 bg-white/80 dark:bg-[#131B2E]/60 backdrop-blur-xl rounded-2xl sm:rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none max-w-4xl mx-auto border border-slate-200/60 dark:border-slate-800/80"
                >
                    <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 items-center p-2">

                        <div className="flex flex-col text-left px-4 py-2 border-r border-slate-200/80 dark:border-slate-800 last:border-0">
                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Location</span>
                            <input type="text" placeholder="e.g. California" className="w-full mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200 bg-transparent focus:outline-none" />
                        </div>

                        <div className="flex flex-col text-left px-4 py-2 border-r border-slate-200/80 dark:border-slate-800 last:border-0">
                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Property Type</span>
                            <select className="w-full mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200 bg-transparent focus:outline-none cursor-pointer">
                                <option className="dark:bg-[#131B2E]">Penthouse</option>
                                <option className="dark:bg-[#131B2E]">Modern Villa</option>
                                <option className="dark:bg-[#131B2E]">Loft Studio</option>
                            </select>
                        </div>

                        <div className="flex flex-col text-left px-4 py-2 border-r border-slate-200/80 dark:border-slate-800 last:border-0">
                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Budget Range</span>
                            <input type="text" placeholder="$1200 - $4500" className="w-full mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200 bg-transparent focus:outline-none" />
                        </div>

                        <button type="submit" className="w-full py-3.5 px-6 bg-indigo-600 dark:bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 dark:hover:bg-indigo-500 transition shadow-lg shadow-indigo-500/20">
                            Search Hub
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}