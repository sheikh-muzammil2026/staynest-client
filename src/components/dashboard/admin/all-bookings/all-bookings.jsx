"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { Calendar, ArrowRight, Loader2, Inbox, Search, Filter, Eye, MoreVertical, ChevronLeft, ChevronRight, Copy } from 'lucide-react';
import { getAllBookings } from '@/lib/api/booking';

export default function AllBookings() {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Fetch all bookings on component mount
    useEffect(() => {
        const fetchAllBookings = async () => {
            try {
                setIsLoading(true);
                const bookingsData = await getAllBookings();
                setBookings(Array.isArray(bookingsData) ? bookingsData : []);
            } catch (error) {
                console.error("Failed to fetch bookings:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAllBookings();
    }, []);

    // Filter bookings based on search query and status
    const filteredBookings = useMemo(() => {
        return bookings.filter(b => {
            const matchesSearch =
                b._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                b.tenantName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                b.propertyName?.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = statusFilter === 'All' || b.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [bookings, searchTerm, statusFilter]);

    // Pagination logic
    const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
    const paginatedBookings = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredBookings.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredBookings, currentPage]);

    // Reset pagination on filter change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter]);

    return (
        <div className="p-4 md:p-8 animate-in fade-in duration-500 max-w-7xl mx-auto w-full">
            {/* Header Section */}
            <header className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Calendar className="text-indigo-500" size={26} /> Platform Bookings
                    </h1>
                    <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Total {filteredBookings.length} booking{filteredBookings.length !== 1 ? 's' : ''} found
                    </p>
                </div>
            </header>

            {/* Filters Section (Fully Responsive Stack/Row) */}
            <div className="mb-6 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by ID, tenant, or property..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                    />
                </div>
                <div className="relative w-full sm:min-w-[180px] sm:w-auto">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full pl-10 pr-8 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white appearance-none cursor-pointer"
                    >
                        <option value="All">All Status</option>
                        <option value="Approved">Approved</option>
                        <option value="Pending">Pending</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
            </div>

            {/* Data Table Wrapper */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm w-full">
                <div className="overflow-x-auto min-w-full inline-block align-middle">
                    <table className="w-full text-left border-collapse table-auto whitespace-nowrap">
                        <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
                            <tr>
                                <th className="p-4">Booking ID</th>
                                <th className="p-4">Tenant Info</th>
                                <th className="p-4">Property & Host</th>
                                <th className="p-4">Schedule</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-slate-700 dark:text-slate-300 text-sm">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} className="p-12 text-center">
                                        <div className="flex flex-col items-center justify-center gap-3">
                                            <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
                                            <p className="text-sm font-medium text-slate-500">Loading platform bookings...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : paginatedBookings.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-12 text-center">
                                        <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                                            <Inbox size={44} strokeWidth={1.5} />
                                            <p className="text-sm font-medium">No bookings match your criteria</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                paginatedBookings.map((b) => (
                                    <tr key={b._id} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/20 transition-colors">
                                        <td className="p-4 group">
                                            <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-slate-500 dark:text-slate-400">
                                                <span>#{b._id?.slice(-8) || b._id}</span>
                                                <button
                                                    onClick={() => navigator.clipboard.writeText(b._id)}
                                                    title="Copy Full ID"
                                                    className="opacity-0 group-hover:opacity-100 text-indigo-500 hover:text-indigo-600 transition-opacity p-0.5 rounded"
                                                >
                                                    <Copy size={12} />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="p-4 font-medium text-slate-900 dark:text-white">{b.tenantName}</td>
                                        <td className="p-4">
                                            <div className="max-w-[200px] truncate">
                                                <h4 className="font-semibold text-slate-900 dark:text-white truncate">{b.propertyName}</h4>
                                                <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{b.ownerEmail}</p>
                                            </div>
                                        </td>
                                        <td className="p-4 text-xs">
                                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium">
                                                <span>{b.bookedAt}</span>
                                                <ArrowRight size={12} className="text-slate-400" />
                                                <span>{b.moveInDate}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                                                    b.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' :
                                                    b.status === 'Pending' ? 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400' :
                                                    b.status === 'Rejected' ? 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400' :
                                                    'bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400'
                                                }`}>
                                                {b.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    title="View Details"
                                                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-500 dark:text-slate-400 transition-colors"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                                <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-500 dark:text-slate-400 transition-colors">
                                                    <MoreVertical size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                {!isLoading && totalPages > 1 && (
                    <div className="bg-slate-50 dark:bg-slate-900/30 px-4 py-3.5 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-3 items-center justify-between">
                        <p className="text-xs text-slate-500 dark:text-slate-400 order-2 sm:order-1">
                            Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredBookings.length)}</span> of <span className="font-medium">{filteredBookings.length}</span> results
                        </p>
                        <div className="flex items-center gap-1 order-1 sm:order-2 self-end sm:self-auto">
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
        </div>
    );
}
