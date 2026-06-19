"use client";
import React, { useState } from 'react';
import { Home, CheckCircle, XCircle, Clock, MessageSquare, Trash2, AlertTriangle } from 'lucide-react';

const initialProperties = [
    { id: 1, title: 'Grand Executive Suite', owner: 'Al-Amin Rahman', location: 'Dhaka', rent: '$1500', status: 'Pending', feedback: '' },
    { id: 2, title: 'Oceanic Horizon Villa', owner: 'Zayan Malik', location: 'Cox\'s Bazar', rent: '$4000', status: 'Approved', feedback: '' },
    { id: 3, title: 'Cosy Studio Apartment', owner: 'Karim Uddin', location: 'Sylhet', rent: '$600', status: 'Rejected', feedback: 'Missing property tax documents.' },
];

export default function AllProperties() {
    const [properties, setProperties] = useState(initialProperties);
    const [modalOpen, setModalOpen] = useState(false);
    const [activePropertyId, setActivePropertyId] = useState(null);
    const [feedbackText, setFeedbackText] = useState('');

    const updateStatus = (id, newStatus, feedback = '') => {
        setProperties(properties.map(p => p.id === id ? { ...p, status: newStatus, feedback } : p));
    };

    const handleOpenRejectModal = (id) => {
        setActivePropertyId(id);
        setFeedbackText('');
        setModalOpen(true);
    };

    const submitRejection = () => {
        if (!feedbackText.trim()) return alert("Please provide a reason for rejection.");
        updateStatus(activePropertyId, 'Rejected', feedbackText);
        setModalOpen(false);
        alert("Property rejected. Feedback saved for Owner notification.");
    };

    const handleDelete = (id) => {
        if (confirm("Delete this property listing permanently?")) {
            setProperties(properties.filter(p => p.id !== id));
        }
    };

    return (
        <div className="p-4 md:p-8 animate-in fade-in duration-500 relative">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Home className="text-blue-500" /> System Properties
                </h1>
                <p className="text-slate-500 dark:text-slate-400">Review, approve, or reject host property listings across the platform.</p>
            </header>

            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-sm uppercase">
                            <tr>
                                <th className="p-5">Property</th>
                                <th className="p-5">Owner</th>
                                <th className="p-5">Rent</th>
                                <th className="p-5">Status / Notes</th>
                                <th className="p-5 text-center">Verification Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-slate-700 dark:text-slate-300">
                            {properties.map((p) => (
                                <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/20 transition-all">
                                    <td className="p-5">
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white">{p.title}</h4>
                                            <p className="text-xs text-slate-400">{p.location}</p>
                                        </div>
                                    </td>
                                    <td className="p-5 text-sm font-semibold">{p.owner}</td>
                                    <td className="p-5 font-black text-blue-500">{p.rent}</td>
                                    <td className="p-5">
                                        <div className="space-y-1">
                                            <span className={`flex items-center gap-1.5 w-fit px-3 py-1 rounded-full text-xs font-bold ${p.status === 'Approved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' :
                                                    p.status === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400' :
                                                        'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400'
                                                }`}>
                                                {p.status === 'Approved' && <CheckCircle size={14} />}
                                                {p.status === 'Pending' && <Clock size={14} />}
                                                {p.status === 'Rejected' && <XCircle size={14} />}
                                                {p.status}
                                            </span>
                                            {p.feedback && (
                                                <p className="text-xs text-rose-500 dark:text-rose-400 flex items-center gap-1 max-w-xs italic">
                                                    <MessageSquare size={12} /> {p.feedback}
                                                </p>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-5 flex justify-center gap-2">
                                        {p.status !== 'Approved' && (
                                            <button onClick={() => updateStatus(p.id, 'Approved')} className="p-2 text-emerald-500 bg-emerald-500/10 rounded-xl hover:bg-emerald-500 hover:text-white transition-all">
                                                <CheckCircle size={18} />
                                            </button>
                                        )}
                                        {p.status !== 'Rejected' && (
                                            <button onClick={() => handleOpenRejectModal(p.id)} className="p-2 text-rose-500 bg-rose-500/10 rounded-xl hover:bg-rose-500 hover:text-white transition-all">
                                                <XCircle size={18} />
                                            </button>
                                        )}
                                        <button onClick={() => handleDelete(p.id)} className="p-2 text-slate-400 hover:text-rose-500 rounded-xl transition-colors">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 🛑 REJECTION FEEDBACK MODAL */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-6 max-w-md w-full border border-slate-200 dark:border-slate-700 shadow-2xl space-y-4">
                        <div className="flex items-center gap-2 text-rose-500 font-bold text-lg">
                            <AlertTriangle /> Rejection Feedback
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            State the exact reason for rejecting this listing. The owner will view this feedback to fix their upload issues.
                        </p>
                        <textarea
                            rows="4"
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                            className="w-full p-4 rounded-2xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none focus:ring-2 ring-rose-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 text-sm"
                            placeholder="e.g. Please upload clear indoor photos and proper ownership documents."
                            required
                        ></textarea>
                        <div className="flex gap-2 justify-end">
                            <button onClick={() => setModalOpen(false)} className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-xl text-sm font-semibold transition-all">
                                Cancel
                            </button>
                            <button onClick={submitRejection} className="py-2.5 px-5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-bold transition-all shadow-md shadow-rose-500/20">
                                Confirm Rejection
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}