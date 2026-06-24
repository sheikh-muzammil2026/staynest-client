"use client";
import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Receipt, Loader2, CheckCircle2, HelpCircle, Copy, Check } from 'lucide-react';
import { getTransactions } from '@/lib/api/transactions';

// কপি বাটন কম্পোনেন্ট (সহজে আইডি কপি করার জন্য)
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
            className="text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700/50"
            title="Copy Full ID"
        >
            {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
        </button>
    );
};

export default function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setLoading(true);
                const data = await getTransactions();
                console.log(data, "From transactions page");
                setTransactions(data || []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchTransactions();
    }, []);

    // বড় আইডি ছোট করার ফাংশন (যেমন: 6a3b8c05...22ef)
    const shrinkId = (id) => {
        if (!id) return "N/A";
        if (id.length <= 12) return id;
        return `${id.slice(0, 6)}...${id.slice(-4)}`;
    };

    const formatAmount = (amount, currency) => {
        if (!amount) return "$0.00";
        const formattedAmount = amount / 100;
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: (currency || 'usd').toUpperCase(),
        }).format(formattedAmount);
    };

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
        <div className="p-4 md:p-8 animate-in fade-in duration-500 min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
            <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Receipt className="text-blue-500 w-8 h-8" /> Financial Transactions
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Complete historical financial ledger of platform rentals and processing fees.
                    </p>
                </div>
                <div className="text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl shadow-sm text-slate-600 dark:text-slate-300 self-start md:self-auto">
                    Total: <span className="font-bold text-blue-500">{transactions.length}</span> Txns
                </div>
            </header>

            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-700">
                            <tr>
                                <th className="p-5">Transaction ID</th>
                                <th className="p-5">Booking / Session</th>
                                <th className="p-5">Customer Email</th>
                                <th className="p-5">Date</th>
                                <th className="p-5">Status</th>
                                <th className="p-5 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-slate-700 dark:text-slate-300">

                            {loading && (
                                <tr>
                                    <td colSpan={6} className="p-10 text-center">
                                        <div className="flex flex-col items-center justify-center gap-3">
                                            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                                            <p className="text-sm text-slate-400">Loading transaction ledger...</p>
                                        </div>
                                    </td>
                                </tr>
                            )}

                            {!loading && transactions.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="p-10 text-center text-slate-400 dark:text-slate-500">
                                        No transactions found.
                                    </td>
                                </tr>
                            )}

                            {!loading && transactions?.map((t) => {
                                const transactionId = typeof t._id === 'object' && t._id?.$oid ? t._id.$oid : t._id;

                                return (
                                    <tr key={transactionId} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/30 transition-all group">

                                        {/* Transaction ID Column */}
                                        <td className="p-5">
                                            <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-900 dark:text-white">
                                                <span className="p-1.5 bg-blue-500/10 text-blue-500 rounded-lg group-hover:scale-110 transition-transform flex-shrink-0">
                                                    <ArrowUpRight size={14} />
                                                </span>
                                                <span title={transactionId}>
                                                    {shrinkId(transactionId)}
                                                </span>
                                                {transactionId && <CopyButton text={transactionId} />}
                                            </div>
                                        </td>

                                        {/* Booking & Stripe Session Column */}
                                        <td className="p-5 text-sm">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="font-medium text-slate-950 dark:text-slate-200 text-xs font-mono bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">
                                                        B: {shrinkId(t.bookingId)}
                                                    </span>
                                                    {t.bookingId && <CopyButton text={t.bookingId} />}
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                                                        S: {shrinkId(t.stripeSessionId)}
                                                    </span>
                                                    {t.stripeSessionId && <CopyButton text={t.stripeSessionId} />}
                                                </div>
                                            </div>
                                        </td>

                                        {/* Customer Email */}
                                        <td className="p-5 text-sm font-medium text-slate-600 dark:text-slate-300">
                                            {t.customerEmail}
                                        </td>

                                        {/* Date */}
                                        <td className="p-5 text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                            {formatDate(t.createdAt)}
                                        </td>

                                        {/* Status Badge */}
                                        <td className="p-5 text-sm">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${t.paymentStatus === 'Success'
                                                ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20'
                                                : 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/20'
                                                }`}>
                                                {t.paymentStatus === 'Success' ? (
                                                    <CheckCircle2 size={12} />
                                                ) : (
                                                    <HelpCircle size={12} />
                                                )}
                                                {t.paymentStatus}
                                            </span>
                                        </td>

                                        {/* Amount */}
                                        <td className="p-5 text-right font-bold text-slate-900 dark:text-white text-base whitespace-nowrap">
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