"use client";
import React, { useEffect, useState } from 'react';
import { Shield, User, Users, Trash2, Check, AlertTriangle } from 'lucide-react';
import { getUsers, updateUserRole, deleteUserById } from '@/lib/api/users';
import { toast } from 'react-toastify';

export default function AllUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [selectedRole, setSelectedRole] = useState('');

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    // Exact same original fetch functionality
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const data = await getUsers();
                setUsers(data); // Kept exactly as your original code
            } catch (error) {
                console.error("Error loading users:", error);
                toast.error("Failed to load users");
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    // Exact same original role change functionality
    const handleRoleChange = async (id) => {
        try {
            const result = await updateUserRole(id, selectedRole);
            if (result.modifiedCount > 0 || result.acknowledged) {
                setUsers(prevUsers =>
                    prevUsers.map(u => u._id === id ? { ...u, role: selectedRole } : u)
                );
                toast.success("User role updated successfully!");
            } else {
                toast.error("Failed to update user role.");
            }
        } catch (error) {
            console.error("Error changing role:", error);
            toast.error("Something went wrong!");
        } finally {
            setEditingId(null);
        }
    };

    const handleOpenDeleteModal = (user) => {
        setUserToDelete(user);
        setDeleteModalOpen(true);
    };

    // Exact same original delete functionality
    const handleConfirmDelete = async () => {
        if (!userToDelete) return;

        try {
            const result = await deleteUserById(userToDelete._id);
            if (result.deletedCount > 0) {
                setUsers(prevUsers => prevUsers.filter(u => u._id !== userToDelete._id));
                toast.success("User deleted permanently!");
            } else {
                toast.error("Failed to delete user.");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("Something went wrong!");
        } finally {
            setDeleteModalOpen(false);
            setUserToDelete(null);
        }
    };

    return (
        <div className="p-4 md:p-8 animate-in fade-in duration-500 relative">
            <header className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Users className="text-blue-500" /> Platform Users
                </h1>
                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">Manage user roles, accounts, and system access levels.</p>
            </header>

            {/* Responsive Container */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                
                {/* Mobile & Tablet View: Card Layout (< md breakpoint) */}
                <div className="grid grid-cols-1 divide-y divide-slate-100 dark:divide-slate-700 md:hidden">
                    {loading && (
                        <div className="p-10 text-center text-slate-400">Loading users...</div>
                    )}
                    {!loading && users.length === 0 && (
                        <div className="p-10 text-center text-slate-400 text-sm">No users found.</div>
                    )}
                    {!loading && users.map((user) => (
                        <div key={user._id} className="p-5 space-y-4 hover:bg-slate-50 dark:hover:bg-slate-900/20 transition-all">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center text-slate-400 shrink-0">
                                    <User size={18} />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h4 className="font-bold text-slate-900 dark:text-white text-base truncate">{user.name}</h4>
                                    <p className="text-xs text-slate-400 truncate">{user.email}</p>
                                </div>
                            </div>

                            <div className="text-xs text-slate-500 dark:text-slate-400">
                                <span className="font-semibold">Joined:</span> {user.joined || "N/A"}
                            </div>

                            <div className="flex items-center justify-between gap-2 pt-1">
                                <div className="flex-1 min-w-0">
                                    {editingId === user._id ? (
                                        <div className="flex items-center gap-1.5">
                                            <select
                                                value={selectedRole}
                                                onChange={(e) => setSelectedRole(e.target.value)}
                                                className="p-1.5 text-xs rounded-xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none w-full"
                                            >
                                                <option value="tenant">Tenant</option>
                                                <option value="owner">Owner</option>
                                                {/* Admin option removed here */}
                                            </select>
                                            <button onClick={() => handleRoleChange(user._id)} className="p-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors shrink-0">
                                                <Check size={14} />
                                            </button>
                                        </div>
                                    ) : (
                                        <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                            user.role === 'admin' ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400' :
                                            user.role === 'owner' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' :
                                            'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'
                                        }`}>
                                            {user.role || 'tenant'}
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center gap-1 shrink-0">
                                    {editingId !== user._id && (
                                        <button
                                            onClick={() => { setEditingId(user._id); setSelectedRole(user.role || 'tenant'); }}
                                            className="py-1.5 px-3 text-[11px] font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-700/50 rounded-xl transition-colors flex items-center gap-1"
                                        >
                                            <Shield size={12} /> Role
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleOpenDeleteModal(user)}
                                        className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-all"
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop Layout: Table View (>= md breakpoint) */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-sm uppercase">
                            <tr>
                                <th className="p-5">User Details</th>
                                <th className="p-5">Joined Date</th>
                                <th className="p-5">Current Role</th>
                                <th className="p-5 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-slate-700 dark:text-slate-300">
                            {loading && (
                                <tr>
                                    <td colSpan="4" className="p-10 text-center text-slate-400">Loading users...</td>
                                </tr>
                            )}
                            {!loading && users.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="p-10 text-center text-slate-400 text-sm">No users found.</td>
                                </tr>
                            )}
                            {!loading && users.map((user) => (
                                <tr key={user._id} className="hover:bg-slate-50 dark:hover:bg-slate-900/20 transition-all">
                                    <td className="p-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center text-slate-400">
                                                <User size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900 dark:text-white">{user.name}</h4>
                                                <p className="text-xs text-slate-400">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-5 text-sm">{user.joined || "N/A"}</td>
                                    <td className="p-5">
                                        {editingId === user._id ? (
                                            <div className="flex items-center gap-2">
                                                <select
                                                    value={selectedRole}
                                                    onChange={(e) => setSelectedRole(e.target.value)}
                                                    className="p-2 text-sm rounded-xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none"
                                                >
                                                    <option value="tenant">Tenant</option>
                                                    <option value="owner">Owner</option>
                                                    {/* Admin option removed here */}
                                                </select>
                                                <button onClick={() => handleRoleChange(user._id)} className="p-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors">
                                                    <Check size={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${user.role === 'admin' ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400' :
                                                    user.role === 'owner' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' :
                                                        'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'
                                                }`}>
                                                {user.role || 'tenant'}
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-5 flex justify-center items-center gap-2">
                                        <button
                                            onClick={() => { setEditingId(user._id); setSelectedRole(user.role || 'tenant'); }}
                                            className="py-1.5 px-3 text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-700/50 rounded-xl transition-colors flex items-center gap-1"
                                        >
                                            <Shield size={14} /> Change Role
                                        </button>
                                        <button
                                            onClick={() => handleOpenDeleteModal(user)}
                                            className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-all"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-6 max-w-md w-full border border-slate-200 dark:border-slate-700 shadow-2xl space-y-4 text-center">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-rose-100 dark:bg-rose-500/10 text-rose-600 mb-2">
                            <AlertTriangle size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Delete User?</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Are you sure you want to permanently delete <span className="font-semibold text-slate-800 dark:text-slate-200">{`"${userToDelete?.name}"`}</span>? All associated data will be wiped out.
                        </p>
                        <div className="flex gap-2 justify-center pt-2">
                            <button
                                onClick={() => { setDeleteModalOpen(false); setUserToDelete(null); }}
                                className="py-2.5 px-5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-xl text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-200 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="py-2.5 px-6 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs md:text-sm font-bold transition-all shadow-md shadow-rose-500/20"
                            >
                                Delete User
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
