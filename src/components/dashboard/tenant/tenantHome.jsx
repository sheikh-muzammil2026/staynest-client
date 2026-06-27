"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, Button, Spinner } from "@heroui/react";
import { authClient } from '@/lib/auth-client';

export default function TenantHome({ setActiveTab }) {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const userEmail = user?.email;

    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userEmail) return;

        const fetchTenantAnalytics = async () => {
            try {
                // authClient থেকে টোকেন গেট করা হচ্ছে
                const { data: tokenData } = await authClient.token();
                const token = tokenData?.token;

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URI}/tenant/analytics?email=${userEmail}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            ...(token ? { "Authorization": `Bearer ${token}` } : {})
                        }
                    }
                );

                if (!res.ok) throw new Error("Failed to fetch tenant analytics");

                const data = await res.json();
                if (data.success) {
                    setAnalytics(data);
                }
            } catch (err) {
                console.error("Error loading tenant dashboard:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTenantAnalytics();
    }, [userEmail]);

    if (loading) {
        return (
            <div className="h-[60vh] flex flex-col justify-center items-center gap-2">
                <Spinner color="indigo" size="lg" />
                <p className="text-xs text-slate-500 font-medium">Loading your dashboard info...</p>
            </div>
        );
    }

    // ব্যাকেন্ড থেকে আসা ডেটা সাজানো
    const stats = [
        { 
            title: "Total Bookings", 
            value: String(analytics?.summary?.totalBookings || 0).padStart(2, '0'), 
            icon: "📋", 
            color: "from-indigo-500/10 to-purple-500/10 text-indigo-600 dark:text-indigo-400" 
        },
        { 
            title: "Favorite Spaces", 
            value: String(analytics?.summary?.totalFavorites || 0).padStart(2, '0'), 
            icon: "❤️", 
            color: "from-rose-500/10 to-orange-500/10 text-rose-500" 
        },
        { 
            title: "Total Spent", 
            value: `$${analytics?.summary?.totalSpent?.toLocaleString() || 0}`, 
            icon: "💰", 
            color: "from-emerald-500/10 to-teal-500/10 text-emerald-500" 
        },
    ];

    // Array.isArray দিয়ে নিশ্চিত হওয়া যে এটি একটি অ্যারে
    const recentActivities = Array.isArray(analytics?.recentActivities) ? analytics.recentActivities : [];

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
                        {recentActivities.length > 0 ? (
                            recentActivities.map((activity, idx) => (
                                // key হিসেবে activity.id না থাকলে fallback হিসেবে idx ব্যবহার করা হয়েছে
                                <div key={activity.id || idx} className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4 text-xs">
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
                            ))
                        ) : (
                            <p className="text-xs text-slate-400 text-center py-4">No recent activities found.</p>
                        )}
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
