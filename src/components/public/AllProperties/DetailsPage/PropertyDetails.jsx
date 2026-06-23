"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ReviewSection from "./ReviewSection";
import { authClient } from "@/lib/auth-client";
import BookingModal from "./bookingModal";
import { checkFavorite, removeFromFavorite, submitFavorites } from "@/lib/api/favorites";
import { toast } from "react-toastify";

export default function PropertyDetails({ property }) {
    const [loading, setLoading] = useState(false);
    const [favoriteLoading, setFavoriteLoading] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [favoriteId, setFavoriteId] = useState(null);
    const [isBookingOpen, setIsBookingOpen] = useState(false);


    const [isCheckingFavorite, setIsCheckingFavorite] = useState(true);

    const [mainImage, setMainImage] = useState(
        property?.images?.[0] || "https://placehold.co/600x400.png?text=No+Image"
    );

    const { data: session } = authClient.useSession();
    const currentUser = session?.user;


    useEffect(() => {
        const checkFavId = async () => {
            if (!currentUser?.email || !property?._id) {
                setIsCheckingFavorite(false);
                return;
            }

            try {
                setIsCheckingFavorite(true);
                const data = await checkFavorite(currentUser.email, property._id);

                if (data && data.isFavorite) {
                    setFavoriteId(data.favoriteId);
                    setIsFavorite(true);
                } else {
                    setIsFavorite(false);
                    setFavoriteId(null);
                }
            } catch (error) {
                console.error("Error checking favorite:", error);
            } finally {
                setIsCheckingFavorite(false);
            }
        };

        checkFavId();
    }, [currentUser?.email, property?._id]);

    const handleAddToFavorite = async () => {
        if (!currentUser?.email) {
            toast.error("Please login first to add favorites!");
            return;
        }

        try {
            setFavoriteLoading(true);

            if (!isFavorite) {
                const favoritesPayload = {
                    propertyTitle: property?.propertyTitle,
                    propertyId: property?._id,
                    rent: property?.rent,
                    location: property?.location,
                    tenantEmail: currentUser?.email,
                    status: "Pending"
                };

                const result = await submitFavorites(favoritesPayload);
                console.log(result, "result after added favorites");


                const insertedId = result?.insertedId || result?._id || result?.data?.insertedId || result?.data?._id;

                if (insertedId) {
                    setFavoriteId(insertedId);
                    setIsFavorite(true);
                    toast.success("Added to favorites list!");
                } else {

                    const checkData = await checkFavorite(currentUser.email, property._id);
                    if (checkData && checkData.isFavorite) {
                        setFavoriteId(checkData.favoriteId);
                        setIsFavorite(true);
                        toast.success("Added to favorites list!");
                    } else {
                        toast.error("Failed to sync favorite ID. Please refresh.");
                    }
                }
            } else {
                if (!favoriteId) {
                    toast.error("Favorite ID not found. Please refresh.");
                    return;
                }

                const result = await removeFromFavorite(favoriteId, currentUser?.email);

                if (result && (result.deletedCount > 0 || result.success)) {
                    setFavoriteId(null);
                    setIsFavorite(false);
                    toast.success("Removed from favorites");
                } else {
                    toast.error("Property already removed or not found.");
                }
            }
        } catch (error) {
            console.error("Favorite error:", error);
            toast.error("Something went wrong!");
        } finally {
            setFavoriteLoading(false);
        }
    };

    if (loading) return <div className="text-center py-24 dark:text-white">Loading details...</div>;
    if (!property) return <div className="text-center py-24 dark:text-white">Property not found.</div>;

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#090D16] text-slate-950 dark:text-white px-4 sm:px-6 lg:px-8 py-24 transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* ১. টপ হেডার ব্যাজ সেকশন */}
                <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                    <div className="flex items-center gap-3">
                        <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50">
                            {property.propertyType || "Property"}
                        </span>
                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${property.status?.toLowerCase() === "approved"
                            ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-100"
                            : "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-100/50"
                            }`}>
                            {property.status || "Pending"} Listing
                        </span>
                    </div>
                    <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                        ID: <span className="font-mono text-xs">{property._id}</span>
                    </div>
                </div>

                {/* ২. মেইন লেআউট গ্রিড আর্কিটেকচার */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* বাম কলাম */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="space-y-4">
                            <div className="relative h-[300px] sm:h-[450px] w-full rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/70 shadow-sm">
                                <Image
                                    fill
                                    priority
                                    src={mainImage}
                                    alt={property.propertyTitle || "Property Image"}
                                    sizes="(max-w-1200px) 100vw, 80vw"
                                    className="w-full h-full object-cover object-center transition-all duration-500"
                                />
                            </div>

                            {property.images && property.images.length > 1 && (
                                <div className="flex gap-4 overflow-x-auto pb-2">
                                    {property.images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setMainImage(img)}
                                            className={`relative h-20 w-28 rounded-xl overflow-hidden flex-shrink-0 transition-all ${mainImage === img
                                                ? "ring-2 ring-indigo-500 scale-95"
                                                : "opacity-70 hover:opacity-100"
                                                }`}
                                        >
                                            <Image fill src={img} alt="thumbnail" className="object-cover" sizes="120px" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="bg-white/80 dark:bg-[#131B2E]/40 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/70 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
                            <div>
                                <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                                    {property.propertyTitle}
                                </h1>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1.5">
                                    📍 {property.location}
                                </p>
                            </div>

                            <div className="grid grid-cols-3 gap-4 py-6 my-2 border-y border-slate-100 dark:border-slate-800/60 text-center">
                                <div className="p-3 bg-slate-50 dark:bg-[#090D16]/40 rounded-2xl">
                                    <span className="block text-lg sm:text-xl font-black text-indigo-600 dark:text-indigo-400">🛏️ {property.bedrooms || 0}</span>
                                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Bedrooms</span>
                                </div>
                                <div className="p-3 bg-slate-50 dark:bg-[#090D16]/40 rounded-2xl">
                                    <span className="block text-lg sm:text-xl font-black text-indigo-600 dark:text-indigo-400">🚿 {property.bathrooms || 0}</span>
                                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Bathrooms</span>
                                </div>
                                <div className="p-3 bg-slate-50 dark:bg-[#090D16]/40 rounded-2xl">
                                    <span className="block text-lg sm:text-xl font-black text-indigo-600 dark:text-indigo-400">📐</span>
                                    <span className="text-[11px] sm:text-xs font-bold block">{property.propertySize}</span>
                                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Size</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-lg font-bold tracking-tight">Overview</h3>
                                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                                    {property.description}
                                </p>
                            </div>

                            {property.amenities && property.amenities.length > 0 && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold tracking-tight">Amenities</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {property.amenities.map((item, index) => (
                                            <div key={index} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                                <span className="text-emerald-500 font-bold">✓</span>
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {property.extraFeatures && (
                                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/60 space-y-2">
                                    <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Premium Features</h3>
                                    <p className="text-sm font-medium italic text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/20 p-4 rounded-2xl border border-indigo-100/30 dark:border-indigo-900/20">
                                        ✨ {property.extraFeatures}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ডান কলাম: প্রাইস কার্ড এবং অ্যাকশন বাটন */}
                    <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                        <div className="bg-white/80 dark:bg-[#131B2E]/40 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/70 p-6 rounded-3xl shadow-sm text-center lg:text-left space-y-4">
                            <div>
                                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">Rent Price</span>
                                <div className="mt-1 flex items-baseline justify-center lg:justify-start gap-1">
                                    <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">${property.rent?.toLocaleString()}</span>
                                    <span className="text-sm text-slate-400 font-semibold">/{property.rentType}</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 pt-2">
                                {/* 🟢 ফেভারিট বাটন উইথ সেফটি স্টেট */}
                                <button
                                    onClick={handleAddToFavorite}
                                    disabled={favoriteLoading || isCheckingFavorite}
                                    className={`w-full py-3.5 rounded-xl font-bold text-xs border transition-all flex items-center justify-center gap-2 ${isCheckingFavorite
                                        ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 border-slate-200 dark:border-slate-700 cursor-wait"
                                        : isFavorite
                                            ? "bg-rose-50 dark:bg-rose-950/20 text-rose-500 border-rose-200 dark:border-rose-900/50 hover:bg-rose-100/50"
                                            : "bg-transparent text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900"
                                        } ${favoriteLoading ? "opacity-60 cursor-not-allowed" : ""}`}
                                >
                                    {isCheckingFavorite ? (
                                        "🔄 Checking status..."
                                    ) : favoriteLoading ? (
                                        "⏳ Processing..."
                                    ) : isFavorite ? (
                                        "❤️ Saved in Favorites"
                                    ) : (
                                        "🤍 Add to Favorites"
                                    )}
                                </button>

                                <button
                                    onClick={() => setIsBookingOpen(true)}
                                    className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 transition-all active:scale-[0.98]"
                                >
                                    ⚡ Book Property
                                </button>
                            </div>
                        </div>

                        {property.ownerInformation && (
                            <div className="bg-white/80 dark:bg-[#131B2E]/40 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/70 p-6 rounded-3xl shadow-sm space-y-4">
                                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">Owner Contact</span>
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-indigo-600/10 dark:bg-indigo-400/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
                                        {property.ownerInformation.name?.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm">{property.ownerInformation.name}</h4>
                                        <span className="text-[10px] text-emerald-500 font-medium">🟢 Verified Agent</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <ReviewSection
                    propertyId={property._id}
                    currentUser={currentUser?.role === "tenant" ? currentUser : null}
                />

                {isBookingOpen && (
                    <BookingModal
                        property={property}
                        currentUser={currentUser}
                        onClose={() => setIsBookingOpen(false)}
                    />
                )}
            </div>
        </div>
    );
}