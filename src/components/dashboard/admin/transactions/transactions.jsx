"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { ArrowUpRight, Receipt, Loader2, CheckCircle2, XCircle, AlertCircle, Copy, Check, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { getTransactions } from '@/lib/api/transactions';

/**
 * @typedef {Object} Transaction
 * @property {string|{ $oid: string }} _id
 * @property {string} bookingId
 * @property {string} stripeSessionId
 * @property {string} customerEmail
 * @property {string|{ $date: string }} createdAt
 * @property {string} paymentStatus
 * @property {number} amount
 * @property {string} currency
 */

const CopyButton = ({ text }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className="text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700/50"
            title="Copy to clipboard"
        >
            {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
        </button>
    );
};

export default function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchAllTransactions = async () => {
            try {
                setLoading(true);
                const data = await getTransactions();
                setTransactions(data || []);
            } catch (error) {
                console.error("Error loading transactions:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllTransactions();
    }, []);

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

    const filteredTransactions = useMemo(() => {
        return transactions.filter(t => {
            const transactionId = typeof t._id === 'object' && t._id?.$oid ? t._id.$oid : t._id;
            
            const matchesSearch =
                transactionId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                t.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                t.bookingId?.toLowerCase().includes(searchTerm.toLowerCase());

            const currentStatus = t.paymentStatus?.toLowerCase() || '';
            let matchesStatus = statusFilter === 'All';
            if (statusFilter === 'Paid') matchesStatus = currentStatus === 'success' || currentStatus === 'paid';
            if (statusFilter === 'Failed') matchesStatus = currentStatus === 'failed' || currentStatus === 'unpaid';
            if (statusFilter === 'Pending') matchesStatus = currentStatus === 'pending' || currentStatus === '';

            return matchesSearch && matchesStatus;
        });
    }, [transactions, searchTerm, statusFilter]);

    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const paginatedTransactions = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredTransactions.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredTransactions, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter]);

    const getStatusStyles = (status) => {
        const normalized = status?.toLowerCase();
        if (normalized === 'success' || normalized === 'paid') {
            return 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20';
        }
        if (normalized === 'failed' || normalized === 'unpaid') {
            return 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/20';
        }
        return 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/20';
    };

    const renderStatusIcon = (status) => {
        const normalized = status?.toLowerCase();
        if (normalized === 'success' || normalized === 'paid') return <CheckCircle2 size={12} />;
        if (normalized === 'failed' || normalized === 'unpaid') return <XCircle size={12} />;
        return <AlertCircle size={12} />;
    };

    return (
        <div className="p-4 md:p-8 animate-in fade-in duration-500 min-h-screen max-w-7xl mx-auto w-full box-border">
            
            <header className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Receipt className="text-indigo-500 w-6 h-6 md:w-7 md:h-7" /> Financial Transactions
                    </h1>
                    <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Complete historical financial ledger of platform rentals and processing fees.
                    </p>
                </div>
                <div className="text-xs md:text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl shadow-sm text-slate-600 dark:text-slate-300 self-start sm:self-auto font-medium">
                    Filtered: <span className="font-bold text-indigo-500">{filteredTransactions.length}</span> / {transactions.length}
                </div>
            </header>

            <div className="mb-6 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by Txn ID, Email, or Booking ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all"
                    />
                </div>
                <div className="relative w-full sm:min-w-[160px] sm:w-auto">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full pl-10 pr-8 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white appearance-none cursor-pointer font-medium"
                    >
                        <option value="All">All Status</option>
                        <option value="Paid">Paid / Success</option>
                        <option value="Pending">Pending</option>
                        <option value="Failed">Failed / Unpaid</option>
                    </select>
                </div>
            </div>

            {/* Global Loader state */}
            {loading && (
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-12 text-center shadow-sm w-full">
                    <div className="flex flex-col items-center justify-center gap-3">
                        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                        <p className="text-sm font-medium text-slate-400">Loading transaction ledger...</p>
                    </div>
                </div>
            )}

            {/* Empty UI State */}
            {!loading && filteredTransactions.length === 0 && (
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-12 text-center font-medium text-slate-400 dark:text-slate-500 shadow-sm w-full">
                    No matching transactions found.
                </div>
            )}

            {/* Responsive Presentation: Table View (Desktop) and Card View (Mobile) */}
            {!loading && filteredTransactions.length > 0 && (
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm w-full">
                    
                    {/* Mobile Card Layout - visible on small screens (< md) */}
                    <div className="block md:hidden divide-y divide-slate-100 dark:divide-slate-700">
                        {paginatedTransactions.map((t) => {
                            const transactionId = typeof t._id === 'object' && t._id?.$oid ? t._id.$oid : t._id;
                            return (
                                <div key={transactionId} className="p-4 flex flex-col gap-3 hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition-colors">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-slate-900 dark:text-white">
                                            <span className="p-1 bg-indigo-500/10 text-indigo-500 rounded-md">
                                                <ArrowUpRight size={12} />
                                            </span>
                                            <span>{shrinkId(transactionId)}</span>
                                            {transactionId && <CopyButton text={transactionId} />}
                                        </div>
                                        <div className="text-base font-bold text-slate-900 dark:text-white">
                                            {formatAmount(t.amount, t.currency)}
                                        </div>
                                    </div>
                                    
                                    <div className="text-xs text-slate-600 dark:text-slate-300 break-all">
                                        <span className="text-slate-400 block text-[10px] uppercase font-semibold mb-0.5">Customer</span>
                                        {t.customerEmail}
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-50 dark:border-slate-700/50">
                                        <div>
                                            <span className="text-slate-400 block text-[10px] uppercase font-semibold mb-0.5">References</span>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">B: {shrinkId(t.bookingId)}</span>
                                                <span className="text-[11px] font-mono text-slate-400">S: {shrinkId(t.stripeSessionId)}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end justify-between">
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${getStatusStyles(t.paymentStatus)}`}>
                                                {renderStatusIcon(t.paymentStatus)}
                                                <span className="capitalize">{t.paymentStatus || 'Pending'}</span>
                                            </span>
                                            <span className="text-[10px] text-slate-400 mt-1">
                                                {formatDate(t.createdAt)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Desktop Table Layout - hidden on small screens (< md) */}
                    <div className="hidden md:block overflow-x-auto min-w-full align-middle">
                        <table className="w-full text-left border-collapse table-auto whitespace-nowrap">
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
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-slate-700 dark:text-slate-300 text-sm">
                                {paginatedTransactions.map((t) => {
                                    const transactionId = typeof t._id === 'object' && t._id?.$oid ? t._id.$oid : t._id;
                                    return (
                                        <tr key={transactionId} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/20 transition-colors group">
                                            <td className="p-5">
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
                                            <td className="p-5">
                                                <div className="flex flex-col gap-1 max-w-[200px]">
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
                                            <td className="p-5 font-medium text-slate-600 dark:text-slate-300 max-w-[250px] truncate">
                                                {t.customerEmail}
                                            </td>
                                            <td className="p-5 text-xs text-slate-500 dark:text-slate-400">
                                                {formatDate(t.createdAt)}
                                            </td>
                                            <td className="p-5">
                                                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusStyles(t.paymentStatus)}`}>
                                                    {renderStatusIcon(t.paymentStatus)}
                                                    <span className="capitalize">{t.paymentStatus || 'Pending'}</span>
                                                </span>
                                            </td>
                                            <td className="p-5 text-right font-bold text-slate-900 dark:text-white text-base">
                                                {formatAmount(t.amount, t.currency)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Bar */}
                    {totalPages > 1 && (
                        <div className="bg-slate-50 dark:bg-slate-900/30 px-4 py-3.5 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-3 items-center justify-between">
                            <p className="text-xs text-slate-500 dark:text-slate-400 order-2 sm:order-1 text-center sm:text-left">
                                Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredTransactions.length)}</span> of <span className="font-medium">{filteredTransactions.length}</span> results
                            </p>
                            <div className="flex items-center justify-center gap-1 order-1 sm:order-2 w-full sm:w-auto">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                >
                                    <ChevronLeft size={16} />
                                </button>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
