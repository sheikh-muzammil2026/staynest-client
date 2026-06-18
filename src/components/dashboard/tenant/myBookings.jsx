"use client";
import React from "react";
import { motion } from "framer-motion";

// মক ডাটাবেজ (ডাটাবেজ থেকে আসা বুকিংয়ের লিস্ট)
const mockBookings = [
    {
        id: 1,
        propertyName: "Modern Manhattan Loft",
        bookingDate: "June 12, 2026",
        amountPaid: "$2,500",
        bookingStatus: "Confirmed",
        paymentStatus: "Paid",
    },
    {
        id: 2,
        propertyName: "Malibu Beachfront Villa",
        bookingDate: "June 15, 2026",
        amountPaid: "$4,500",
        bookingStatus: "Pending",
        paymentStatus: "Paid",
    },
];

export default function MyBookings() {
    return (
        <div className="space-y-6">
            {/* হেডার */}
            <div>
                <h3 className="text-xl font-black tracking-tight text-slate-950 dark:text-white">
                    My Bookings
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Track all your currently active rental agreements and paid bills.
                </p>
            </div>

            {/* রেসপন্সিভ টেবিল কন্টেইনার */}
            <div className="overflow-x-auto rounded-3xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-[#131B2E]/40 backdrop-blur-md shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
                            <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Property Name</th>
                            <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Booking Date</th>
                            <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Amount Paid</th>
                            <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Booking Status</th>
                            <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Payment Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-sm font-medium">
                        {mockBookings.map((item, idx) => (
                            <motion.tr
                                key={item.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition"
                            >
                                <td className="p-4 text-slate-950 dark:text-white font-bold max-w-xs truncate">
                                    {item.propertyName}
                                </td>
                                <td className="p-4 text-slate-500 dark:text-slate-400">{item.bookingDate}</td>
                                <td className="p-4 text-indigo-600 dark:text-indigo-400 font-black">{item.amountPaid}</td>
                                <td className="p-4">
                                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${item.bookingStatus === "Confirmed"
                                            ? "bg-emerald-500/10 text-emerald-500"
                                            : "bg-amber-500/10 text-amber-500"
                                        }`}>
                                        {item.bookingStatus}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-500">
                                        {item.paymentStatus}
                                    </span>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}