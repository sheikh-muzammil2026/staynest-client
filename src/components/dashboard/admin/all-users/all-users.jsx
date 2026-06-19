"use client";
import React, { useState } from 'react';
import { Shield, User, Users, Trash2, Check } from 'lucide-react';

const initialUsers = [
    { id: 1, name: 'Al-Amin Rahman', email: 'alamin@staynest.com', role: 'owner', joined: '12 Jan 2026' },
    { id: 2, name: 'Asif Ishtiaque', email: 'asif@gmail.com', role: 'tenant', joined: '05 Feb 2026' },
    { id: 3, name: 'Tahmid Ahmed', email: 'tahmid@admin.com', role: 'admin', joined: '01 Jan 2026' },
    { id: 4, name: 'Nusrat Jahan', email: 'nusrat@gmail.com', role: 'tenant', joined: '18 Mar 2026' },
];

export default function AllUsers() {
    const [users, setUsers] = useState(initialUsers);
    const [editingId, setEditingId] = useState(null);
    const [selectedRole, setSelectedRole] = useState('');

    const handleRoleChange = (id) => {
        setUsers(users.map(u => u.id === id ? { ...u, role: selectedRole } : u));
        setEditingId(null);
        alert("User role updated successfully in database!");
    };

    const handleDeleteUser = (id) => {
        if (confirm("Are you sure you want to permanently delete this user?")) {
            setUsers(users.filter(u => u.id !== id));
        }
    };

    return (
        <div className="p-4 md:p-8 animate-in fade-in duration-500">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Users className="text-blue-500" /> Platform Users
                </h1>
                <p className="text-slate-500 dark:text-slate-400">Manage user roles, accounts, and system access levels.</p>
            </header>

            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
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
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/20 transition-all">
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
                                    <td className="p-5 text-sm">{user.joined}</td>
                                    <td className="p-5">
                                        {editingId === user.id ? (
                                            <div className="flex items-center gap-2">
                                                <select
                                                    value={selectedRole}
                                                    onChange={(e) => setSelectedRole(e.target.value)}
                                                    className="p-2 text-sm rounded-xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none"
                                                >
                                                    <option value="tenant">Tenant</option>
                                                    <option value="owner">Owner</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                                <button onClick={() => handleRoleChange(user.id)} className="p-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors">
                                                    <Check size={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${user.role === 'admin' ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400' :
                                                    user.role === 'owner' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' :
                                                        'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'
                                                }`}>
                                                {user.role}
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-5 flex justify-center gap-2">
                                        <button
                                            onClick={() => { setEditingId(user.id); setSelectedRole(user.role); }}
                                            className="py-2 px-4 text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-700/50 rounded-xl transition-colors flex items-center gap-1"
                                        >
                                            <Shield size={14} /> Change Role
                                        </button>
                                        <button
                                            onClick={() => handleDeleteUser(user.id)}
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
        </div>
    );
}