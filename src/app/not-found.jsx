"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#F8FAFC] dark:bg-[#090D16] px-4 transition-colors duration-300 relative overflow-hidden">
            {/* Dynamic Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sky-500/10 dark:bg-sky-500/20 rounded-full blur-[120px] pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-md w-full bg-white/80 dark:bg-[#131B2E]/50 backdrop-blur-xl p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 shadow-xl text-center relative z-10"
            >
                {/* Animated Neon 404 Badge */}
                <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="text-7xl font-black bg-gradient-to-r from-indigo-600 via-purple-500 to-sky-400 bg-clip-text text-transparent tracking-tighter"
                >
                    404
                </motion.div>

                {/* Brand Logo & Name */}
                <div className="flex items-center justify-center gap-1.5 mt-2 mb-6">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                        StayNest Security Hub
                    </span>
                </div>

                {/* Heading */}
                <h2 className="text-xl font-black text-slate-950 dark:text-white tracking-tight">
                    Lost in the Neighborhood?
                </h2>

                {/* Subtext */}
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    The property or lease page you are looking for doesn't exist, has been moved, or is currently undergoing administrative moderation.
                </p>

                {/* Interactive Map/Compass Asset Simulation */}
                <div className="my-6 p-4 bg-slate-50 dark:bg-[#090D16] rounded-2xl border border-slate-100 dark:border-slate-800/60 flex items-center justify-center gap-3">
                    <span className="text-xl animate-bounce">📍</span>
                    <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        Address match failed. Let's get you back on track.
                    </span>
                </div>

                {/* Action Button */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                        href="/"
                        className="block w-full py-3.5 bg-indigo-600 text-white font-bold text-xs rounded-xl hover:bg-indigo-500 transition shadow-lg shadow-indigo-500/20 text-center"
                    >
                        Return to Home Base
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}