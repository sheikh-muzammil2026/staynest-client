"use client";
import { motion } from "framer-motion";

export default function WhyChooseUs() {
    const benefits = [
        {
            title: "Zero Hidden Agency Fees",
            desc: "StayNest cuts out middleman commissions. Connect directly with owners with absolute financial transparency.",
            icon: "💎",
        },
        {
            title: "Immutable Stripe Trust",
            desc: "All reservation deposits are backed by Tier-1 Stripe infrastructure, protecting you from rental fraud.",
            icon: "🛡️",
        },
        {
            title: "Real-time Owner Verification",
            desc: "Admin-moderated listing approval guarantees what you see on your dashboard is 100% authentic.",
            icon: "⚡",
        },
    ];

    return (
        <section className="py-24 bg-[#F8FAFC] dark:bg-[#090D16] border-y border-slate-200/50 dark:border-slate-800/50 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                        Why StayNest
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight mt-2">
                        The Next-Gen Way to Rent Spaces
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {benefits.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="bg-white dark:bg-[#131B2E]/40 p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/70 shadow-sm relative group hover:border-indigo-500/40 transition-all duration-300"
                        >
                            <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-[#090D16] flex items-center justify-center text-xl border border-slate-100 dark:border-slate-800 group-hover:scale-110 transition duration-300">
                                {item.icon}
                            </div>
                            <h3 className="mt-6 text-lg font-bold text-slate-950 dark:text-white">
                                {item.title}
                            </h3>
                            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}