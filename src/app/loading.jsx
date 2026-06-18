"use client";
import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#F8FAFC] dark:bg-[#090D16] transition-colors duration-300 relative overflow-hidden">
            {/* Decorative Ambient Glows */}
            <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>

            <div className="flex flex-col items-center gap-4 relative z-10">
                {/* Modern Custom Spinner / Logo Pulse */}
                <motion.div
                    animate={{
                        scale: [1, 1.15, 1],
                        rotate: [0, 180, 360]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-sky-400 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/20"
                >
                    S
                </motion.div>

                {/* Text Loader */}
                <div className="text-center mt-2">
                    <h3 className="text-sm font-bold tracking-widest text-slate-950 dark:text-white uppercase">
                        Stay<span className="text-indigo-500">Nest</span>
                    </h3>
                    <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500 mt-1 tracking-wider">
                        Fetching your premium space...
                    </p>
                </div>

                {/* Minimal Progress Bar */}
                <div className="w-24 h-[3px] bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mt-2">
                    <motion.div
                        initial={{ left: "-100%" }}
                        animate={{ left: "100%" }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        className="relative h-full w-1/2 bg-indigo-500 rounded-full"
                    />
                </div>
            </div>
        </div>
    );
}