"use client";
import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Camera, Lock, Save, Shield, Briefcase, CreditCard, Eye, EyeOff } from 'lucide-react';

export default function UserProfile({ user }) {

    // ইনিশিয়াল স্টেট
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        role: 'user',
        bio: 'No bio added yet.',
        businessId: '',
        emergencyContact: '',
        adminLevel: 'General Admin'
    });

    // 🟢 VS Code-এর লাল দাগ ও ওয়ার্নিং দূর করার জন্য সঠিক useEffect মেকানিজম
    useEffect(() => {
        if (user) {
            setProfile((prevProfile) => ({
                ...prevProfile,
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                address: user.address || '',
                role: user.role || 'user',
                bio: user.bio || 'No bio added yet.',
                businessId: user.businessId || '',
                emergencyContact: user.emergencyContact || '',
                adminLevel: user.adminLevel || 'General Admin'
            }));
        }
    }, [user]); // শুধুমাত্র user চেঞ্জ হলেই এই ইফেক্টটি রান করবে

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    // পাসওয়ার্ড ফিল্ডের আইকন টগল স্টেট
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        console.log("Updated Profile Data for API:", profile);
        alert(`${profile.role.toUpperCase()} profile updated successfully!`);
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert("New passwords do not match!");
            return;
        }
        console.log("Password Change Requested:", passwordData);
        alert("Password updated successfully!");
    };

    return (
        <div className="p-4 md:p-8 space-y-8 max-w-6xl mx-auto animate-in fade-in duration-500">
            {/* 🟢 আপনার রিকোয়ারমেন্ট অনুযায়ী হেডারটি অপরিবর্তিত রাখা হয়েছে */}
            <header>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Profile</h1>
                <p className="text-slate-500 dark:text-slate-400">Manage your StayNest account settings and information.</p>
            </header>

            <div className="grid md:grid-cols-3 gap-8">

                {/* Left Column: Avatar & Bio Card */}
                <div className="md:col-span-1 bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center text-center h-fit">
                    <div className="relative group cursor-pointer mb-4">
                        <div className="w-32 h-32 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden flex items-center justify-center border-4 border-blue-500 shadow-lg">
                            {user?.image ? (
                                <img src={user.image} alt={profile.name} className="w-full h-full object-cover" />
                            ) : (
                                <User size={64} className="text-slate-400" />
                            )}
                        </div>
                        <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera className="text-white" size={24} />
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{profile.name || "Loading..."}</h3>
                    <span className="mt-1 px-3 py-1 bg-blue-500/10 text-blue-500 text-xs font-bold rounded-full flex items-center gap-1 uppercase">
                        <Shield size={12} /> {profile.role}
                    </span>

                    <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 italic">
                        {`"${profile.bio}"`}
                    </p>
                </div>

                {/* Right Column: Dynamic Forms */}
                <div className="md:col-span-2 space-y-8">

                    {/* General Info Form */}
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-sm">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
                            <User className="text-blue-500" size={20} /> Personal Information
                        </h2>

                        <form onSubmit={handleProfileSubmit} className="space-y-6">
                            {/* Common Fields: Name & Email */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold ml-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-4 text-slate-400" size={18} />
                                        <input
                                            type="text"
                                            value={profile.name}
                                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                            className="w-full p-4 pl-12 rounded-2xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none focus:ring-2 ring-blue-500 transition-all text-slate-900 dark:text-white"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold ml-1">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-4 text-slate-400" size={18} />
                                        <input
                                            type="email"
                                            value={profile.email}
                                            readOnly
                                            disabled
                                            className="w-full p-4 pl-12 rounded-2xl border dark:border-slate-700 bg-slate-100 dark:bg-slate-900/50 outline-none text-slate-400 cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Common Fields: Phone & Address */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold ml-1">Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-4 text-slate-400" size={18} />
                                        <input
                                            type="text"
                                            value={profile.phone}
                                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                            className="w-full p-4 pl-12 rounded-2xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none focus:ring-2 ring-blue-500 transition-all text-slate-900 dark:text-white"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold ml-1">Location / Address</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-4 text-slate-400" size={18} />
                                        <input
                                            type="text"
                                            value={profile.address}
                                            onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                                            className="w-full p-4 pl-12 rounded-2xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none focus:ring-2 ring-blue-500 transition-all text-slate-900 dark:text-white"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* ROLE BASED CONDITIONAL FIELDS */}
                            {profile.role === 'owner' && (
                                <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                                    <label className="text-sm font-semibold ml-1">Business NID / Tax Identification Number</label>
                                    <div className="relative">
                                        <Briefcase className="absolute left-4 top-4 text-slate-400" size={18} />
                                        <input
                                            type="text"
                                            value={profile.businessId}
                                            onChange={(e) => setProfile({ ...profile, businessId: e.target.value })}
                                            className="w-full p-4 pl-12 rounded-2xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none focus:ring-2 ring-blue-500 transition-all text-slate-900 dark:text-white"
                                            placeholder="E.g. TAX-9876543"
                                        />
                                    </div>
                                </div>
                            )}

                            {profile.role === 'tenant' && (
                                <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                                    <label className="text-sm font-semibold ml-1">Emergency Contact Number</label>
                                    <div className="relative">
                                        <CreditCard className="absolute left-4 top-4 text-slate-400" size={18} />
                                        <input
                                            type="text"
                                            value={profile.emergencyContact}
                                            onChange={(e) => setProfile({ ...profile, emergencyContact: e.target.value })}
                                            className="w-full p-4 pl-12 rounded-2xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none focus:ring-2 ring-blue-500 transition-all text-slate-900 dark:text-white"
                                            placeholder="E.g. +880 155X-XXXXXX"
                                        />
                                    </div>
                                </div>
                            )}

                            {profile.role === 'admin' && (
                                <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                                    <label className="text-sm font-semibold ml-1">Admin Security Level</label>
                                    <div className="relative">
                                        <Shield className="absolute left-4 top-4 text-slate-400" size={18} />
                                        <input
                                            type="text"
                                            value={profile.adminLevel}
                                            readOnly
                                            disabled
                                            className="w-full p-4 pl-12 rounded-2xl border dark:border-slate-700 bg-slate-100 dark:bg-slate-900/50 outline-none text-slate-400 cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-semibold ml-1">Short Bio</label>
                                <textarea
                                    rows="3"
                                    value={profile.bio}
                                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                    className="w-full p-4 rounded-2xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none focus:ring-2 ring-blue-500 transition-all text-slate-900 dark:text-white"
                                ></textarea>
                            </div>

                            <button type="submit" className="py-3.5 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold flex items-center gap-2 transition-all shadow-md shadow-blue-500/20 cursor-pointer">
                                <Save size={18} /> Save Changes
                            </button>
                        </form>
                    </div>

                    {/* Security / Password Form */}
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-sm">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
                            <Lock className="text-rose-500" size={20} /> Security & Password Management
                        </h2>

                        <form onSubmit={handlePasswordSubmit} className="space-y-6">

                            {/* Current Password */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold ml-1">Current Password</label>
                                <div className="relative flex items-center">
                                    <input
                                        type={showCurrentPassword ? "text" : "password"}
                                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                        className="w-full p-4 pr-12 rounded-2xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none focus:ring-2 ring-rose-500 transition-all text-slate-900 dark:text-white"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                        className="absolute right-4 text-slate-400 hover:text-rose-500 cursor-pointer focus:outline-none"
                                    >
                                        {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* New Password */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold ml-1">New Password</label>
                                    <div className="relative flex items-center">
                                        <input
                                            type={showNewPassword ? "text" : "password"}
                                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                            className="w-full p-4 pr-12 rounded-2xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none focus:ring-2 ring-rose-500 transition-all text-slate-900 dark:text-white"
                                            placeholder="••••••••"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            className="absolute right-4 text-slate-400 hover:text-rose-500 cursor-pointer focus:outline-none"
                                        >
                                            {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold ml-1">Confirm New Password</label>
                                    <div className="relative flex items-center">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                            className="w-full p-4 pr-12 rounded-2xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none focus:ring-2 ring-rose-500 transition-all text-slate-900 dark:text-white"
                                            placeholder="••••••••"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-4 text-slate-400 hover:text-rose-500 cursor-pointer focus:outline-none"
                                        >
                                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="py-3.5 px-6 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-bold flex items-center gap-2 transition-all shadow-md shadow-rose-500/20 cursor-pointer">
                                Update Password
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}