"use client";
import React, { useEffect, useState } from 'react';
import { DollarSign, Home, Calendar, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { authClient } from '@/lib/auth-client';

// গত ১২ মাসের একটি ব্ল্যাঙ্ক ম্যাপ তৈরি করার ফাংশন (যাতে চার্ট ব্রেক না করে)
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

    if (isSessionLoading || loading) {
        return <div className="p-8 text-center text-slate-500">Loading Analytics...</div>;
    }

    if (!user) {
        return <div className="p-8 text-center text-red-500">Please log in to view the dashboard.</div>;
    }

    const { totalEarnings, totalProperties, totalBookings } = analytics?.summary || { totalEarnings: 0, totalProperties: 0, totalBookings: 0 };

    // চার্ট ডেটা মার্জিং: খালি মাসগুলোতে ০ বসানো
    const placeholderData = generateLast12MonthsPlaceholder();
    const apiChartData = analytics?.chartData || [];

    const chartData = placeholderData.map(placeholder => {
        const realData = apiChartData.find(d => d.name === placeholder.name);
        return realData ? { ...placeholder, earnings: realData.earnings } : placeholder;
    });

    return (
        <div className="space-y-6 p-4 md:p-8 animate-in fade-in duration-500">
            <header>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">StayNest Analytics</h1>
                <p className="text-slate-500 dark:text-slate-400">Monitor your property performance and real-time earnings.</p>
            </header>

            {/* Summary Cards */}
            <div className="grid gap-6 md:grid-cols-3">
                {[
                    { title: "Total Earnings", val: `$${totalEarnings.toLocaleString()}`, icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500/10" },
                    { title: "Total Properties", val: totalProperties.toString(), icon: Home, color: "text-blue-500", bg: "bg-blue-500/10" },
                    { title: "Total Bookings", val: totalBookings.toString(), icon: Calendar, color: "text-violet-500", bg: "bg-violet-500/10" },
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
                        <LineChart data={chartData}>
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