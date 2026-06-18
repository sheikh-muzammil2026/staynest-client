"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Error({ error, reset }) {
    useEffect(() => {
        // আপনি চাইলে এখানে Console বা কোনো লোগিং সার্ভিসে এররটি ট্র্যাক করতে পারেন
        console.error("StayNest Error Catch:", error);
    }, [error]);

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#F8FAFC] dark:bg-[#090D16] px-4 transition-colors duration-300 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-500/5 dark:bg-rose-500/10 rounded-full blur-[120px] pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full bg-white/80 dark:bg-[#131B2E]/50 backdrop-blur-xl p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 shadow-xl text-center"
            >
                {/* Error Badge */}
                <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/30 flex items-center justify-center mx-auto text-rose-500 text-xl font-bold mb-5">
                    ⚠️
                </div>

                {/* Heading */}
                <h2 className="text-xl font-black text-slate-950 dark:text-white tracking-tight">
                    Something went sideways
                </h2>

                {/* Subtext */}
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    StayNest encountered an unexpected issue while setting up your view. Don't worry, your sessions and bookings remain safe.
                </p>

                {/* Error Message Snippet (Optional - For debugging look) */}
                <div className="mt-4 p-3 bg-slate-50 dark:bg-[#090D16] rounded-xl border border-slate-100 dark:border-slate-800 text-[11px] font-mono text-slate-400 dark:text-slate-500 break-all max-h-20 overflow-y-auto">
                    {error?.message || "Action Interrupted (500 Platform Error)"}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={() => reset()}
                        className="flex-1 py-3 px-4 bg-indigo-600 text-white font-bold text-xs rounded-xl hover:bg-indigo-500 transition shadow-md shadow-indigo-500/10"
                    >
                        Try Again
                    </button>

                    <Link
                        href="/"
                        className="flex-1 py-3 px-4 bg-white dark:bg-[#090D16] text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition flex items-center justify-center"
                    >
                        Back to Home
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}