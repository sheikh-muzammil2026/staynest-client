"use client";

import React, { useEffect, useState } from 'react';
import { Home, CheckCircle, XCircle, Clock, MessageSquare, Trash2, AlertTriangle, Edit3 } from 'lucide-react';
import { deletePropertyById, trackAllProperties, updatePropertyStatus, updatePropertyDetails } from '@/lib/api/properties';
import Loading from '@/app/loading';
import { toast } from 'react-toastify';

/**
 * @interface OwnerInformation
 * @property {string} name - Owner's full name
 * @property {string} email - Owner's email address
 */

/**
 * @interface Property
 * @property {string} _id - Unique MongoDB identifier
 * @property {string} propertyTitle - Listing title
 * @property {string} location - Physical address
 * @property {number} rent - Monthly or contractual rent value
 * @property {string} rentType - Cycle type (e.g., 'Monthly')
 * @property {string} status - Verification state ('Pending' | 'Approved' | 'Rejected')
 * @property {string} [feedback] - Administrative reason for rejection
 * @property {OwnerInformation} ownerInformation - Nested owner contact profile
 */

export default function AllProperties() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);

    // Modal Visibility & Form Selection States
    const [modalOpen, setModalOpen] = useState(false);
    const [activePropertyId, setActivePropertyId] = useState(null);
    const [feedbackText, setFeedbackText] = useState('');

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [propertyToDelete, setPropertyToDelete] = useState(null);

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editForm, setEditForm] = useState({ _id: '', title: '', location: '', rent: '' });

    /**
     * Synchronizes and synchronically fetches all master property records on mount.
     */
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setLoading(true);
                const data = await trackAllProperties();
                setProperties(data);
            } catch (error) {
                console.error("Critical error inventorying platform properties:", error);
                toast.error("Failed to fetch system records.");
            } finally {
                setLoading(false);
            }
        };
        fetchProperties();
    }, []);

    /**
     * Dispatches transactional workflows to update property listing clearance status.
     */
    const updateStatus = async (id, newStatus, feedback = '') => {
        try {
            const result = await updatePropertyStatus(id, newStatus, feedback);

            if (result.modifiedCount > 0 || result.acknowledged) {
                setProperties(prev => prev.map(p => p._id === id ? { ...p, status: newStatus, feedback } : p));
                toast.success(`Property marked as ${newStatus} successfully.`);
            } else {
                toast.error("Status update acknowledged but zero mutation occurred.");
            }
        } catch (error) {
            console.error("Pipeline failure on status modulation:", error);
            toast.error("Could not update listing status.");
        }
    };

    /**
     * Executes data alterations to update primary property core parameters.
     */
    const handleUpdateDetails = async (e) => {
        e.preventDefault();
        if (!editForm.title || !editForm.location || !editForm.rent) {
            return toast.info("All listing update metrics are mandatory.");
        }

        try {
            const result = await updatePropertyDetails(editForm._id, {
                propertyTitle: editForm.title,
                location: editForm.location,
                rent: Number(editForm.rent)
            });

            if (result.acknowledged || result.modifiedCount > 0) {
                setProperties(prev => prev.map(p => p._id === editForm.id 
                    ? { ...p, propertyTitle: editForm.title, location: editForm.location, rent: Number(editForm.rent) } 
                    : p
                ));
                toast.success("Listing payload modulated successfully.");
                setEditModalOpen(false);
            } else {
                toast.error("No modifications detected in target document.");
            }
        } catch (error) {
            console.error("Pipeline failure on property documentation update:", error);
            toast.error("Failed to commit structural content revisions.");
        }
    };

    /**
     * Permanently deletes property data allocations from the primary cluster.
     */
    const handleConfirmDelete = async () => {
        if (!propertyToDelete) return;

        try {
            const result = await deletePropertyById(propertyToDelete._id);

            if (result.deletedCount > 0) {
                setProperties(prev => prev.filter(p => p._id !== propertyToDelete._id));
                toast.success("Property purge cycle executed securely.");
            } else {
                toast.error("Purge cycle executed but zero targets matched criteria.");
            }
        } catch (error) {
            console.error("Pipeline failure on secure deletion workflow:", error);
            toast.error("Data security constraint blocked record deletion.");
        } finally {
            setDeleteModalOpen(false);
            setPropertyToDelete(null);
        }
    };

    const handleOpenRejectModal = (id) => {
        setActivePropertyId(id);
        setFeedbackText('');
        setModalOpen(true);
    };

    const submitRejection = () => {
        if (!feedbackText.trim()) return toast.info("Reasoned transactional context required.");
        updateStatus(activePropertyId, 'Rejected', feedbackText);
        setModalOpen(false);
    };

    const handleOpenEditModal = (p) => {
        setEditForm({ id: p._id, title: p.propertyTitle, location: p.location, rent: p.rent });
        setEditModalOpen(true);
    };

    return (
        <div className="p-4 md:p-8 animate-in fade-in duration-500 relative">
            <header className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Home className="text-blue-500" /> System Properties
                </h1>
                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">Review, approve, or reject host property listings across the platform.</p>
            </header>

            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                
                {/* Mobile View */}
                <div className="grid grid-cols-1 divide-y divide-slate-100 dark:divide-slate-700 md:hidden">
                    {loading && <div className="p-10 text-center"><Loading /></div>}
                    {!loading && properties.length === 0 && (
                        <div className="p-10 text-center text-slate-400 text-sm">No properties available for review.</div>
                    )}
                    {!loading && properties?.map((p) => (
                        <div key={p._id} className="p-5 space-y-4 hover:bg-slate-50 dark:hover:bg-slate-900/20 transition-all">
                            <div className="flex justify-between items-start gap-2">
                                <div className="min-w-0 flex-1">
                                    <h4 className="font-bold text-slate-900 dark:text-white text-base truncate">{p.propertyTitle}</h4>
                                    <p className="text-xs text-slate-400 truncate">{p.location}</p>
                                </div>
                                <div className="text-right shrink-0">
                                    <span className="text-sm font-black text-blue-500 block">BDT {p.rent}</span>
                                    <span className="text-[10px] text-slate-400">/{p.rentType || 'Monthly'}</span>
                                </div>
                            </div>

                            <div className="text-xs text-slate-700 dark:text-slate-300">
                                <span className="font-semibold text-slate-400">Owner:</span> {p?.ownerInformation?.name || "Unknown Owner"}
                            </div>

                            <div className="flex flex-col gap-2 pt-1 border-t border-slate-100 dark:border-slate-700/50 pt-3">
                                <div className="flex items-center justify-between w-full gap-2">
                                    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                        p.status === 'Approved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' :
                                        p.status === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400' :
                                        'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400'
                                    }`}>
                                        {p.status === 'Approved' && <CheckCircle size={12} />}
                                        {p.status === 'Pending' && <Clock size={12} />}
                                        {p.status === 'Rejected' && <XCircle size={12} />}
                                        {p.status || 'Pending'}
                                    </span>

                                    <div className="flex items-center gap-1.5">
                                        {p.status !== 'Approved' && (
                                            <button onClick={() => updateStatus(p._id, 'Approved')} className="p-1.5 text-emerald-500 bg-emerald-500/10 rounded-xl hover:bg-emerald-500 hover:text-white transition-all">
                                                <CheckCircle size={16} />
                                            </button>
                                        )}
                                        {p.status !== 'Rejected' && (
                                            <button onClick={() => handleOpenRejectModal(p._id)} className="p-1.5 text-rose-500 bg-rose-500/10 rounded-xl hover:bg-rose-500 hover:text-white transition-all">
                                                <XCircle size={16} />
                                            </button>
                                        )}
                                        <button onClick={() => handleOpenEditModal(p)} className="p-1.5 text-blue-500 bg-blue-500/10 rounded-xl hover:bg-blue-500 hover:text-white transition-all">
                                            <Edit3 size={16} />
                                        </button>
                                        <button onClick={() => { setPropertyToDelete(p); setDeleteModalOpen(true); }} className="p-1.5 text-slate-400 hover:text-rose-500 rounded-xl transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>

                                {p?.feedback && (
                                    <p className="text-xs text-rose-500 dark:text-rose-400 flex items-center gap-1 italic bg-rose-500/5 p-2 rounded-xl border border-rose-500/10 mt-1">
                                        <MessageSquare size={12} className="shrink-0" /> {p.feedback}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:block overflow-x-auto">
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
                            {loading && <tr><td colSpan="5" className="p-10 text-center"><Loading /></td></tr>}
                            {!loading && properties.length === 0 && (
                                <tr><td colSpan="5" className="p-10 text-center text-slate-400 text-sm">No properties available for review.</td></tr>
                            )}
                            {!loading && properties?.map((p) => (
                                <tr key={p._id} className="hover:bg-slate-50 dark:hover:bg-slate-900/20 transition-all">
                                    <td className="p-5">
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white">{p.propertyTitle}</h4>
                                            <p className="text-xs text-slate-400">{p.location}</p>
                                        </div>
                                    </td>
                                    <td className="p-5 text-sm font-semibold">{p?.ownerInformation?.name || "Unknown Owner"}</td>
                                    <td className="p-5 font-black text-blue-500">
                                        BDT {p.rent} <span className="text-xs font-normal text-slate-400">/{p.rentType || 'Monthly'}</span>
                                    </td>
                                    <td className="p-5">
                                        <div className="space-y-1">
                                            <span className={`flex items-center gap-1.5 w-fit px-3 py-1 rounded-full text-xs font-bold ${p.status === 'Approved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' :
                                                p.status === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400' :
                                                    'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400'
                                                }`}>
                                                {p.status === 'Approved' && <CheckCircle size={14} />}
                                                {p.status === 'Pending' && <Clock size={14} />}
                                                {p.status === 'Rejected' && <XCircle size={14} />}
                                                {p.status || 'Pending'}
                                            </span>
                                            {p?.feedback && (
                                                <p className="text-xs text-rose-500 dark:text-rose-400 flex items-center gap-1 max-w-xs italic">
                                                    <MessageSquare size={12} /> {p.feedback}
                                                </p>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-5 flex justify-center gap-2 items-center">
                                        {p.status !== 'Approved' && (
                                            <button onClick={() => updateStatus(p._id, 'Approved')} className="p-2 text-emerald-500 bg-emerald-500/10 rounded-xl hover:bg-emerald-500 hover:text-white transition-all">
                                                <CheckCircle size={16} />
                                            </button>
                                        )}
                                        {p.status !== 'Rejected' && (
                                            <button onClick={() => handleOpenRejectModal(p._id)} className="p-2 text-rose-500 bg-rose-500/10 rounded-xl hover:bg-rose-500 hover:text-white transition-all">
                                                <XCircle size={16} />
                                            </button>
                                        )}
                                        <button onClick={() => handleOpenEditModal(p)} className="p-2 text-blue-500 bg-blue-500/10 rounded-xl hover:bg-blue-500 hover:text-white transition-all" title="Edit Properties">
                                            <Edit3 size={16} />
                                        </button>
                                        <button onClick={() => { setPropertyToDelete(p); setDeleteModalOpen(true); }} className="p-2 text-slate-400 hover:text-rose-500 rounded-xl transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* EDIT CORE PROPERTY MODAL */}
            {editModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
                    <form onSubmit={handleUpdateDetails} className="bg-white dark:bg-slate-800 rounded-[2rem] p-6 max-w-md w-full border border-slate-200 dark:border-slate-700 shadow-2xl space-y-4">
                        <div className="flex items-center gap-2 text-blue-500 font-bold text-lg">
                            <Edit3 /> Update Property Details
                        </div>
                        <div className="space-y-3">
                            <div>
                                <label className="text-xs text-slate-400 font-semibold block mb-1">Property Title</label>
                                <input 
                                    type="text" 
                                    value={editForm.title} 
                                    onChange={e => setEditForm({...editForm, title: e.target.value})}
                                    className="w-full p-3 rounded-xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none text-sm text-slate-900 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-xs text-slate-400 font-semibold block mb-1">Location Address</label>
                                <input 
                                    type="text" 
                                    value={editForm.location} 
                                    onChange={e => setEditForm({...editForm, location: e.target.value})}
                                    className="w-full p-3 rounded-xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none text-sm text-slate-900 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-xs text-slate-400 font-semibold block mb-1">Rent Value (BDT)</label>
                                <input 
                                    type="number" 
                                    value={editForm.rent} 
                                    onChange={e => setEditForm({...editForm, rent: e.target.value})}
                                    className="w-full p-3 rounded-xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none text-sm text-slate-900 dark:text-white"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 justify-end pt-2">
                            <button type="button" onClick={() => setEditModalOpen(false)} className="py-2 px-4 bg-slate-100 dark:bg-slate-700 rounded-xl text-sm font-semibold">Cancel</button>
                            <button type="submit" className="py-2 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-500/20">Commit Revision</button>
                        </div>
                    </form>
                </div>
            )}

            {/* REJECTION FEEDBACK MODAL */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-6 max-w-md w-full border border-slate-200 dark:border-slate-700 shadow-2xl space-y-4">
                        <div className="flex items-center gap-2 text-rose-500 font-bold text-lg">
                            <AlertTriangle /> Rejection Feedback
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">State the exact reason for rejecting this listing. The owner will view this feedback.</p>
                        <textarea
                            rows="4"
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                            className="w-full p-4 rounded-2xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none focus:ring-2 ring-rose-500 text-slate-900 dark:text-white text-sm"
                            placeholder="Provide operational mismatch context..."
                            required
                        ></textarea>
                        <div className="flex gap-2 justify-end">
                            <button onClick={() => setModalOpen(false)} className="py-2 px-4 bg-slate-100 dark:bg-slate-700 rounded-xl text-sm font-semibold">Cancel</button>
                            <button onClick={submitRejection} className="py-2.5 px-5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-bold shadow-md shadow-rose-500/20">Confirm Rejection</button>
                        </div>
                    </div>
                </div>
            )}

            {/* SECURE PURGE CONFIRMATION MODAL */}
            {deleteModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-6 max-w-md w-full border border-slate-200 dark:border-slate-700 shadow-2xl space-y-4 text-center">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-rose-100 dark:bg-rose-500/10 text-rose-600 mb-2">
                            <Trash2 size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Delete Property Immutable?</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Are you sure you want to permanently delete <span className="font-semibold text-slate-800 dark:text-slate-200">{propertyToDelete?.propertyTitle}</span>? This structural payload process is irreversible.</p>
                        <div className="flex gap-2 justify-center pt-2">
                            <button onClick={() => { setDeleteModalOpen(false); setPropertyToDelete(null); }} className="py-2.5 px-5 bg-slate-100 dark:bg-slate-700 rounded-xl text-sm font-semibold">Cancel</button>
                            <button onClick={handleConfirmDelete} className="py-2.5 px-6 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-bold shadow-md shadow-rose-500/20">Delete Permanently</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
