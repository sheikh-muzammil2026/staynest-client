"use client";

import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Receipt, Loader2, CheckCircle2, XCircle, AlertCircle, Copy, Check } from 'lucide-react';
import { getTransactions } from '@/lib/api/transactions';

// Reusable Copy Button Component
const CopyButton = ({ text }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy!", err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className="text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700/50"
            title="Copy Full ID"
        >
            {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
        </button>
    );
};

export default function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch transactions on component mount
    useEffect(() => {
        const fetchAllTransactions = async () => {
            try {
                setLoading(true);
                const data = await getTransactions();
                setTransactions(data || []);
            } catch (error) {
                console.error("Failed to fetch transactions:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllTransactions();
    }, []);

    // Helper to shrink long MongoDB ObjectIDs / Stripe Hashes
    const shrinkId = (id) => {
        if (!id) return "N/A";
        if (id.length <= 12) return id;
        return `${id.slice(0, 6)}...${id.slice(-4)}`;
    };

    // Format cents from Stripe to standard currency layout
    const formatAmount = (amount, currency) => {
        if (!amount) return "$0.00";
        const formattedAmount = amount / 100;
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: (currency || 'usd').toUpperCase(),
        }).format(formattedAmount);
    };

    // Robust Date Normalizer for Standard & MongoDB Date Objects
    const formatDate = (dateInput) => {
        if (!dateInput) return "N/A";
        const targetDate = typeof dateInput === 'object' && dateInput.$date ? dateInput.$date : dateInput;

        try {
            return new Date(targetDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (e) {
            return "N/A";
        }
    };

    return (
        <div className="p-4 md:p-8 animate-in fade-in duration-500 min-h-screen max-w-7xl mx-auto w-full">
            
            {/* Header Section */}
            <header className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Receipt className="text-indigo-500 w-6 h-6 md:w-7 md:h-7" /> Financial Transactions
                    </h1>
                    <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Complete historical financial ledger of platform rentals and processing fees.
                    </p>
                </div>
                <div className="text-xs md:text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl shadow-sm text-slate-600 dark:text-slate-300 self-start sm:self-auto font-medium">
                    Total: <span className="font-bold text-indigo-500">{transactions.length}</span> Txns
                </div>
            </header>

            {/* Main Responsive Table Wrapper */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm w-full">
                <div className="overflow-x-auto min-w-full inline-block align-middle">
                    <table className="w-full text-left border-collapse table-auto whitespace-nowrap">
                        <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-700">
                            <tr>
                                <th className="p-4 md:p-5">Transaction ID</th>
                                <th className="p-4 md:p-5">Booking / Session</th>
                                <th className="p-4 md:p-5">Customer Email</th>
                                <th className="p-4 md:p-5">Date</th>
                                <th className="p-4 md:p-5">Status</th>
                                <th className="p-4 md:p-5 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-slate-700 dark:text-slate-300 text-sm">

                            {loading && (
                                <tr>
                                    <td colSpan={6} className="p-12 text-center">
                                        <div className="flex flex-col items-center justify-center gap-3">
                                            <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                                            <p className="text-sm font-medium text-slate-400">Loading transaction ledger...</p>
                                        </div>
                                    </td>
                                </tr>
                            )}

                            {!loading && transactions.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="p-12 text-center font-medium text-slate-400 dark:text-slate-500">
                                        No transactions found.
                                    </td>
                                </tr>
                            )}

                            {!loading && transactions.map((t) => {
                                const transactionId = typeof t._id === 'object' && t._id?.$oid ? t._id.$oid : t._id;
                                const status = t.paymentStatus?.toLowerCase();

                                return (
                                    <tr key={transactionId} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/20 transition-colors group">

                                        {/* Transaction ID */}
                                        <td className="p-4 md:p-5">
                                            <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-900 dark:text-white">
                                                <span className="p-1.5 bg-indigo-500/10 text-indigo-500 rounded-lg group-hover:scale-105 transition-transform flex-shrink-0">
                                                    <ArrowUpRight size={14} />
                                                </span>
                                                <span title={transactionId}>
                                                    {shrinkId(transactionId)}
                                                </span>
                                                {transactionId && <CopyButton text={transactionId} />}
                                            </div>
                                        </td>

                                        {/* Booking & Session Info */}
                                        <td className="p-4 md:p-5">
                                            <div className="flex flex-col gap-1 max-w-[180px]">
                                                <div className="flex items-center gap-1">
                                                    <span className="font-semibold text-slate-700 dark:text-slate-300 text-[11px] font-mono bg-slate-100 dark:bg-slate-700/60 px-1.5 py-0.5 rounded truncate">
                                                        B: {shrinkId(t.bookingId)}
                                                    </span>
                                                    {t.bookingId && <CopyButton text={t.bookingId} />}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono truncate">
                                                        S: {shrinkId(t.stripeSessionId)}
                                                    </span>
                                                    {t.stripeSessionId && <CopyButton text={t.stripeSessionId} />}
                                                </div>
                                            </div>
                                        </td>

                                        {/* Customer Email */}
                                        <td className="p-4 md:p-5 font-medium text-slate-600 dark:text-slate-300 max-w-[200px] truncate">
                                            {t.customerEmail}
                                        </td>

                                        {/* Date */}
                                        <td className="p-4 md:p-5 text-xs text-slate-500 dark:text-slate-400">
                                            {formatDate(t.createdAt)}
                                        </td>

                                        {/* Dynamic Status Badges */}
                                        <td className="p-4 md:p-5">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                                                status === 'success' || status === 'paid'
                                                    ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20'
                                                    : status === 'failed' || status === 'unpaid'
                                                    ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/20'
                                                    : 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/20'
                                                }`}>
                                                {status === 'success' || status === 'paid' ? (
                                                    <CheckCircle2 size={12} />
                                                ) : status === 'failed' || status === 'unpaid' ? (
                                                    <XCircle size={12} />
                                                ) : (
                                                    <AlertCircle size={12} />
                                                )}
                                                <span className="capitalize">{t.paymentStatus || 'Pending'}</span>
                                            </span>
                                        </td>

                                        {/* Financial Amount */}
                                        <td className="p-4 md:p-5 text-right font-bold text-slate-900 dark:text-white text-base">
                                            {formatAmount(t.amount, t.currency)}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
