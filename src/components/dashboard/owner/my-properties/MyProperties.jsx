"use client";
import React, { useState } from 'react';
import { Edit, Trash2, CheckCircle, Clock, XCircle } from 'lucide-react';

const initialProperties = [
    { id: 1, title: 'Luxury Penthouse', type: 'Apartment', price: '$2000', rentType: 'Monthly', status: 'Approved' },
    { id: 2, title: 'Sunset Villa', type: 'Villa', price: '$4500', rentType: 'Monthly', status: 'Pending' },
    { id: 3, title: 'Downtown Studio', type: 'Studio', price: '$800', rentType: 'Monthly', status: 'Rejected' },
];

export default function MyProperties() {
    const [properties, setProperties] = useState(initialProperties);

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this property?")) {
            setProperties(properties.filter(p => p.id !== id));
        }
    };

    return (
        <div className="p-4 md:p-8">
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
                            {properties.map((p) => (
                                <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/20 transition-all">
                                    <td className="p-5 font-semibold text-slate-900 dark:text-white">{p.title}</td>
                                    <td className="p-5">{p.type}</td>
                                    <td className="p-5 font-bold text-blue-600 dark:text-blue-400">{p.price}<span className="text-xs font-normal text-slate-400">/{p.rentType}</span></td>
                                    <td className="p-5">
                                        <span className={`flex items-center gap-1.5 w-fit px-3 py-1 rounded-full text-xs font-bold ${p.status === 'Approved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' :
                                                p.status === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400' :
                                                    'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400'
                                            }`}>
                                            {p.status === 'Approved' && <CheckCircle size={14} />}
                                            {p.status === 'Pending' && <Clock size={14} />}
                                            {p.status === 'Rejected' && <XCircle size={14} />}
                                            {p.status}
                                        </span>
                                    </td>
                                    <td className="p-5 flex justify-center gap-2">
                                        <button className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/50 text-blue-500 rounded-lg transition-colors"><Edit size={18} /></button>
                                        <button onClick={() => handleDelete(p.id)} className="p-2 hover:bg-rose-50 dark:hover:bg-rose-900/50 text-rose-500 rounded-lg transition-colors"><Trash2 size={18} /></button>
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