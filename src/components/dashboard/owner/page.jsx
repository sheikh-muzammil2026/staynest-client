"use client";
import React, { useEffect, useState } from 'react';
import { DollarSign, Home, Calendar, TrendingUp, Loader2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { authClient } from '@/lib/auth-client';

// গত ১২ মাসের একটি ব্ল্যাঙ্ক ম্যাপ তৈরি করার ফাংশন
const generateLast12MonthsPlaceholder = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const result = [];
    const d = new Date();

    for (let i = 11; i >= 0; i--) {
        const m = new Date(d.getFullYear(), d.getMonth() - i, 1);
        result.push({
            name: months[m.getMonth()],
            earnings: 0
        });
    }
    return result;
};

export default function OwnerDashboard() {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    const { data: session, isPending: isSessionLoading } = authClient.useSession();
    const user = session?.user;
    const ownerEmail = user?.email;

    useEffect(() => {
        if (!ownerEmail) return;

        const fetchAnalytics = async () => {
            try {
                setLoading(true);
                const tokenResponse = await authClient.token();
                const token = tokenResponse?.data?.token;

                if (!token) {
                    console.error("Token not found");
                    setLoading(false);
                    return;
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/owner/analytics?email=${ownerEmail}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch analytics data");
                }

                const data = await response.json();
                setAnalytics(data);
            } catch (err) {
                console.error("Error loading analytics:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, [ownerEmail]);

    // ফুল-স্ক্রিন রেসপন্সিভ লোডিং স্টেট
    if (isSessionLoading || loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-slate-500 p-4">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <p className="text-sm font-medium animate-pulse">Loading Analytics...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-[60vh] p-4">
                <div className="bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 p-6 rounded-2xl text-center max-w-sm w-full font-medium shadow-sm">
                    Please log in to view the dashboard.
                </div>
            </div>
        );
    }

    const { totalEarnings, totalProperties, totalBookings } = analytics?.summary || { totalEarnings: 0, totalProperties: 0, totalBookings: 0 };

    const placeholderData = generateLast12MonthsPlaceholder();
    const apiChartData = analytics?.chartData || [];

    const chartData = placeholderData.map(placeholder => {
        const realData = apiChartData.find(d => d.name === placeholder.name);
        return realData ? { ...placeholder, earnings: realData.earnings } : placeholder;
    });

    return (
        <div className="space-y-6 p-4 sm:p-6 md:p-8 animate-in fade-in duration-500 max-w-[1600px] mx-auto w-full">
            {/* Header Area */}
            <header className="space-y-1 text-left">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    StayNest Analytics
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    Monitor your property performance and real-time earnings.
                </p>
            </header>

            {/* Summary Cards Grid (Mobile: 1 Column, Tab: 2 Columns, Laptop/Desktop: 3 Columns) */}
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {[
                    { title: "Total Earnings", val: `$${totalEarnings.toLocaleString()}`, icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500/10" },
                    { title: "Total Properties", val: totalProperties.toString(), icon: Home, color: "text-blue-500", bg: "bg-blue-500/10" },
                    { title: "Total Bookings", val: totalBookings.toString(), icon: Calendar, color: "text-violet-500", bg: "bg-violet-500/10" },
                ].map((card, i) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={i}
                            className={`p-5 sm:p-6 bg-white dark:bg-slate-800/50 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-700 flex items-center justify-between shadow-sm transition-all hover:shadow-md ${i === 2 ? "sm:col-span-2 lg:col-span-1" : "" // ট্যাবে ৩ নম্বর কার্ডটি দেখতে সুন্দর লাগার জন্য ফুল-উইডথ করা হয়েছে
                                }`}
                        >
                            <div className="space-y-0.5">
                                <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{card.title}</p>
                                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{card.val}</h3>
                            </div>
                            <div className={`p-3 sm:p-4 ${card.bg} ${card.color} rounded-xl sm:rounded-2xl shrink-0`}>
                                <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Monthly Earnings Chart Card */}
            <div className="p-4 sm:p-6 bg-white dark:bg-slate-800/50 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
                    <TrendingUp className="text-emerald-500 h-5 w-5 sm:h-6 sm:w-6" /> Monthly Earnings
                </h2>

                {/* Chart container adjusts height based on screen size */}
                <div className="h-[250px] sm:h-[300px] md:h-[350px] w-full pr-2 sm:pr-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#33415515" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94a3b8' }}
                                fontSize={11}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94a3b8' }}
                                fontSize={11}
                                tickFormatter={(v) => `$${v}`}
                            />
                            <Tooltip
                                contentStyle={{
                                    background: '#1e293b',
                                    border: 'none',
                                    borderRadius: '12px',
                                    color: '#fff',
                                    fontSize: '12px'
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="earnings"
                                stroke="#10b981"
                                strokeWidth={window?.innerWidth < 640 ? 3 : 4} // মোবাইলে লাইনটি সামান্য চিকন দেখাবে
                                dot={{ r: 4, fill: '#10b981' }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}