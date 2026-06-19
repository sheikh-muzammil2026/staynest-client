"use client";
import { getFeaturedProperties } from "@/lib/api/properties";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FeaturedProperties() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchProperties = async () => {
            try {
                setLoading(true);
                const data = await getFeaturedProperties();

                if (isMounted) {
                    setProperties(data || []);
                }
            } catch (err) {
                console.error("Failed to fetch properties:", err);
                if (isMounted) {
                    setError("Failed to load featured properties. Please try again later.");
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchProperties();

        return () => {
            isMounted = false;
        };
    }, []);


    if (loading) {
        return (
            <section className="py-28 bg-white dark:bg-[#090D16] text-center">
                <p className="text-slate-500">Loading premium spaces...</p>

            </section>
        );
    }


    if (error) {
        return (
            <section className="py-28 bg-white dark:bg-[#090D16] text-center">
                <p className="text-red-500 font-medium">{error}</p>
            </section>
        );
    }


    if (properties?.length === 0) {
        return (
            <section className="py-28 bg-white dark:bg-[#090D16] text-center">
                <p className="text-slate-500">No properties available right now.</p>
            </section>
        );
    }

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
                    {properties?.map((item, i) => (
                        <motion.div
                            key={item._id || item.id || i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="group relative bg-slate-50/50 dark:bg-[#131B2E]/40 rounded-3xl overflow-hidden border border-slate-200/60 dark:border-slate-800/70 p-3 hover:border-indigo-500/50 dark:hover:border-indigo-400/50 transition-all duration-300 shadow-sm"
                        >
                            {/* Image */}
                            <div className="relative h-64 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900">
                                <Image
                                    fill
                                    src={
                                        item?.image && item.image !== ""
                                            ? item.image
                                            : "https://placehold.co/600x400.png?text=No+Image" // শেষে .png যোগ করা হয়েছে
                                    }
                                    alt={item?.propertyTitle}
                                    sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-3 right-3 bg-slate-950/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
                                    Top Verified
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h3 className="text-lg font-bold text-slate-950 dark:text-white group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition">
                                    {item?.propertyTitle}
                                </h3>
                                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 font-medium">📍 {item?.location}</p>

                                <div className="mt-6 flex justify-between items-center bg-white dark:bg-[#131B2E] p-3 rounded-xl border border-slate-100 dark:border-slate-800/40">
                                    <div>
                                        <span className="text-lg font-black text-slate-950 dark:text-white">${item?.rent}</span>
                                        <span className="text-xs text-slate-400 font-medium">/{item?.rentType}</span> {/* এখানে শুধু $ চিহ্নের বদলে একটি স্লাশ (/) দিয়েছি যা মানানসই */}
                                    </div>
                                    <Link href={`/properties/${item._id}`}><button className="px-3.5 py-2 bg-slate-950 dark:bg-indigo-600 text-white font-bold text-xs rounded-lg hover:opacity-90 transition">
                                        View Lease
                                    </button></Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}