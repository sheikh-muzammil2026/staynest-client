"use client";
import { submitBookings } from "@/lib/api/booking";
import React, { useState } from "react";

export default function BookingModal({ property, currentUser, onClose }) {
    const [formData, setFormData] = useState({
        moveInDate: "",
        contactNumber: "",
        notes: ""
    });
    const [isProcessing, setIsProcessing] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        const bookingPayload = {
            propertyId: property._id,
            propertyTitle: property.propertyTitle,
            ownerEmail: property.ownerInformation.email,
            rent: property.rent,
            tenantName: currentUser.name,
            tenantEmail: currentUser.email,
            ...formData,
            status: "Pending",
            bookedAt: new Date()
        };

        try {


            const result = await submitBookings(bookingPayload);

            const stripeRes = await fetch('/api/checkout_sessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bookingId: result?.insertedId,
                    rent: property.rent,
                    propertyTitle: property.propertyTitle
                })
            });

            const stripeData = await stripeRes.json();

            if (stripeRes.ok && stripeData.url) {

                window.location.assign(stripeData.url);

            } else {
                throw new Error(stripeData.error || "Failed to get checkout URL");
            }

        } catch (error) {
            console.error("Booking failed:", error);
            alert(error.message || "Something went wrong!");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-black">Confirm Property Booking</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white text-xl">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* User Info (Read Only) */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">User Information</label>
                        <input type="text" readOnly value={`${currentUser.name} (${currentUser.email})`} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#090D16]/50 text-xs text-slate-500 border border-slate-200/60 dark:border-slate-800/70 focus:outline-none" />
                    </div>

                    {/* Move-in Date */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Move-in Date</label>
                        <input required type="date" value={formData.moveInDate} onChange={(e) => setFormData({ ...formData, moveInDate: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-sm border-none focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
                    </div>

                    {/* Contact Number */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Contact Number</label>
                        <input required type="tel" placeholder="e.g. +88017XXXXXXXX" value={formData.contactNumber} onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-sm border-none focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
                    </div>

                    {/* Additional Notes */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Additional Notes</label>
                        <textarea rows="3" placeholder="Any special requests or details..." value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-sm border-none focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none" />
                    </div>

                    {/* Summary & Submit */}
                    <div className="bg-indigo-50/50 dark:bg-indigo-950/20 p-4 rounded-2xl border border-indigo-100/30 text-center">
                        <p className="text-xs text-slate-400 font-medium">Total Payable Amount</p>
                        <p className="text-xl font-black text-indigo-600 dark:text-indigo-400">${property.rent}</p>
                    </div>

                    <button type="submit" disabled={isProcessing} className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition disabled:opacity-50">
                        {isProcessing ? "Processing..." : "Go to Payment (Stripe)"}
                    </button>
                </form>
            </div>
        </div>
    );
}