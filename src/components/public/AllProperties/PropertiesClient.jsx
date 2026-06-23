"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, Input, Select, SelectItem, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { getAllProperties } from "@/lib/api/properties";

export default function AllProperties() {
    const [properties, setProperties] = useState([]);
    const [search, setSearch] = useState("");
    const [type, setType] = useState("all");
    const [sort, setSort] = useState("");
    const [initialProperties, setInitialProperties] = useState([]);
    const [loading, setLoading] = useState(false)


    useEffect(() => {

        const fetchProperties = async () => {
            setLoading(true)
            const data = await getAllProperties()

            setInitialProperties(data)
            setLoading(false)
        }
        fetchProperties()
    }, [])


    if (loading) {
        return (
            <section className="py-28 bg-white dark:bg-[#090D16] text-center">
                <p className="text-slate-500">Loading premium spaces...</p>

            </section>
        );
    }


    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#090D16] text-slate-950 dark:text-white px-4 sm:px-6 lg:px-8 py-24 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-10 text-center sm:text-left">
                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Marketplace</span>
                    <h1 className="text-3xl font-black tracking-tight mt-1">Available Properties</h1>
                </div>

                {/* Search, Filter & Sort Control Panel (Glassmorphism Look) */}
                <div className="bg-white/80 dark:bg-[#131B2E]/40 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/70 p-6 rounded-3xl shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">

                    {/* Location Search Input */}
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1.5">Search by Location</label>
                        <Input
                            type="text"
                            placeholder="e.g. New York, Miami..."
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
                            <option value="Apartment">Apartment</option>
                            <option value="Villa">Villa</option>
                            <option value="Studio">Studio</option>
                            <option value="Cabin">Cabin</option>
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

                {/* 3-Column Grid Layout */}
                {initialProperties?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {initialProperties?.map((property, idx) => (
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
                                            src={
                                                property.image && property.image !== ""
                                                    ? property.image
                                                    : "https://placehold.co/600x400.png?text=No+Image" // শেষে .png যোগ করা হয়েছে
                                            }
                                            alt={property?.propertyTitle}
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

                                        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                                            <div>
                                                <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">${property.rent}</span>
                                                <span className="text-[10px] text-slate-400 font-medium"> ${property.rentType}</span>
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
                        ))}
                    </div>
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