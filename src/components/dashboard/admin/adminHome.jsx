"use client";
import React from 'react';
import {
    DollarSign,
    Users,
    Home,
    Calendar,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    CheckCircle,
    AlertCircle
} from 'lucide-react';

export default function AdminHome() {
    // ডামি স্ট্যাটিস্টিকস ডাটা
    const stats = [
        { title: 'Total Revenue', value: '$24,500', icon: DollarSign, color: 'bg-emerald-500', change: '+12.5%', isPositive: true },
        { title: 'Total Users', value: '1,248', icon: Users, color: 'bg-blue-500', change: '+8.2%', isPositive: true },
        { title: 'Active Properties', value: '312', icon: Home, color: 'bg-violet-500', change: '+4.1%', isPositive: true },
        { title: 'Total Bookings', value: '845', icon: Calendar, color: 'bg-amber-500', change: '-2.3%', isPositive: false },
    ];

    // সাম্প্রতিক অ্যাক্টিভিটি ডাটা
    const recentActivities = [
        { id: 1, type: 'property', text: 'New property "Grand Executive Suite" submitted for approval', time: '5 mins ago', icon: Clock, iconColor: 'text-amber-500 bg-amber-500/10' },
        { id: 2, type: 'user', text: 'Tahmid Ahmed registered as a new Property Owner', time: '12 mins ago', icon: CheckCircle, iconColor: 'text-emerald-500 bg-emerald-500/10' },
        { id: 3, type: 'booking', text: 'Booking BK-9901 confirmed by Host Al-Amin', time: '1 hour ago', icon: CheckCircle, iconColor: 'text-blue-500 bg-blue-500/10' },
        { id: 4, type: 'dispute', text: 'Payout failed for Transaction TXN-77310295', time: '2 hours ago', icon: AlertCircle, iconColor: 'text-rose-500 bg-rose-500/10' },
    ];

    return (
        <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-500">
            {/* 🌟 হেডার সেকশন */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Welcome back, Admin 👋
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Here's what is happening across your rental platform today.
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-300 shadow-sm w-fit">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    Live Platform Analytics
                </div>
            </header>

            {/* 📊 স্ট্যাটস গ্রিড কার্ডস */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={idx}
                            className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group"
                        >
                            <div className="flex justify-between items-start">
                                <div className={`p-3 rounded-2xl text-white ${stat.color} shadow-lg shadow-current/10 group-hover:scale-110 transition-transform`}>
                                    <Icon size={24} />
                                </div>
                                <span className={`flex items-center text-xs font-bold px-2 py-1 rounded-lg ${stat.isPositive
                                        ? 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10'
                                        : 'text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-500/10'
                                    }`}>
                                    {stat.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                    {stat.change}
                                </span>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-sm font-medium text-slate-400 dark:text-slate-500">{stat.title}</h3>
                                <p className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mt-1 tracking-tight">
                                    {stat.value}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 📉 চার্ট এরিয়া এবং সাম্প্রতিক অ্যাক্টিভিটি */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* লেফট সাইড: গ্রাফ/চার্ট প্লেসহোল্ডার */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between min-h-[350px]">
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <TrendingUp className="text-blue-500" size={20} /> Revenue Analytics
                            </h2>
                            <select className="p-2 text-xs font-semibold rounded-xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 outline-none">
                                <option>Last 7 Days</option>
                                <option>Last 30 Days</option>
                                <option>This Year</option>
                            </select>
                        </div>
                        <p className="text-sm text-slate-400 mb-6">Visual display of earnings and platform processing distributions.</p>
                    </div>

                    {/* চার্ট এরিয়া (এখানে আপনার Recharts বা Chart.js ম্যাপ করতে পারবেন) */}
                    <div className="flex-1 w-full bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center p-8 text-center text-slate-400">
                        <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mb-2">
                            <TrendingUp size={24} />
                        </div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Chart Visualization Ready</p>
                        <p className="text-xs max-w-xs mt-1">Integrate your preferred charting library here (e.g., recharts) to display monthly revenue pipelines.</p>
                    </div>
                </div>

                {/* রাইট সাইড: সিস্টেম লগ বা রিসেন্ট অ্যাক্টিভিটি */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col">
                    <div className="mb-4">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Activities</h2>
                        <p className="text-sm text-slate-400 mt-0.5">Real-time update of actions taken across the ecosystem.</p>
                    </div>

                    <div className="flex-1 divide-y divide-slate-100 dark:divide-slate-700 overflow-y-auto space-y-4 pt-2">
                        {recentActivities.map((activity) => {
                            const ActionIcon = activity.icon;
                            return (
                                <div key={activity.id} className="flex gap-4 pt-4 first:pt-0 items-start">
                                    <div className={`p-2.5 rounded-xl shrink-0 ${activity.iconColor}`}>
                                        <ActionIcon size={16} />
                                    </div>
                                    <div className="flex-1 space-y-0.5">
                                        <p className="text-sm text-slate-800 dark:text-slate-200 font-medium leading-snug">
                                            {activity.text}
                                        </p>
                                        <span className="text-xs text-slate-400 block">{activity.time}</span>
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