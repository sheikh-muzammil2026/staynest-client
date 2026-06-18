"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, Button } from "@heroui/react";

export default function TenantHome({ setActiveTab }) {
    // মক ডাটা (ইউজারের রিয়াল-টাইম ড্যাশবোর্ড সামারি)
    const stats = [
        { title: "Total Bookings", value: "02", icon: "📋", color: "from-indigo-500/10 to-purple-500/10 text-indigo-600 dark:text-indigo-400" },
        { title: "Favorite Spaces", value: "05", icon: "❤️", color: "from-rose-500/10 to-orange-500/10 text-rose-500" },
        { title: "Monthly Leases", value: "$4,300", icon: "💰", color: "from-emerald-500/10 to-teal-500/10 text-emerald-500" },
    ];

    const recentActivities = [
        { id: 1, type: "booking", text: "Your booking for 'Modern Manhattan Loft' was approved.", time: "2 hours ago" },
        { id: 2, type: "payment", text: "Invoice #STN-9821 for $2,500 successfully paid.", time: "1 day ago" },
        { id: 3, type: "system", text: "Welcome to StayNest! Account verification completed.", time: "3 days ago" },
    ];

    return (
        <div className="space-y-10">

            {/* 👋 Welcome Header */}
            <div>
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                    Overview Dashboard
                </span>
                <h1 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight mt-1">
                    Welcome Back, Tenant!
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Here is what's happening with your rental properties and applications today.
                </p>
            </div>

            {/* 📈 Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                    >
                        <Card className="bg-white dark:bg-[#131B2E]/40 border border-slate-200/60 dark:border-slate-800/70 p-6 rounded-3xl shadow-sm flex flex-row items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                                    {stat.title}
                                </p>
                                <p className="text-2xl font-black text-slate-950 dark:text-white tracking-tighter">
                                    {stat.value}
                                </p>
                            </div>
                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-xl font-bold`}>
                                {stat.icon}
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* 🔄 Two Column Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Side: Recent Activities */}
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Recent Activities
                    </h3>
                    <div className="bg-white/80 dark:bg-[#131B2E]/30 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/70 rounded-3xl p-6 shadow-sm divide-y divide-slate-100 dark:divide-slate-800/50">
                        {recentActivities.map((activity) => (
                            <div key={activity.id} className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4 text-xs">
                                <div className="flex gap-3 items-start">
                                    <span className="text-base mt-0.5">
                                        {activity.type === "booking" ? "✅" : activity.type === "payment" ? "💳" : "🎉"}
                                    </span>
                                    <p className="font-semibold text-slate-700 dark:text-slate-300 leading-relaxed">
                                        {activity.text}
                                    </p>
                                </div>
                                <span className="text-[10px] font-medium text-slate-400 whitespace-nowrap">
                                    {activity.time}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Quick Shortcuts */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Quick Actions
                    </h3>
                    <Card className="bg-white dark:bg-[#131B2E]/40 border border-slate-200/60 dark:border-slate-800/70 p-6 rounded-3xl shadow-sm space-y-4">
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                            Need to check your pending invoices or modify shortlists? Navigate instantly below.
                        </p>

                        <div className="space-y-2.5">
                            <Button
                                onClick={() => setActiveTab("bookings")}
                                size="sm"
                                className="w-full bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl py-5"
                            >
                                View Active Bookings
                            </Button>
                            <Button
                                onClick={() => setActiveTab("favorites")}
                                size="sm"
                                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl py-5 shadow-lg shadow-indigo-500/10"
                            >
                                Browse Saved Favorites
                            </Button>
                        </div>
                    </Card>
                </div>

            </div>

        </div>
    );
}