"use client";
import React, { useEffect, useState } from 'react';
import { User, MapPin, Check, X } from 'lucide-react';
import { getOwnerBookings } from '@/lib/api/booking';
import { authClient } from '@/lib/auth-client';



export default function BookingRequests() {
    const [bookings, setBookings] = useState([]);
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const userEmail = user?.email;

    useEffect(() => {
        const fetchBookings = async () => {
            const myBookings = await getOwnerBookings(userEmail)
            setBookings(myBookings)
        }
        fetchBookings()
    }, [userEmail])

    const handleAction = (id, actionType) => {
        setBookings(prev =>
            prev.map(b => b.id === id ? { ...b, status: actionType } : b)
        );
    };

    return (
        <div className="p-4 md:p-8">
            <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Booking Requests</h2>

            <div className="grid gap-4">
                {bookings?.map((booking) => (
                    <div key={booking._id} className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4 transition-all hover:shadow-lg">

                        {/* Tenant and Property Info */}
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-full text-slate-500">
                                <User />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-slate-900 dark:text-white">{booking.tenantName}</h4>
                                <p className="text-xs text-slate-400 mb-1">{booking.tenantEmail}</p>
                                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 italic">
                                    <MapPin size={14} /> {booking.propertyTitle}
                                </div>
                            </div>
                        </div>

                        {/* Price and Date */}
                        <div className="flex flex-col md:items-end w-full md:w-auto">
                            <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">{booking.rent}</span>
                            <span className="text-xs text-slate-400 uppercase tracking-widest">{booking.moveInDate}</span>
                        </div>

                        {/* Action Buttons / Status Badge */}
                        <div className="flex gap-2 w-full md:w-auto justify-end">
                            {booking.status === 'Pending' ? (
                                <>
                                    <button
                                        onClick={() => handleAction(booking._id, 'Approved')}
                                        className="flex-1 md:flex-none py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl flex items-center justify-center gap-2 font-bold transition-all shadow-md shadow-emerald-500/20"
                                    >
                                        <Check size={18} /> Approve
                                    </button>
                                    <button
                                        onClick={() => handleAction(booking._id, 'Rejected')}
                                        className="flex-1 md:flex-none py-3 px-6 bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/50 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all"
                                    >
                                        <X size={18} /> Reject
                                    </button>
                                </>
                            ) : (
                                <span className={`px-4 py-2 rounded-2xl text-sm font-bold ${booking.status === 'Approved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400'
                                    }`}>
                                    {booking.status}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
                {bookings.length === 0 && <p className="text-center py-20 text-slate-500">No new booking requests found.</p>}
            </div>
        </div>
    );
}