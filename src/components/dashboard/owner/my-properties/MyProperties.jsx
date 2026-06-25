"use client";
import React, { useEffect, useState } from 'react';
import { Edit, Trash2, CheckCircle, Clock, XCircle, Loader2, Eye, MessageSquare } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { getOwnerProperties } from '@/lib/api/properties';

export default function MyProperties() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);

    // Feedback Modal States
    const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
    const [selectedFeedback, setSelectedFeedback] = useState('');
    const [selectedPropertyTitle, setSelectedPropertyTitle] = useState('');

    // Destructured isPending to properly track session loading state
    const { data: session, isPending: isSessionLoading } = authClient.useSession();
    const user = session?.user;
    const userEmail = user?.email;

    useEffect(() => {
        // Prevent calling API if session is still pending or user is not available
        if (!userEmail || isSessionLoading) return;

        const fetchProperties = async () => {
            try {
                setLoading(true);
                const data = await getOwnerProperties(userEmail);

                // Safety check to ensure data is an array
                setProperties(Array.isArray(data) ? data : data ? [data] : []);
            } catch (error) {
                console.error("Error fetching properties:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, [userEmail, isSessionLoading]);

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this property?")) {
            setProperties(properties.filter(p => p.id !== id && p._id !== id));
        }
    };

    // Open Feedback Modal Function
    const handleOpenFeedback = (title, feedback) => {
        setSelectedPropertyTitle(title);
        setSelectedFeedback(feedback || "No specific feedback provided by the administrator.");
        setFeedbackModalOpen(true);
    };

    const showLoadingState = loading || isSessionLoading;

    return (
        <div className="p-4 md:p-8 relative">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">My Properties</h2>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-sm uppercase">
                            <tr>
                                <th className="p-5">Title</th>
                                <th className="p-5">Type</th>
                                <th className="p-5">Rent</th>
                                <th className="p-5">Status</th>
                                <th className="p-5 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-slate-700 dark:text-slate-300">
                            {showLoadingState ? (
                                <tr>
                                    <td colSpan="5" className="p-10 text-center">
                                        <div className="flex flex-col items-center justify-center gap-3 text-slate-500">
                                            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                                            <p className="text-sm font-medium animate-pulse">Loading properties...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : properties.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-10 text-center text-slate-400 text-sm">
                                        No properties found.
                                    </td>
                                </tr>
                            ) : (
                                properties.map((p) => (
                                    <tr key={p.id || p._id} className="hover:bg-slate-50 dark:hover:bg-slate-900/20 transition-all">
                                        <td className="p-5 font-semibold text-slate-900 dark:text-white">
                                            {p.propertyTitle}
                                        </td>
                                        <td className="p-5">{p.propertyType}</td>
                                        <td className="p-5 font-bold text-blue-600 dark:text-blue-400">
                                            BDT {p.rent}
                                            <span className="text-xs font-normal text-slate-400">/{p.rentType || 'Monthly'}</span>
                                        </td>
                                        <td className="p-5">
                                            <div className="flex items-center gap-2">
                                                <span className={`flex items-center gap-1.5 w-fit px-3 py-1 rounded-full text-xs font-bold ${p.status === 'Approved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' :
                                                        p.status === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400' :
                                                            'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400'
                                                    }`}>
                                                    {p.status === 'Approved' && <CheckCircle size={14} />}
                                                    {p.status === 'Pending' && <Clock size={14} />}
                                                    {p.status === 'Rejected' && <XCircle size={14} />}
                                                    {p.status || 'Pending'}
                                                </span>

                                                {/* 👁️ View Feedback Button for Rejected Status */}
                                                {p.status === 'Rejected' && (
                                                    <button
                                                        onClick={() => handleOpenFeedback(p.propertyTitle, p.feedback)}
                                                        title="View Rejection Reason"
                                                        className="p-1 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/20 rounded-lg transition-colors"
                                                    >
                                                        <Eye size={16} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-5 flex justify-center gap-2">
                                            <button className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/50 text-blue-500 rounded-lg transition-colors">
                                                <Edit size={18} />
                                            </button>
                                            <button onClick={() => handleDelete(p.id || p._id)} className="p-2 hover:bg-rose-50 dark:hover:bg-rose-900/50 text-rose-500 rounded-lg transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 💬 REJECTION FEEDBACK MODAL FOR OWNER */}
            {feedbackModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-6 max-w-md w-full border border-slate-200 dark:border-slate-700 shadow-2xl space-y-4">
                        <div className="flex items-center gap-2 text-rose-500 font-bold text-lg">
                            <MessageSquare /> Rejection Reason
                        </div>
                        <div>
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Property</span>
                            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5">{selectedPropertyTitle}</h4>
                        </div>
                        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-500/5 border border-rose-100 dark:border-rose-500/10">
                            <p className="text-sm text-rose-700 dark:text-rose-400 italic whitespace-pre-wrap">
                                "{selectedFeedback}"
                            </p>
                        </div>
                        <p className="text-xs text-slate-400">
                            Please update the property details or documents according to the feedback above and update your submission.
                        </p>
                        <div className="flex justify-end pt-2">
                            <button
                                onClick={() => setFeedbackModalOpen(false)}
                                className="py-2.5 px-6 bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 rounded-xl text-sm font-bold transition-all shadow-md"
                            >
                                Got it
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}