"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Banner() {
    const propertyTypes = ["Penthouse", "Modern Villa", "Loft Studio", "Duplex Apartment"];
    const defaultMinPrice = "1000";
    const defaultMaxPrice = "10000";

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Searching...");
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#090D16] overflow-hidden pt-20 transition-colors duration-300">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Image
                    src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1920&q=80"
                    alt="Premium Luxury Real Estate Banner"
                    fill
                    className="object-cover object-center opacity-[0.30] dark:opacity-[0.40]"
                    priority
                />
                <div className="absolute inset-0 bg-transparent dark:bg-black/40"></div>
            </div>

            <div className="absolute top-1/4 left-10 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-sky-500/10 dark:bg-sky-500/20 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
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

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
                >
                    Discover the ultimate luxury spaces tailored to your lifestyle. Seamlessly browse, filter, and secure your next premium property with our next-gen platform.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-12 p-2 bg-white/95 dark:bg-[#131B2E]/70 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-200/80 dark:shadow-none max-w-5xl mx-auto border border-slate-200/80 dark:border-slate-800/80"
                >
                    <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 items-center p-2">
                        <div className="flex flex-col text-left px-4 py-2 border-b sm:border-b-0 sm:border-r border-slate-200/80 dark:border-slate-800 last:border-0 lg:border-r">
                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Location</span>
                            <input
                                type="text"
                                placeholder="e.g. California"
                                className="w-full mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 bg-transparent focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col text-left px-4 py-2 border-b sm:border-b-0 sm:border-r border-slate-200/80 dark:border-slate-800 last:border-0 lg:border-r">
                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Property Type</span>
                            <select className="w-full mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200 bg-transparent focus:outline-none cursor-pointer">
                                {propertyTypes.map((type, index) => (
                                    <option key={index} className="text-slate-900 dark:text-slate-200 dark:bg-[#131B2E]" value={type.toLowerCase()}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col text-left px-4 py-2 border-b sm:border-b-0 sm:border-r border-slate-200/80 dark:border-slate-800 last:border-0 lg:border-r">
                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Min Price (USD)</span>
                            <input
                                type="number"
                                placeholder={`e.g. $${defaultMinPrice}`}
                                className="w-full mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 bg-transparent focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col text-left px-4 py-2 border-b sm:border-b-0 sm:border-r lg:border-r border-slate-200/80 dark:border-slate-800 last:border-0">
                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Max Price (USD)</span>
                            <input
                                type="number"
                                placeholder={`e.g. $${defaultMaxPrice}`}
                                className="w-full mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 bg-transparent focus:outline-none"
                            />
                        </div>

                        <button type="submit" className="w-full py-3.5 px-6 bg-indigo-600 dark:bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 dark:hover:bg-indigo-500 transition shadow-lg shadow-indigo-500/20 focus:outline-none">
                            Search Hub
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}