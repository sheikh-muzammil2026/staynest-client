"use client";
import React, { useState } from 'react';
import { Upload, PlusCircle } from 'lucide-react';

export default function AddProperty() {
    const [formData, setFormData] = useState({
        title: '', description: '', location: '', type: 'Apartment',
        rent: '', rentType: 'Monthly', bedrooms: '', bathrooms: '',
        size: '', amenities: '', extraFeatures: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting property:", { ...formData, status: 'Pending' });
    };

    return (
        <div className="p-4 md:p-8 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-700">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold">Add New Property</h2>
                    <p className="text-slate-500 dark:text-slate-400">Provide accurate details to list your property on StayNest.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold ml-1">Property Title</label>
                            <input
                                type="text"
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full p-4 rounded-2xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none focus:ring-2 ring-blue-500 transition-all text-slate-900 dark:text-white"
                                placeholder="E.g. Blue Horizon Luxury Villa"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold ml-1">Property Type</label>
                            <select
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                className="w-full p-4 rounded-2xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none text-slate-900 dark:text-white"
                            >
                                <option value="Apartment">Apartment</option>
                                <option value="Villa">Villa</option>
                                <option value="Studio">Studio</option>
                                <option value="Duplex">Duplex</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold ml-1">Description</label>
                        <textarea
                            rows="4"
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full p-4 rounded-2xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none focus:ring-2 ring-blue-500 transition-all text-slate-900 dark:text-white"
                            placeholder="Write a detailed description about your property..."
                        ></textarea>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold ml-1">Rent (Price)</label>
                            <input
                                type="number"
                                onChange={(e) => setFormData({ ...formData, rent: e.target.value })}
                                className="w-full p-4 rounded-2xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none text-slate-900 dark:text-white"
                                placeholder="$ 0.00"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold ml-1">Rent Type</label>
                            <select
                                onChange={(e) => setFormData({ ...formData, rentType: e.target.value })}
                                className="w-full p-4 rounded-2xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none text-slate-900 dark:text-white"
                            >
                                <option value="Monthly">Monthly</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Daily">Daily</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold ml-1">Property Size (sqft)</label>
                            <input
                                type="number"
                                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                                className="w-full p-4 rounded-2xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none text-slate-900 dark:text-white"
                                placeholder="1200"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold ml-1">Location</label>
                            <input
                                type="text"
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                className="w-full p-4 rounded-2xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none text-slate-900 dark:text-white"
                                placeholder="City, State"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold ml-1">Bedrooms</label>
                            <input
                                type="number"
                                onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                                className="w-full p-4 rounded-2xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none text-slate-900 dark:text-white"
                                placeholder="0"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold ml-1">Bathrooms</label>
                            <input
                                type="number"
                                onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                                className="w-full p-4 rounded-2xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none text-slate-900 dark:text-white"
                                placeholder="0"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold ml-1">Amenities</label>
                            <input
                                type="text"
                                onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                                className="w-full p-4 rounded-2xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none text-slate-900 dark:text-white"
                                placeholder="WiFi, AC, Parking (Separate with commas)"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold ml-1">Extra Features</label>
                            <input
                                type="text"
                                onChange={(e) => setFormData({ ...formData, extraFeatures: e.target.value })}
                                className="w-full p-4 rounded-2xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none text-slate-900 dark:text-white"
                                placeholder="E.g. Ocean View, Elevator Backup"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold ml-1">Upload Images</label>
                        <div className="h-40 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-3xl flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 cursor-pointer hover:border-blue-500 transition-all">
                            <Upload className="text-slate-400 mb-2" />
                            <span className="text-slate-500 text-sm">Click to upload images</span>
                        </div>
                    </div>

                    <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all">
                        <PlusCircle size={20} /> Publish Property
                    </button>
                </form>
            </div>
        </div>
    );
}