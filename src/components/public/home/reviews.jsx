"use client";
import React, { useEffect, useState } from "react";
import { Avatar, Card } from "@heroui/react";
import { motion } from "framer-motion";
import { getPublicReviews } from "@/lib/api/reviews";

export default function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            const data = await getPublicReviews();
            setReviews(data || []);
            setLoading(false);
        };
        fetchReviews();
    }, []);


    const duplicatedReviews = [...reviews, ...reviews];


    if (loading) {
        return (
            <div className="py-24 text-center text-xs text-slate-400 dark:text-slate-500 font-medium bg-[#F8FAFC] dark:bg-[#090D16]">
                ⏳ Loading trusted reviews...
            </div>
        );
    }


    if (reviews.length === 0) {
        return null; // অথবা কোনো ডিফল্ট মেসেজ দেখাতে পারেন
    }

    return (
        <section className="py-24 bg-[#F8FAFC] dark:bg-[#090D16] overflow-hidden w-full transition-colors duration-300">

            {/* সেকশন হেডার */}
            <div className="max-w-2xl mx-auto px-4 text-center mb-16">
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                    Testimonials
                </span>
                <h2 className="text-3xl font-black text-slate-950 dark:text-white tracking-tight mt-1">
                    Trusted By Modern Tenants
                </h2>
            </div>

            {/* ইনফিনিট মার্কি কন্টেইনার */}
            <div className="relative flex w-full overflow-x-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">

                <motion.div
                    className="flex gap-6 whitespace-nowrap min-w-full py-4 px-2"

                    animate={{
                        x: ["0%", "-50%"],
                    }}
                    transition={{
                        ease: "linear",
                        duration: 25,
                        repeat: Infinity,
                    }}
                >
                    {duplicatedReviews.map((review, index) => (
                        <Card
                            key={index}
                            className="bg-white/80 dark:bg-[#131B2E]/40 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/70 w-[300px] sm:w-[400px] flex-shrink-0 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            <div className="p-6 whitespace-normal flex flex-col justify-between h-full space-y-6">

                                {/* রিভিউ টেক্সট */}
                                <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
                                    "{review.comment}"
                                </p>

                                {/* ইউজার বায়ো */}
                                <div className="flex items-center gap-3 text-left">
                                    <Avatar

                                        src={review.avatar || `https://i.pravatar.cc/150?u=${review._id}`}
                                        className="border-2 border-indigo-500/30 w-10 h-10 rounded-xl"
                                    />
                                    <div className="flex flex-col">
                                        <h4 className="text-xs font-bold text-slate-950 dark:text-white">
                                            {review.name}
                                        </h4>
                                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-0.5">
                                            {review.role || `Verified Tenant`}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </Card>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}