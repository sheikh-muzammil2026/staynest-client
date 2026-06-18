"use client";
import { motion } from "framer-motion";

export default function Reviews() {
    const reviews = [
        { name: "Liam Sterling", role: "Tenant since 2024", comment: "Securing an apartment through StayNest was completely hands-free. The instant lease generation saved me days of paperwork.", rating: "⭐⭐⭐⭐⭐", init: "LS" },
        { name: "Aria Montgomery", role: "Verified Tenant", comment: "Stripe payments are instantaneous. I loved how transparent the platform is regarding owner moderation. Safe experience!", rating: "⭐⭐⭐⭐⭐", init: "AM" },
        { name: "Marcus Vance", role: "Studio Renter", comment: "What blew me away was the UI cleanliness. No spam listings, no fake pictures. Highly recommend StayNest for busy pros.", rating: "⭐⭐⭐⭐⭐", init: "MV" },
        { name: "Elena Rostova", role: "Loft Tenant", comment: "The support team helped me coordinate my move-in seamlessly. Direct dashboard routing to private owner chats is a game-changer.", rating: "⭐⭐⭐⭐⭐", init: "ER" }
    ];

    return (
        <section className="py-24 bg-[#F8FAFC] dark:bg-[#090D16] transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Testimonials</span>
                    <h2 className="text-3xl font-black text-slate-950 dark:text-white tracking-tight mt-1">Trusted By Modern Tenants</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {reviews.map((r, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white dark:bg-[#131B2E]/40 p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/70 shadow-sm flex flex-col justify-between"
                        >
                            <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
                                "{r.comment}"
                            </p>
                            <div className="mt-8 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center font-bold text-sm text-indigo-600 dark:text-indigo-400 border border-indigo-100/40 dark:border-indigo-900/20">
                                    {r.init}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-950 dark:text-white text-xs">{r.name}</h4>
                                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-0.5">{r.role} • {r.rating}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}