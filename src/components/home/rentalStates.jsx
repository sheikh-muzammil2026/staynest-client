"use client";
import { motion } from "framer-motion";

export default function RentalStats() {
    const stats = [
        { value: "24K+", title: "Successful Leases" },
        { value: "4.8★", title: "Tenant Satisfaction" },
        { value: "$1.2M+", title: "Payouts Processed" },
        { value: "0%", title: "Hidden Upfronts" }
    ];

    return (
        <section className="py-20 bg-slate-950 dark:bg-[#131B2E]/30 text-white relative overflow-hidden border-y border-slate-900 dark:border-slate-800/60">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <p className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-sky-400 bg-clip-text text-transparent tracking-tighter">
                                {stat.value}
                            </p>
                            <p className="mt-2 text-[10px] text-slate-400 font-bold tracking-widest uppercase">
                                {stat.title}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}