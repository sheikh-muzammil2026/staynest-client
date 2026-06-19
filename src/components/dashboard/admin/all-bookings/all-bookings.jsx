"use client";
import React, { useState } from 'react';
import { Calendar, Eye, ShieldCheck, ArrowRight } from 'lucide-react';

const initialBookings = [
    { id: 'BK-9901', tenant: 'Asif Ishtiaque', property: 'Blue Horizon Suite', owner: 'Al-Amin Rahman', checkIn: '24 Jun 2026', checkOut: '28 Jun 2026', status: 'Active' },
    { id: 'BK-9902', tenant: 'Nusrat Jahan', property: 'Sunset Luxury Villa', owner: 'Zayan Malik', checkIn: '10 Jul 2026', checkOut: '15 Jul 2026', status: 'Confirmed' },
    { id: 'BK-9903', tenant: 'Siam Chowdhury', property: 'Downtown Studio', owner: 'Karim Uddin', checkIn: '02 May 2026', checkOut: '05 May 2026', status: 'Completed' },
];

export default function AllBookings() {
    const [bookings] = useState(initialBookings);

    return (
        <div className="p-4 md:p-8 animate-in fade-in duration-500">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Calendar className="text-blue-500" /> Platform Bookings
                </h1>
                <p className="text-slate-500 dark:text-slate-400">Monitor live booking activity, reserve durations, and system host timelines.</p>
            </header>

            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-sm uppercase">
                            <tr>
                                <th className="p-5">Booking ID</th>
                                <th className="p-5">Tenant Info</th>
                                <th className="p-5">Property & Host</th>
                                <th className="p-5">Schedule</th>
                                <th className="p-5">System Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-slate-700 dark:text-slate-300">
                            {bookings.map((b) => (
                                <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/20 transition-all">
                                    <td className="p-5 font-mono text-sm font-bold text-blue-500">{b.id}</td>
                                    <td className="p-5 font-semibold text-slate-900 dark:text-white">{b.tenant}</td>
                                    <td className="p-5">
                                        <div>
                                            <h4 className="font-bold text-sm text-slate-900 dark:text-white">{b.property}</h4>
                                            <p className="text-xs text-slate-400">Host: {b.owner}</p>
                                        </div>
                                    </td>
                                    <td className="p-5 text-xs">
                                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium">
                                            <span>{b.checkIn}</span>
                                            <ArrowRight size={12} className="text-slate-400" />
                                            <span>{b.checkOut}</span>
                                        </div>
                                    </td>
                                    <td className="p-5">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${b.status === 'Active' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' :
                                                b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' :
                                                    'bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400'
                                            }`}>
                                            {b.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}