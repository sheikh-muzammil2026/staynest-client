"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getTenantBookings } from "@/lib/api/booking";
import { authClient } from "@/lib/auth-client";

export default function MyBookings() {
 
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Destructured 'isPending' to track auth session loading state
  const { data: session, isPending: isSessionLoading } = authClient.useSession();
  const user = session?.user;
  const userEmail = user?.email;

  // Combined loading state for auth session and API fetch
  const isPageLoading = loading || isSessionLoading;

  useEffect(() => {
    const fetchMyBookings = async () => {
      if (!userEmail) return;
      
      setLoading(true);
      try {
        const bookings = await getTenantBookings(userEmail);
        setMyBookings(bookings || []);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBookings();
  }, [userEmail]); // Safely track only the email string variable

  return (
    <div className="space-y-6 p-4 md:p-0">
      {/* Header section */}
      <div>
        <h3 className="text-xl md:text-2xl font-black tracking-tight text-slate-950 dark:text-white">
          My Bookings
        </h3>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Track all your currently active rental agreements and paid bills.
        </p>
      </div>

      {/* Loading state indicator */}
      {isPageLoading && (
        <div className="flex justify-center items-center py-8">
          <p className="text-sm font-medium text-slate-500 animate-pulse">Loading bookings...</p>
        </div>
      )}

      {/* Empty state handler - only shows when loading is fully complete */}
      {!isPageLoading && myBookings.length === 0 && (
        <div className="text-center py-12 border border-dashed rounded-3xl border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-500">No bookings found.</p>
        </div>
      )}

      {/* Responsive layout containing card view and table view */}
      {!isPageLoading && myBookings.length > 0 && (
        <>
          {/* Mobile & Tablet layout: Card view visible below md breakpoint */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {myBookings.map((item, idx) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-[#131B2E]/40 backdrop-blur-md shadow-sm space-y-3"
              >
                <div className="flex justify-between items-start gap-2">
                  <h4 className="font-bold text-slate-950 dark:text-white text-base truncate max-w-[70%]">
                    {item.propertyTitle}
                  </h4>
                  <span className="text-indigo-600 dark:text-indigo-400 font-black text-base">
                    {item.rent}
                  </span>
                </div>
                
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold">Date:</span> {item.bookedAt}
                </div>

                <div className="flex gap-2 pt-1">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                    item.status === "Approved"
                      ? "bg-emerald-500/10 text-emerald-500"
                      : "bg-amber-500/10 text-amber-500"
                  }`}>
                    {item.status}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-500">
                    {item.paymentStatus}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop layout: Table view visible at and above md breakpoint */}
          <div className="hidden md:block overflow-x-auto rounded-3xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-[#131B2E]/40 backdrop-blur-md shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
                  <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Property Name</th>
                  <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Booking Date</th>
                  <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Amount Paid</th>
                  <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Booking Status</th>
                  <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Payment Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-sm font-medium">
                {myBookings.map((item, idx) => (
                  <motion.tr
                    key={item._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition"
                  >
                    <td className="p-4 text-slate-950 dark:text-white font-bold max-w-xs truncate">
                      {item.propertyTitle}
                    </td>
                    <td className="p-4 text-slate-500 dark:text-slate-400">{item.bookedAt}</td>
                    <td className="p-4 text-indigo-600 dark:text-indigo-400 font-black">{item.rent}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                        item.status === "Approved"
                          ? "bg-emerald-500/10 text-emerald-500"
                          : "bg-amber-500/10 text-amber-500"
                      }`}>
                        {item?.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-500">
                        {item.paymentStatus}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
