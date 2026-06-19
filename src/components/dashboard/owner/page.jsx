"use client";
import React from 'react';
import { DollarSign, Home, Calendar, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Jan', earnings: 4000 }, { name: 'Feb', earnings: 3000 },
    { name: 'Mar', earnings: 5000 }, { name: 'Apr', earnings: 4500 },
    { name: 'May', earnings: 6000 }, { name: 'Jun', earnings: 5500 },
    { name: 'Jul', earnings: 7000 }, { name: 'Aug', earnings: 8500 },
    { name: 'Sep', earnings: 8000 }, { name: 'Oct', earnings: 9500 },
    { name: 'Nov', earnings: 11000 }, { name: 'Dec', earnings: 13000 },
];

export default function OwnerDashboard() {
    return (
        <div className="space-y-6 p-4 md:p-8 animate-in fade-in duration-500">
            <header>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">StayNest Analytics</h1>
                <p className="text-slate-500 dark:text-slate-400">Monitor your property performance and real-time earnings.</p>
            </header>

            {/* Summary Cards */}
            <div className="grid gap-6 md:grid-cols-3">
                {[
                    { title: "Total Earnings", val: "$34,500", icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500/10" },
                    { title: "Total Properties", val: "12", icon: Home, color: "text-blue-500", bg: "bg-blue-500/10" },
                    { title: "Total Bookings", val: "48", icon: Calendar, color: "text-violet-500", bg: "bg-violet-500/10" },
                ].map((card, i) => {
                    const Icon = card.icon;
                    return (
                        <div key={i} className="p-6 bg-white dark:bg-slate-800/50 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-slate-700 flex items-center justify-between shadow-sm">
                            <div>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{card.title}</p>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{card.val}</h3>
                            </div>
                            <div className={`p-4 ${card.bg} ${card.color} rounded-2xl`}>
                                <Icon size={24} />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Monthly Earnings Chart */}
            <div className="p-6 bg-white dark:bg-slate-800/50 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <TrendingUp className="text-emerald-500" /> Monthly Earnings
                </h2>
                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#33415520" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} fontSize={12} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} fontSize={12} tickFormatter={(v) => `$${v}`} />
                            <Tooltip
                                contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                            />
                            <Line type="monotone" dataKey="earnings" stroke="#10b981" strokeWidth={4} dot={{ r: 6, fill: '#10b981' }} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}