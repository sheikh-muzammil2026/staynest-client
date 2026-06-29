"use client";
import React, { useState } from 'react';
import { Image as ImageIcon, PlusCircle, Loader2 } from 'lucide-react';
import { addProperty } from '@/lib/api/properties'; 
import { toast } from 'react-toastify';
import { authClient } from '@/lib/auth-client';

/**
 * @file AddProperty.jsx
 * @description Component for property owners to list new real estate assets on StayNest.
 * Includes role validation, dynamic image handling, and multi-field data structures.
 */

export default function AddProperty() {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const userEmail = user?.email;

    const [formData, setFormData] = useState({
        propertyTitle: '',
        description: '',
        location: '',
        propertyType: 'Apartment',
        rent: '',
        rentType: 'Monthly',
        bedrooms: '',
        bathrooms: '',
        propertySize: '',
        amenities: '',
        images: '', 
        extraFeatures: ''
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    /**
     * Form submission handler to sanitize and dispatch property data.
     * @param {React.FormEvent<HTMLFormElement>} e - Submission event
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        if (!userEmail) {
            toast.error("Please log in first to add a property.");
            setLoading(false);
            return;
        }

        const amenitiesArray = formData.amenities
            ? formData.amenities.split(',').map(item => item.trim())
            : [];

        const imagesArray = formData.images
            ? formData.images.split(',').map(item => item.trim())
            : ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"]; 

        const propertyData = {
            propertyTitle: formData.propertyTitle,
            description: formData.description,
            location: formData.location,
            propertyType: formData.propertyType,
            rent: Number(formData.rent),
            rentType: formData.rentType,
            bedrooms: Number(formData.bedrooms),
            bathrooms: Number(formData.bathrooms),
            propertySize: `${formData.propertySize} sqft`,
            amenities: amenitiesArray,
            images: imagesArray, 
            extraFeatures: formData.extraFeatures,
            status: 'Pending',
            ownerInformation: {
                name: user?.name || "Unknown Owner",
                email: user?.email,
                phone: user?.phone || "+8801XXXXXXXXX"
            }
        };

        try {
            const submitedData = await addProperty(propertyData);

            if (submitedData && submitedData.insertedId) {
                toast.success("Added your property successfully");
                setMessage({ type: 'success', text: 'Property listed successfully!' });

                setFormData({
                    propertyTitle: '',
                    description: '',
                    location: '',
                    propertyType: 'Apartment',
                    rent: '',
                    rentType: 'Monthly',
                    bedrooms: '',
                    bathrooms: '',
                    propertySize: '',
                    amenities: '',
                    images: '', 
                    extraFeatures: ''
                });

                e.target.reset();
            } else {
                throw new Error("Failed to insert property in database.");
            }

        } catch (error) {
            setMessage({ type: 'error', text: error.message || 'Failed to connect to the server.' });
            toast.error(error.message || 'Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-700">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold">Add New Property</h2>
                    <p className="text-slate-500 dark:text-slate-400">Provide accurate details to list your property on StayNest.</p>
                </div>

                {message.text && (
                    <div className={`p-4 mb-6 rounded-2xl text-sm font-semibold transition-all animate-in fade-in duration-300 ${message.type === 'success'
                        ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-600 border border-rose-500/20'
                        }`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold ml-1">Property Title</label>
                            <input
                                type="text"
                                value={formData.propertyTitle}
                                onChange={(e) => setFormData({ ...formData, propertyTitle: e.target.value })}
                                className="w-full p-4 rounded-2xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none focus:ring-2 ring-blue-500 transition-all text-slate-900 dark:text-white"
                                placeholder="E.g. Sublet Executive Master Room with Balcony"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold ml-1">Property Type</label>
                            <select
                                value={formData.propertyType}
                                onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                                className="w-full p-4 rounded-2xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none text-slate-900 dark:text-white focus:ring-2 ring-blue-500"
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
                            value={formData.description}
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
                                value={formData.rent}
                                onChange={(e) => setFormData({ ...formData, rent: e.target.value })}
                                className="w-full p-4 rounded-2xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none text-slate-900 dark:text-white focus:ring-2 ring-blue-500"
                                placeholder="৳ 0.00"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold ml-1">Rent Type</label>
                            <select
                                value={formData.rentType}
                                onChange={(e) => setFormData({ ...formData, rentType: e.target.value })}
                                className="w-full p-4 rounded-2xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none text-slate-900 dark:text-white focus:ring-2 ring-blue-500"
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
                                value={formData.propertySize}
                                onChange={(e) => setFormData({ ...formData, propertySize: e.target.value })}
                                className="w-full p-4 rounded-2xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none text-slate-900 dark:text-white focus:ring-2 ring-blue-500"
                                placeholder="400"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold ml-1">Location</label>
                            <input
                                type="text"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                className="w-full p-4 rounded-2xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none text-slate-900 dark:text-white focus:ring-2 ring-blue-500"
                                placeholder="Paltan, Dhaka"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold ml-1">Bedrooms</label>
                            <input
                                type="number"
                                value={formData.bedrooms}
                                onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                                className="w-full p-4 rounded-2xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none text-slate-900 dark:text-white focus:ring-2 ring-blue-500"
                                placeholder="1"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold ml-1">Bathrooms</label>
                            <input
                                type="number"
                                value={formData.bathrooms}
                                onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                                className="w-full p-4 rounded-2xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none text-slate-900 dark:text-white focus:ring-2 ring-blue-500"
                                placeholder="1"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold ml-1">Amenities</label>
                            <input
                                type="text"
                                value={formData.amenities}
                                onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                                className="w-full p-4 rounded-2xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none text-slate-900 dark:text-white focus:ring-2 ring-blue-500"
                                placeholder="Lift Support, WiFi Service, Maid Service Shareable"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold ml-1">Extra Features</label>
                            <input
                                type="text"
                                value={formData.extraFeatures}
                                onChange={(e) => setFormData({ ...formData, extraFeatures: e.target.value })}
                                className="w-full p-4 rounded-2xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none text-slate-900 dark:text-white focus:ring-2 ring-blue-500"
                                placeholder="Walking distance to Bangladesh Secretariat"
                            />
                        </div>
                    </div>

                    <div className="p-4 bg-slate-100 dark:bg-slate-900/60 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 space-y-2">
                        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">Owner Profile Information</h4>
                        {userEmail ? (
                            <div className="grid md:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-400">
                                <p><strong>Name:</strong> {user?.name || "N/A"}</p>
                                <p><strong>Email:</strong> {userEmail}</p>
                                <p><strong>Phone:</strong> {user?.phone || "Not Provided"}</p>
                            </div>
                        ) : (
                            <p className="text-xs text-rose-500 font-medium">You are not logged in. Please log in to publish property.</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold ml-1">Property Image URLs</label>
                        <div className="relative flex items-center">
                            <div className="absolute left-4 text-slate-400">
                                <ImageIcon size={20} />
                            </div>
                            <input
                                type="text"
                                value={formData.images}
                                onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none text-slate-900 dark:text-white focus:ring-2 ring-blue-500 transition-all text-sm"
                                placeholder="https://link1.com, https://link2.com (Separate multiple links with commas)"
                                required
                            />
                        </div>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 ml-1">You can use direct image links from ImgBB, Unsplash, etc.</p>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !userEmail}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={20} /> Processing...
                            </>
                        ) : (
                            <>
                                <PlusCircle size={20} /> Publish Property
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
            }
                            
