"use client";
import { motion } from "framer-motion";

const properties = Array(6).fill({
    title: "Aetheria Minimalist Villa",
    location: "Malibu, California",
    price: "3,400",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
});

export default function FeaturedProperties() {
    return (
        <section className="py-28 bg-white dark:bg-[#090D16] transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">Curated Living Spaces</h2>
                        <p className="mt-2 text-slate-500 dark:text-slate-400">Hand-vetted premium spaces with direct-to-owner booking workflows.</p>
                    </div>
                    <button className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-sm text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 transition">
                        Explore All Listings
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="group relative bg-slate-50/50 dark:bg-[#131B2E]/40 rounded-3xl overflow-hidden border border-slate-200/60 dark:border-slate-800/70 p-3 hover:border-indigo-500/50 dark:hover:border-indigo-400/50 transition-all duration-300 shadow-sm"
                        >
                            {/* Image */}
                            <div className="relative h-64 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900">
                                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-3 right-3 bg-slate-950/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
                                    Top Verified
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h3 className="text-lg font-bold text-slate-950 dark:text-white group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition">
                                    {item.title}
                                </h3>
                                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 font-medium">📍 {item.location}</p>

                                <div className="mt-6 flex justify-between items-center bg-white dark:bg-[#131B2E] p-3 rounded-xl border border-slate-100 dark:border-slate-800/40">
                                    <div>
                                        <span className="text-lg font-black text-slate-950 dark:text-white">${item.price}</span>
                                        <span className="text-xs text-slate-400 font-medium">/mo</span>
                                    </div>
                                    <button className="px-3.5 py-2 bg-slate-950 dark:bg-indigo-600 text-white font-bold text-xs rounded-lg hover:opacity-90 transition">
                                        View Lease
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}