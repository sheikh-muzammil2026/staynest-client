"use client";

import React, { useEffect, useState } from 'react';
import { User, MapPin, Check, X, Loader2 } from 'lucide-react';
import { getOwnerBookings } from '@/lib/api/booking';
import { authClient } from '@/lib/auth-client';

export default function BookingRequests() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    // Track authentication session state cleanly
    const { data: session, isPending: isSessionLoading } = authClient.useSession();
    const user = session?.user;
    const userEmail = user?.email;

    const isPageLoading = loading || isSessionLoading;

    // Fetch booking requests for the logged-in owner
    useEffect(() => {
        if (!userEmail || isSessionLoading) return;

        const fetchBookings = async () => {
            try {
                setLoading(true);
                const myBookings = await getOwnerBookings(userEmail);
                setBookings(myBookings || []);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [userEmail, isSessionLoading]);

    // Handle local state updates for Approve/Reject requests
    const handleAction = (id, actionType) => {
        setBookings(prev =>
            prev.map(b => b._id === id ? { ...b, status: actionType } : b)
        );
    };

    return (
        <div className="p-4 md:p-8">
            {/* Header section */}
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-slate-900 dark:text-white">Booking Requests</h2>

            {/* Loading State UI */}
            {isPageLoading && (
                <div className="flex flex-col items-center justify-center p-16 text-slate-500 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
                    <p className="text-sm font-medium animate-pulse mt-3">Loading booking requests...</p>
                </div>
            )}

            {/* Empty State UI */}
            {!isPageLoading && bookings.length === 0 && (
                <div className="text-center p-16 text-slate-400 text-sm bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    No new booking requests found.
                </div>
            )}

            {/* Booking Requests List */}
            {!isPageLoading && bookings.length > 0 && (
                <div className="grid gap-4">
                    {bookings.map((booking) => (
                        <div 
                            key={booking._id} 
                            className="p-5 md:p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all hover:shadow-sm"
                        >
                            {/* Tenant and Property Information */}
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-full text-slate-500 shrink-0">
                                    <User size={18} />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h4 className="font-bold text-base text-slate-900 dark:text-white truncate">
                                        {booking.tenantName}
                                    </h4>
                                    <p className="text-xs text-slate-400 mb-1 truncate">{booking.tenantEmail}</p>
                                    <div className="flex items-center gap-2 text-xs md:text-sm text-slate-500 dark:text-slate-400 italic truncate">
                                        <MapPin size={13} className="shrink-0" /> {booking.propertyTitle}
                                    </div>
                                </div>
                            </div>

                            {/* Price and Date info */}
                            <div className="flex flex-row md:flex-col justify-between items-center md:items-end w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-700/50">
                                <span className="text-base md:text-xl font-black text-emerald-600 dark:text-emerald-400">
                                    {booking.rent}
                                </span>
                                <span className="text-[10px] md:text-xs text-slate-400 uppercase tracking-widest block mt-0.5">
                                    {booking.moveInDate}
                                </span>
                            </div>

                            {/* Clean & Balanced Action Buttons / Status Badges */}
                            <div className="flex gap-2 w-full md:w-auto pt-1 md:pt-0">
                                {booking.status === 'Pending' ? (
                                    <>
                                        <button
                                            onClick={() => handleAction(booking._id, 'Approved')}
                                            className="flex-1 md:flex-none py-2 px-3.5 md:py-2 md:px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl flex items-center justify-center gap-1.5 text-xs md:text-sm font-bold transition-all shadow-sm shadow-emerald-500/10"
                                        >
                                            <Check size={14} className="md:w-4 md:h-4" /> Approve
                                        </button>
                                        <button
                                            onClick={() => handleAction(booking._id, 'Rejected')}
                                            className="flex-1 md:flex-none py-2 px-3.5 md:py-2 md:px-4 bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/50 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-xl flex items-center justify-center gap-1.5 text-xs md:text-sm font-bold transition-all"
                                        >
                                            <X size={14} className="md:w-4 md:h-4" /> Reject
                                        </button>
                                    </>
                                ) : (
                                    <span className={`w-full md:w-auto text-center py-2 px-4 rounded-xl text-xs font-bold ${
                                        booking.status === 'Approved' 
                                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' 
                                            : 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400'
                                    }`}>
                                        {booking.status}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
