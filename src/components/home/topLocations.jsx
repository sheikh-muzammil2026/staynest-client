"use client";
import { motion } from "framer-motion";

export default function TopLocations() {
    const locations = [
        { name: "Manhattan Lofts", counts: "42 Properties", img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=400&q=80" },
        { name: "Malibu Beachfront", counts: "28 Properties", img: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=400&q=80" },
        { name: "Miami Penthouses", counts: "19 Properties", img: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=400&q=80" },
        { name: "Silicon Studios", counts: "35 Properties", img: "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=400&q=80" }
    ];

    return (
        <section className="py-24 bg-white dark:bg-[#090D16] transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="mb-12">
                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Neighborhoods</span>
                    <h2 className="text-3xl font-black text-slate-950 dark:text-white tracking-tight mt-1">Explore Top Districts</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {locations.map((loc, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative rounded-2xl overflow-hidden h-72 group cursor-pointer border border-slate-100 dark:border-slate-900"
                        >
                            <img src={loc.img} alt={loc.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent p-5 flex flex-col justify-end">
                                <h3 className="text-base font-bold text-white tracking-tight">{loc.name}</h3>
                                <p className="text-[10px] text-slate-300 font-medium tracking-wide mt-0.5">{loc.counts}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}