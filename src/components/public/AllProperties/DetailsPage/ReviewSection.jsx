"use client";
import { getReviws, submitReview } from "@/lib/api/reviews";
import React, { useEffect, useState } from "react";

export default function ReviewSection({ propertyId, currentUser }) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false)
    const [reviews, setReviews] = useState([]);


    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true)
            const data = await getReviws()
            setReviews(data)
            setLoading(false)
        }
        fetchReviews()
    }, [])

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim()) return;


        const newReview = {
            name: currentUser.name,
            email: currentUser.email,
            date: new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }),
            rating: Number(rating),
            comment: comment
        };

        const result = await submitReview(newReview);
        if (result) {
            setReviews([newReview, ...reviews]);
            setComment("");
            setRating(5);
            alert("Review submitted successfully!");
        }

    };

    return (
        <div className="max-w-4xl bg-white dark:bg-[#131B2E]/40 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-3xl space-y-8">
            <h2 className="text-lg font-bold tracking-tight">Reviews & Ratings</h2>

            {/* Write a Review Form */}
            <form onSubmit={handleReviewSubmit} className="space-y-4 bg-slate-50 dark:bg-[#090D16]/40 p-4 sm:p-6 rounded-2xl border border-slate-100 dark:border-slate-800/40">
                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">Share your experience</h3>

                <div className="flex items-center gap-4">
                    <label className="text-xs font-semibold text-slate-400">Your Rating:</label>
                    <select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="px-3 py-1.5 text-xs font-bold rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none"
                    >
                        <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                        <option value="4">⭐⭐⭐⭐ (4/5)</option>
                        <option value="3">⭐⭐⭐ (3/5)</option>
                        <option value="2">⭐⭐ (2/5)</option>
                        <option value="1">⭐ (1/5)</option>
                    </select>
                </div>

                <div className="space-y-1.5">
                    <textarea
                        required
                        rows="3"
                        placeholder="Write your detailed review here..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 text-sm border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none"
                    />
                </div>

                <button type="submit" className="px-5 py-2.5 bg-slate-950 dark:bg-indigo-600 text-white font-bold text-xs rounded-xl hover:opacity-90 transition">
                    Submit Review
                </button>
            </form>

            {/* Display Reviews List */}
            <div className="space-y-4 divide-y divide-slate-100 dark:divide-slate-800/60">
                {reviews.map((rev, index) => (
                    <div key={index} className={`pt-4 ${index === 0 ? "pt-0" : ""}`}>
                        <div className="flex justify-between items-start gap-4">
                            <div>
                                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{rev.name}</h4>
                                <p className="text-[10px] text-slate-400">{rev.email} • {rev.date}</p>
                            </div>
                            <div className="text-amber-500 text-xs">
                                {"⭐".repeat(rev.rating)}
                            </div>
                        </div>
                        <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                            {rev.comment}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}