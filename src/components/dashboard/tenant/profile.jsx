"use client";
import React from "react";
import { Avatar } from "@heroui/react";

// মক কারেন্ট ইউজার ডাটা (অথবা প্রজেক্টের Auth Context থেকে রিড করবে)
const currentUser = {
    name: "Arif Rahman",
    email: "arif.dev@staynest.com",
    role: "Tenant", // ডাইনামিক রোল (Tenant / Owner / Admin)
    avatar: "https://i.pravatar.cc/150?u=a042581f2e29026024d",
};

export default function Profile() {
    return (
        <div className="space-y-8 max-w-2xl">
            {/* হেডার */}
            <div>
                <h3 className="text-xl font-black tracking-tight text-slate-950 dark:text-white">
                    Account Profile
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    View your global account credentials, secure authentication status and role access.
                </p>
            </div>

            {/* প্রোফাইল কার্ড */}
            <div className="bg-white/80 dark:bg-[#131B2E]/40 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/80 p-6 rounded-3xl flex flex-col sm:flex-row items-center gap-6 shadow-sm">
                <Avatar
                    src={currentUser.avatar}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-indigo-500/30"
                    radius="lg"
                />
                <div className="text-center sm:text-left space-y-1">
                    <div className="flex flex-col sm:flex-row items-center gap-2">
                        <h4 className="text-lg font-black tracking-tight text-slate-950 dark:text-white">
                            {currentUser.name}
                        </h4>
                        <span className="px-2.5 py-0.5 rounded-lg bg-indigo-600 text-white font-bold text-[9px] uppercase tracking-wider">
                            {currentUser.role}
                        </span>
                    </div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                        {currentUser.email}
                    </p>
                </div>
            </div>

            {/* ইনফরমেশন ফর্ম গ্রিড */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1.5">
                        Registered Email Address
                    </label>
                    <input
                        type="text"
                        value={currentUser.email}
                        disabled
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/60 text-xs font-semibold text-slate-400 dark:text-slate-500 border border-slate-200/40 dark:border-slate-800/40 cursor-not-allowed"
                    />
                </div>
                <div>
                    <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1.5">
                        Account Status
                    </label>
                    <input
                        type="text"
                        value="Verified System Account"
                        disabled
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/60 text-xs font-bold text-emerald-500 border border-slate-200/40 dark:border-slate-800/40 cursor-not-allowed"
                    />
                </div>
            </div>
        </div>
    );
}