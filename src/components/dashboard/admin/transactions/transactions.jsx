"use client";
import React, { useState } from 'react';
import { DollarSign, ArrowUpRight, Receipt } from 'lucide-react';

const initialTransactions = [
    { txId: 'TXN-77310293', property: 'Blue Horizon Suite', tenant: 'Asif Ishtiaque', owner: 'Al-Amin Rahman', amount: '$1500.00', date: '19 Jun 2026' },
    { txId: 'TXN-77310294', property: 'Oceanic Horizon Villa', tenant: 'Nusrat Jahan', owner: 'Zayan Malik', amount: '$4000.00', date: '15 Jun 2026' },
    { txId: 'TXN-77310295', property: 'Cosy Studio Apartment', tenant: 'Siam Chowdhury', owner: 'Karim Uddin', amount: '$600.00', date: '12 Jun 2026' },
];

export default function Transactions() {
    const [transactions] = useState(initialTransactions);

    return (
        <div className="p-4 md:p-8 animate-in fade-in duration-500">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Receipt className="text-blue-500" /> Financial Transactions
                </h1>
                <p className="text-slate-500 dark:text-slate-400">Complete historical financial ledger of platform rentals and processing fees.</p>
            </header>

            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-sm uppercase">
                            <tr>
                                <th className="p-5">Transaction ID</th>
                                <th className="p-5">Property Details</th>
                                <th className="p-5">Tenant (Payer)</th>
                                <th className="p-5">Owner (Receiver)</th>
                                <th className="p-5">Date</th>
                                <th className="p-5 text-right">Settled Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-slate-700 dark:text-slate-300">
                            {transactions.map((t) => (
                                <tr key={t.txId} className="hover:bg-slate-50 dark:hover:bg-slate-900/20 transition-all">
                                    <td className="p-5">
                                        <div className="flex items-center gap-2 font-mono text-sm font-bold text-slate-900 dark:text-white">
                                            <span className="p-1.5 bg-emerald-500/10 text-emerald-500 rounded-lg"><ArrowUpRight size={14} /></span>
                                            {t.txId}
                                        </div>
                                    </td>
                                    <td className="p-5 text-sm font-semibold text-slate-900 dark:text-white">{t.property}</td>
                                    <td className="p-5 text-sm">{t.tenant}</td>
                                    <td className="p-5 text-sm font-medium text-slate-500 dark:text-slate-400">{t.owner}</td>
                                    <td className="p-5 text-xs text-slate-400 uppercase tracking-wider">{t.date}</td>
                                    <td className="p-5 text-right font-black text-emerald-600 dark:text-emerald-400 text-lg">
                                        {t.amount}
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