"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, Input, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { getAllProperties } from "@/lib/api/properties";

export default function AllProperties() {
    const [properties, setProperties] = useState([]);
    const [search, setSearch] = useState("");
    const [type, setType] = useState("all");
    const [sort, setSort] = useState("");
    const [loading, setLoading] = useState(true);

    // Pagination States
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // সার্চ, টাইপ বা সর্ট পরিবর্তন হলে পেজ ১ নম্বরে রিসেট হবে
    useEffect(() => {
        setPage(1);
    }, [search, type, sort]);

    useEffect(() => {
        const fetchProperties = async () => {
            setLoading(true);
            const data = await getAllProperties(search, type, sort, page, 9);

            // ব্যাকএন্ড স্ট্রাকচার অনুযায়ী স্টেট সেট করা
            setProperties(data?.properties || []);
            setTotalPages(data?.totalPages || 1);
            setLoading(false);
        };

        const delayDebounceFn = setTimeout(() => {
            fetchProperties();
        }, 400);

        return () => clearTimeout(delayDebounceFn);
    }, [search, type, sort, page]);

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#090D16] text-slate-950 dark:text-white px-4 sm:px-6 lg:px-8 py-24 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-10 text-center sm:text-left">
                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Marketplace</span>
                    <h1 className="text-3xl font-black tracking-tight mt-1">Available Properties</h1>
                </div>

                {/* Search, Filter & Sort Control Panel */}
                <div className="bg-white/80 dark:bg-[#131B2E]/40 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/70 p-6 rounded-3xl shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">

                    {/* Location Search Input */}
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1.5">Search by Location</label>
                        <Input
                            type="text"
                            placeholder="e.g. Sylhet, Zindabazar..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full"
                            variant="flat"
                            radius="lg"
                        />
                    </div>

                    {/* Property Type Filter */}
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1.5">Filter by Type</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-200 border-none focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition h-[40px]"
                        >
                            <option value="all">All Property Types</option>
                            {/* 💡 আপনার ডাটাবেজের সাথে মিল রেখে Commercial Space ক্যাটাগরি যুক্ত করা হলো */}
                            <option value="Commercial Space">Commercial Space</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Villa">Villa</option>
                            <option value="Studio">Studio</option>
                        </select>
                    </div>

                    {/* Price Sorting */}
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1.5">Sort by Price</label>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-200 border-none focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition h-[40px]"
                        >
                            <option value="">Default Sorting</option>
                            <option value="low-to-high">Price: Low to High</option>
                            <option value="high-to-low">Price: High to Low</option>
                        </select>
                    </div>

                </div>

                {/* Loading state */}
                {loading ? (
                    <section className="py-28 text-center">
                        <p className="text-slate-500 animate-pulse">Loading premium spaces...</p>
                    </section>
                ) : properties?.length > 0 ? (
                    <>
                        {/* 3-Column Grid Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {properties.map((property, idx) => {
                                // 💡 ইমেজ অ্যারে থেকে প্রথম ইমেজ নেওয়ার সিস্টেম (Fall-back সহ)
                                const displayImage = property.images && Array.isArray(property.images) && property.images.length > 0
                                    ? property.images[0]
                                    : "https://placehold.co/600x400.png?text=No+Image";

                                return (
                                    <motion.div
                                        key={property._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                    >
                                        <Card className="bg-white dark:bg-[#131B2E]/40 border border-slate-200/60 dark:border-slate-800/70 rounded-3xl overflow-hidden group hover:border-indigo-500/40 transition-all duration-300 shadow-sm">
                                            
                                            {/* Property Image */}
                                            <div className="h-56 w-full overflow-hidden relative">
                                                <Image
                                                    fill
                                                    src={displayImage}
                                                    alt={property?.propertyTitle || "Property Image"}
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    priority={idx < 3} // প্রথম ৩টি ইমেজের জন্য অপ্টিমাইজেশন
                                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                                />
                                                <span className="absolute top-4 left-4 bg-white/90 dark:bg-slate-950/90 text-slate-900 dark:text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                                                    {property.propertyType}
                                                </span>
                                            </div>

                                            {/* Property Content */}
                                            <div className="p-6">
                                                <div className="flex justify-between items-start gap-2">
                                                    <h3 className="font-bold text-base text-slate-950 dark:text-white group-hover:text-indigo-500 transition duration-300 line-clamp-1">
                                                        {property.propertyTitle}
                                                    </h3>
                                                </div>

                                                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 flex items-center gap-1">
                                                    📍 {property.location}
                                                </p>

                                                {/* 💡 description বা size দেখানোর জন্য অপশনাল ছোট একটি অংশ */}
                                                {property.propertySize && (
                                                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2">
                                                        Size: {property.propertySize}
                                                    </p>
                                                )}

                                                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                                                    <div>
                                                        {/* 💡 কারেন্সি সিম্বল বা ফরম্যাট আপনার ইচ্ছা অনুযায়ী পরিবর্তন করতে পারেন */}
                                                        <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">৳{property.rent.toLocaleString()}</span>
                                                        <span className="text-[10px] text-slate-400 font-medium"> /{property.rentType?.toLowerCase() || "monthly"}</span>
                                                    </div>

                                                    <Link href={`/properties/${property._id}`}>
                                                        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-500/10">
                                                            View Details
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </Card>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-4 mt-12">
                                <Button
                                    size="sm"
                                    variant="flat"
                                    className="font-bold text-xs rounded-xl"
                                    isDisabled={page === 1}
                                    onPress={() => setPage((prev) => Math.max(prev - 1, 1))}
                                >
                                    Previous
                                </Button>
                                <span className="text-xs font-bold text-slate-500">
                                    Page {page} of {totalPages}
                                </span>
                                <Button
                                    size="sm"
                                    variant="flat"
                                    className="font-bold text-xs rounded-xl"
                                    isDisabled={page === totalPages}
                                    onPress={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                                >
                                    Next
                                </Button>
                            </div>
                        )}
                    </>
                ) : (
                    /* Empty/No Results State */
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 bg-white dark:bg-[#131B2E]/20 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800"
                    >
                        <span className="text-3xl">🔍</span>
                        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mt-3">No Approved Listings Found</h3>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Try adjusting your location search or filtering options.</p>
                    </motion.div>
                )}

            </div>
        </div>
    );
}
