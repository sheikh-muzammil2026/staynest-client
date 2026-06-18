"use client";
import React from "react";
import { Avatar, Card } from "@heroui/react";
import { motion } from "framer-motion";

// ৪টি রিয়ালিস্টিক টেন্যান্ট রিভিউ ডাটা
const reviews = [
    {
        name: "Liam Sterling",
        role: "Tenant since 2024",
        comment: "Securing an apartment through StayNest was completely hands-free. The instant lease generation saved me days of paperwork.",
        avatar: "https://i.pravatar.cc/150?u=a042581f2e29026024d"
    },
    {
        name: "Aria Montgomery",
        role: "Verified Tenant",
        comment: "Stripe payments are instantaneous. I loved how transparent the platform is regarding owner moderation. Safe experience!",
        avatar: "https://i.pravatar.cc/150?u=a042581f2e29026704d"
    },
    {
        name: "Marcus Vance",
        role: "Studio Renter",
        comment: "What blew me away was the UI cleanliness. No spam listings, no fake pictures. Highly recommend StayNest for busy pros.",
        avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d"
    },
    {
        name: "Elena Rostova",
        role: "Loft Tenant",
        comment: "The support team helped me coordinate my move-in seamlessly. Direct dashboard routing to private owner chats is a game-changer.",
        avatar: "https://i.pravatar.cc/150?u=a04258114e29026708d"
    }
];

export default function Reviews() {
    // ইনফিনিট লুপ ট্রিক: অ্যানিমেশন সিমলেস রাখার জন্য ডাটা ডাবল করা হলো
    const duplicatedReviews = [...reviews, ...reviews];

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
                    // ডান থেকে বামে নিরবচ্ছিন্ন লুপ অ্যানিমেশন
                    animate={{
                        x: ["0%", "-50%"],
                    }}
                    transition={{
                        ease: "linear",
                        duration: 25, // গতি পরিবর্তন করতে চাইলে এখানে সেকেন্ড বাড়াতে/কমাতে পারেন
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

                                {/* ইউজার বায়ো */}
                                <div className="flex items-center gap-3 text-left">
                                    <Avatar
                                        src={review.avatar}
                                        className="border-2 border-indigo-500/30 w-10 h-10 rounded-xl"
                                    />
                                    <div className="flex flex-col">
                                        <h4 className="text-xs font-bold text-slate-950 dark:text-white">
                                            {review.name}
                                        </h4>
                                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-0.5">
                                            {review.role}
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