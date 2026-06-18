"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const initialFavorites = [
    { id: 1, name: "Silicon Valley Studio", location: "San Jose, CA", price: "$1,800/mo" },
    { id: 2, name: "Miami Penthouse Suite", location: "Miami, FL", price: "$3,800/mo" },
];

export default function Favorites() {
    const [favorites, setFavorites] = useState(initialFavorites);

    const handleRemove = (id) => {
        // এখানে আপনার ব্যাকএন্ডের এপিআই কল বসবে
        setFavorites(favorites.filter(item => item.id !== id));
    };

    return (
        <div className="space-y-6">
            {/* হেডার */}
            <div>
                <h3 className="text-xl font-black tracking-tight text-slate-950 dark:text-white">
                    Favorites
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Manage and access your saved modern property listings.
                </p>
            </div>

            {/* টেবিল লেআউট */}
            <div className="overflow-x-auto rounded-3xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-[#131B2E]/40 backdrop-blur-md shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
                            <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Property Details</th>
                            <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Monthly Rent</th>
                            <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-sm font-medium">
                        <AnimatePresence>
                            {favorites.length > 0 ? (
                                favorites.map((item) => (
                                    <motion.tr
                                        key={item.id}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.2 }}
                                        className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition"
                                    >
                                        <td className="p-4">
                                            <div className="font-bold text-slate-950 dark:text-white">{item.name}</div>
                                            <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">📍 {item.location}</div>
                                        </td>
                                        <td className="p-4 text-slate-700 dark:text-slate-300 font-bold">{item.price}</td>
                                        <td className="p-4 text-right">
                                            <button
                                                onClick={() => handleRemove(item.id)}
                                                className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white font-bold text-[10px] uppercase tracking-wider rounded-xl transition-all duration-200"
                                            >
                                                Remove Favorite
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="p-12 text-center text-xs text-slate-400 dark:text-slate-500 font-medium">
                                        🔍 No properties added to favorites yet.
                                    </td>
                                </tr>
                            )}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>
        </div>
    );
}