"use client";
import React, { useEffect, useState } from 'react';
import {
    DollarSign, Users, Home, Calendar, TrendingUp,
    ArrowUpRight, ArrowDownRight, Clock, CheckCircle,
    AlertCircle, Loader2
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { authClient } from '@/lib/auth-client';

export default function AdminHome() {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { data: session, isPending: isSessionLoading } = authClient.useSession();
    const user = session?.user;

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                setLoading(true);
                setError(null);

                const tokenResponse = await authClient.token();
                const token = tokenResponse?.data?.token;

                if (!token) {
                    setError("Authorization token missing. Admin verification failed.");
                    setLoading(false);
                    return;
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/admin/analytics`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    if (response.status === 403) throw new Error("Access Denied: Only Admin accounts can view this page.");
                    throw new Error("Failed to sync with StayNest Admin Engine.");
                }

                const data = await response.json();
                setAnalytics(data);
            } catch (err) {
                console.error("Error loading admin dashboard:", err);
                setError(err.message || "An unexpected network error occurred.");
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchAdminData();
        }
    }, [user]);

    if (isSessionLoading || loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] w-full gap-3 text-slate-500 p-4">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <p className="text-sm font-medium animate-pulse">Syncing StayNest Database...</p>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="flex items-center justify-center min-h-[60vh] w-full p-4">
                <div className="bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 p-5 sm:p-6 rounded-2xl text-center max-w-md w-full font-medium shadow-sm">
                    <AlertCircle className="mx-auto mb-2 h-6 w-6 text-rose-500" />
                    {error || "Access Denied. Please log in as an administrator."}
                </div>
            </div>
        );
    }

    const summary = analytics?.summary || {};
    const chartData = analytics?.chartData || [];
    const recentActivities = analytics?.recentActivities || [];

    const statsConfig = [
        { title: 'Total Revenue', value: `$${Number(summary.totalRevenue || 0).toLocaleString()}`, icon: DollarSign, color: 'bg-emerald-500', change: summary.revenueChange },
        { title: 'Total Users', value: (summary.totalUsers || 0).toLocaleString(), icon: Users, color: 'bg-blue-500', change: summary.userChange },
        { title: 'Active Properties', value: (summary.activeProperties || 0).toLocaleString(), icon: Home, color: 'bg-violet-500', change: summary.propertyChange },
        { title: 'Total Bookings', value: (summary.totalBookings || 0).toLocaleString(), icon: Calendar, color: 'bg-amber-500', change: summary.bookingChange },
    ];

    const getActivityIcon = (type) => {
        switch (type) {
            case 'booking': return { icon: CheckCircle, style: 'text-emerald-500 bg-emerald-500/10' };
            case 'property': return { icon: Clock, style: 'text-amber-500 bg-amber-500/10' };
            default: return { icon: Users, style: 'text-blue-500 bg-blue-500/10' };
        }
    };

    return (
        <div className="w-full max-w-[1600px] mx-auto p-3 xs:p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 animate-in fade-in duration-500 box-border overflow-x-hidden">

            {/* 🌟 Top Header: Responsive Layout */}
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
                <div className="space-y-0.5 sm:space-y-1">
                    <h1 className="text-xl xs:text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                        StayNest Central Command 📊
                    </h1>
                    <p className="text-[11px] xs:text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                        Real-time master control panel and system wide logs.
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-3 py-1.5 xs:px-4 xs:py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-[11px] xs:text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 shadow-sm w-fit shrink-0 self-start sm:self-center">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    Live Mainframe Sync
                </div>
            </header>

            {/* 📊 Metrics Cards: 1 Col on Mobile, 2 on Tablet, 4 on Desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 w-full">
                {statsConfig.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <div key={idx} className="bg-white dark:bg-slate-800 p-4 xs:p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm group hover:shadow-md transition-shadow w-full box-border">
                            <div className="flex justify-between items-start gap-2">
                                <div className={`p-2 xs:p-2.5 sm:p-3 rounded-xl text-white ${stat.color} shadow-lg shadow-current/10 group-hover:scale-105 transition-transform shrink-0`}>
                                    <Icon className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6" />
                                </div>
                                <span className="flex items-center text-[10px] xs:text-xs font-bold px-2 py-0.5 xs:py-1 rounded-md text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10 shrink-0 truncate max-w-[120px]">
                                    {stat.change}
                                </span>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-[10px] xs:text-xs sm:text-sm font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider truncate">{stat.title}</h3>
                                <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white mt-0.5 xs:mt-1 tracking-tight truncate">
                                    {stat.value}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 📉 Main Content Layout: Stacked on Mobile/Tablet, 2-Column Side-by-Side on Desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full items-start">

                {/* Left Side: Dynamic Analytics Chart */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-4 xs:p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between w-full box-border">
                    <div className="space-y-1">
                        <h2 className="text-base xs:text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <TrendingUp className="text-blue-500 shrink-0" size={18} sm={20} /> Platform Growth Engine
                        </h2>
                        <p className="text-[11px] xs:text-xs sm:text-sm text-slate-400 pb-4">Monthly calculated total billing processing across all transactions.</p>
                    </div>

                    {/* Chart Container - Adapts width and controls height based on screens */}
                    <div className="h-[220px] xs:h-[260px] sm:h-[300px] w-full box-border">
                        {chartData.length === 0 ? (
                            <div className="h-full flex items-center justify-center text-xs text-slate-400">No sales transactions available to map timeline.</div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#33415515" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} fontSize={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} fontSize={10} tickFormatter={(v) => `$${v}`} />
                                    <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '11px' }} />
                                    <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} dot={{ r: 3, fill: '#3b82f6' }} activeDot={{ r: 5 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>

                {/* Right Side: Live Ecosystem Activity Log */}
                <div className="bg-white dark:bg-slate-800 p-4 xs:p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col h-auto max-h-[420px] w-full box-border">
                    <div className="mb-3 sm:mb-4">
                        <h2 className="text-base xs:text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Live System Logs</h2>
                        <p className="text-[11px] xs:text-xs sm:text-sm text-slate-400 mt-0.5">Global audit logs triggered by users, owners, and webhooks.</p>
                    </div>

                    {/* Scrollable Container with Hidden Scrollbar CSS capability */}
                    <div className="flex-1 divide-y divide-slate-100 dark:divide-slate-700 overflow-y-auto space-y-3 sm:space-y-4 pt-1 pr-1 custom-scrollbar">
                        {recentActivities.map((activity, idx) => {
                            const cfg = getActivityIcon(activity.type);
                            const ActionIcon = cfg.icon;
                            return (
                                <div key={activity.id || idx} className="flex gap-3 pt-3 sm:pt-4 first:pt-0 items-start w-full">
                                    <div className={`p-2 rounded-xl shrink-0 ${cfg.style}`}>
                                        <ActionIcon size={14} sm={16} />
                                    </div>
                                    <div className="flex-1 min-w-0 space-y-0.5">
                                        <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-snug break-words">
                                            {activity.text}
                                        </p>
                                        <span className="text-[10px] sm:text-xs text-slate-400 block">{activity.time}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}