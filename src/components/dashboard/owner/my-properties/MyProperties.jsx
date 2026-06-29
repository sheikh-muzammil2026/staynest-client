"use client";

import React, { useEffect, useState } from 'react';
import { Edit, Trash2, CheckCircle, Clock, XCircle, Loader2, Eye, MessageSquare, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { getOwnerProperties, deletePropertyByIdWithOwner, updatePropertyById } from '@/lib/api/properties';
import { toast } from 'react-toastify';

export default function MyProperties() {
    const router = useRouter();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleteLoadingId, setDeleteLoadingId] = useState(null);

    // Feedback Modal States
    const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
    const [selectedFeedback, setSelectedFeedback] = useState('');
    const [selectedPropertyTitle, setSelectedPropertyTitle] = useState('');

    // Edit Modal States
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editLoading, setEditLoading] = useState(false);
    const [editingProperty, setEditingProperty] = useState(null);
    const [formData, setFormData] = useState({
        propertyTitle: '',
        propertyType: '',
        rent: '',
        rentType: ''
    });

    const { data: session, isPending: isSessionLoading } = authClient.useSession();
    const user = session?.user;
    const userEmail = user?.email;

    const showLoadingState = loading || isSessionLoading;

    useEffect(() => {
        if (!userEmail || isSessionLoading) return;

        const fetchProperties = async () => {
            try {
                setLoading(true);
                const data = await getOwnerProperties(userEmail);
                setProperties(Array.isArray(data) ? data : data ? [data] : []);
            } catch (error) {
                console.error("Error fetching properties:", error);
               
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, [userEmail, isSessionLoading]);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this property?")) return;
        
        try {
            setDeleteLoadingId(id);
            const response = await deletePropertyByIdWithOwner(id);
            
            if (response.success) {
                setProperties(prev => prev.filter(p => p._id !== id && p.id !== id));
                toast.success("Property deleted successfully!");
            }
        } catch (error) {
            console.error("Deletion error:", error);
            toast.error("Failed to delete property");
        } finally {
            setDeleteLoadingId(null);
        }
    };

  
    const handleEditClick = (property) => {
        setEditingProperty(property);
        setFormData({
            propertyTitle: property.propertyTitle || '',
            propertyType: property.propertyType || '',
            rent: property.rent || '',
            rentType: property.rentType || 'Monthly'
        });
        setEditModalOpen(true);
    };

  
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'rent' ? Number(value) : value
        }));
    };

  
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const targetId = editingProperty._id || editingProperty.id;
        
        try {
            setEditLoading(true);
            const response = await updatePropertyById(targetId, formData);
            
            if (response.success) {
               
                setProperties(prev => prev.map(p => {
                    if ((p._id || p.id) === targetId) {
                        return { ...p, ...formData };
                    }
                    return p;
                }));
                toast.success("Property updated successfully!");
                setEditModalOpen(false);
            }
        } catch (error) {
            console.error("Update error:", error);
            toast.error(error.message || "Failed to update property");
        } finally {
            setEditLoading(false);
        }
    };

    const handleOpenFeedback = (title, feedback) => {
        setSelectedPropertyTitle(title);
        setSelectedFeedback(feedback || "No specific feedback provided by the administrator.");
        setFeedbackModalOpen(true);
    };

    return (
        <div className="p-4 md:p-8 relative">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">My Properties</h2>
            </div>

            {showLoadingState && (
                <div className="flex flex-col items-center justify-center p-16 text-slate-500 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    <p className="text-sm font-medium animate-pulse mt-3">Loading properties...</p>
                </div>
            )}

            {!showLoadingState && properties.length === 0 && (
                <div className="text-center p-16 text-slate-400 text-sm bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    No properties found.
                </div>
            )}

            {!showLoadingState && properties.length > 0 && (
                <>
                    {/* Mobile Card View */}
                    <div className="grid grid-cols-1 gap-4 md:hidden">
                        {properties.map((p) => (
                            <div 
                                key={p._id || p.id} 
                                className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4"
                            >
                                <div className="flex justify-between items-start gap-2">
                                    <div>
                                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{p.propertyType}</span>
                                        <h4 className="font-bold text-slate-900 dark:text-white text-base mt-0.5">{p.propertyTitle}</h4>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400 block">৳{p.rent?.toLocaleString()}</span>
                                        <span className="text-[10px] text-slate-400">/{p.rentType || 'Monthly'}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-700/50 pt-3">
                                    <div className="flex items-center gap-2">
                                        <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                                            p.status === 'Approved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' :
                                            p.status === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400' :
                                            'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400'
                                        }`}>
                                            {p.status === 'Approved' && <CheckCircle size={14} />}
                                            {p.status === 'Pending' && <Clock size={14} />}
                                            {p.status === 'Rejected' && <XCircle size={14} />}
                                            {p.status || 'Pending'}
                                        </span>

                                        {p.status === 'Rejected' && (
                                            <button
                                                onClick={() => handleOpenFeedback(p.propertyTitle, p.feedback)}
                                                className="p-1 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/20 rounded-lg cursor-pointer transition-colors"
                                            >
                                                <Eye size={16} />
                                            </button>
                                        )}
                                    </div>

                                    <div className="flex gap-1 items-center min-w-[70px] justify-end">
                                        <button 
                                            onClick={() => handleEditClick(p)}
                                            className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/50 text-blue-500 rounded-lg cursor-pointer transition-colors"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        {deleteLoadingId === (p._id || p.id) ? (
                                            <Loader2 className="h-4 w-4 animate-spin text-rose-500 m-2" />
                                        ) : (
                                            <button 
                                                onClick={() => handleDelete(p._id || p.id)} 
                                                className="p-2 hover:bg-rose-50 dark:hover:bg-rose-900/50 text-rose-500 rounded-lg cursor-pointer transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop Table View */}
                    <div className="hidden md:block bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
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
                                    {properties.map((p) => (
                                        <tr key={p._id || p.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/20 transition-all">
                                            <td className="p-5 font-semibold text-slate-900 dark:text-white max-w-[280px] truncate">
                                                {p.propertyTitle}
                                            </td>
                                            <td className="p-5">{p.propertyType}</td>
                                            <td className="p-5 font-bold text-blue-600 dark:text-blue-400">
                                                ৳{p.rent?.toLocaleString()}
                                                <span className="text-xs font-normal text-slate-400">/{p.rentType || 'Monthly'}</span>
                                            </td>
                                            <td className="p-5">
                                                <div className="flex items-center gap-2">
                                                    <span className={`flex items-center gap-1.5 w-fit px-3 py-1 rounded-full text-xs font-bold ${
                                                        p.status === 'Approved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' :
                                                        p.status === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400' :
                                                        'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400'
                                                    }`}>
                                                        {p.status === 'Approved' && <CheckCircle size={14} />}
                                                        {p.status === 'Pending' && <Clock size={14} />}
                                                        {p.status === 'Rejected' && <XCircle size={14} />}
                                                        {p.status || 'Pending'}
                                                    </span>

                                                    {p.status === 'Rejected' && (
                                                        <button
                                                            onClick={() => handleOpenFeedback(p.propertyTitle, p.feedback)}
                                                            title="View Rejection Reason"
                                                            className="p-1 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/20 rounded-lg cursor-pointer transition-colors"
                                                        >
                                                            <Eye size={16} />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-5 flex justify-center gap-2 items-center min-w-[100px]">
                                                <button 
                                                    onClick={() => handleEditClick(p)}
                                                    className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/50 text-blue-500 rounded-lg cursor-pointer transition-colors"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                {deleteLoadingId === (p._id || p.id) ? (
                                                    <Loader2 className="h-4 w-4 animate-spin text-rose-500 m-2" />
                                                ) : (
                                                    <button 
                                                        onClick={() => handleDelete(p._id || p.id)} 
                                                        className="p-2 hover:bg-rose-50 dark:hover:bg-rose-900/50 text-rose-500 rounded-lg cursor-pointer transition-colors"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}

            {/* Dynamic Edit Property Modal */}
            {editModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-6 max-w-md w-full border border-slate-200 dark:border-slate-700 shadow-2xl space-y-4 relative">
                        <button 
                            onClick={() => setEditModalOpen(false)}
                            className="absolute right-5 top-5 p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
                        >
                            <X size={20} />
                        </button>
                        
                        <div className="flex items-center gap-2 text-blue-600 font-bold text-lg mb-2">
                            <Edit size={20} /> Edit Property Details
                        </div>

                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div>
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">Property Title</label>
                                <input 
                                    type="text" 
                                    name="propertyTitle"
                                    value={formData.propertyTitle}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent dark:text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">Property Type</label>
                                <input 
                                    type="text" 
                                    name="propertyType"
                                    value={formData.propertyType}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent dark:text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">Rent (৳)</label>
                                    <input 
                                        type="number" 
                                        name="rent"
                                        value={formData.rent}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent dark:text-white focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">Rent Type</label>
                                    <select 
                                        name="rentType"
                                        value={formData.rentType}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                                    >
                                        <option value="Monthly">Monthly</option>
                                        <option value="Yearly">Yearly</option>
                                        <option value="Daily">Daily</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setEditModalOpen(false)}
                                    className="py-2.5 px-5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl text-sm font-bold transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={editLoading}
                                    className="py-2.5 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold flex items-center gap-1.5 transition-all shadow-md disabled:opacity-50"
                                >
                                    {editLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Rejection Feedback Modal */}
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
                                className="py-2.5 px-6 bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 rounded-xl text-sm font-bold cursor-pointer transition-all shadow-md"
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
