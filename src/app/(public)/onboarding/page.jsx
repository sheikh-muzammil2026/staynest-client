"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
    const router = useRouter();
    const [role, setRole] = useState("");
    const [plan, setPlan] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!role || !plan) {
            alert("Please select both a role and a plan to continue.");
            return;
        }

        setLoading(true);

        try {
            // এখানে আপনার ব্যাকএন্ড API-তে ডাটা পাঠাবেন ইউজারের প্রোফাইল আপডেট করার জন্য
            // উদাহরণ: const response = await fetch('/api/user/update-onboarding', { ... })

            console.log("Submitting Onboarding Data:", { role, plan });

            // সফলভাবে আপডেট হওয়ার পর (আপনাকে নতুন কুকি/টোকেন সেট করতে হতে পারে যেখানে নতুন রোল থাকবে)
            alert("Onboarding complete!");

            // ড্যাশবোর্ডে রিডাইরেক্ট করুন (মিডলওয়্যার তাকে রোলের ড্যাশবোর্ডে নিয়ে যাবে)
            router.push("/dashboard");
            router.refresh();
        } catch (error) {
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#090D16] px-4 py-12 transition-colors duration-300 relative overflow-hidden">
            {/* Decorative Ambient Glows */}
            <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-sky-500/10 dark:bg-sky-500/20 rounded-full blur-[100px] pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-xl bg-white/80 dark:bg-[#131B2E]/50 backdrop-blur-xl p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 shadow-xl"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-black text-slate-950 dark:text-white tracking-tight">Welcome to DwellX!</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Let's personalize your experience. This will only take a moment.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* 1. ROLE SELECTION */}
                    <div>
                        <label className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-3">
                            Step 1: Choose Your Account Type
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Tenant */}
                            <button
                                type="button"
                                onClick={() => setRole("tenant")}
                                className={`p-4 rounded-2xl border text-left transition-all ${role === "tenant"
                                        ? "border-indigo-500 bg-indigo-500/5 dark:bg-indigo-500/10 shadow-sm"
                                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-[#090D16]/30 hover:bg-slate-50"
                                    }`}
                            >
                                <span className={`text-sm font-bold block ${role === "tenant" ? "text-indigo-600 dark:text-indigo-400" : "text-slate-800 dark:text-slate-200"}`}>
                                    I am a Tenant
                                </span>
                                <span className="text-xs text-slate-400 dark:text-slate-500 mt-1 block">
                                    I want to search and rent properties smoothly.
                                </span>
                            </button>

                            {/* Owner */}
                            <button
                                type="button"
                                onClick={() => setRole("owner")}
                                className={`p-4 rounded-2xl border text-left transition-all ${role === "owner"
                                        ? "border-indigo-500 bg-indigo-500/5 dark:bg-indigo-500/10 shadow-sm"
                                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-[#090D16]/30 hover:bg-slate-50"
                                    }`}
                            >
                                <span className={`text-sm font-bold block ${role === "owner" ? "text-indigo-600 dark:text-indigo-400" : "text-slate-800 dark:text-slate-200"}`}>
                                    I am a Property Owner
                                </span>
                                <span className="text-xs text-slate-400 dark:text-slate-500 mt-1 block">
                                    I want to list, sell or rent out my properties.
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* 2. PLAN SELECTION */}
                    <div>
                        <label className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-3">
                            Step 2: Select a Plan
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Free Plan */}
                            <button
                                type="button"
                                onClick={() => setPlan("free")}
                                className={`p-4 rounded-2xl border text-left transition-all ${plan === "free"
                                        ? "border-indigo-500 bg-indigo-500/5 dark:bg-indigo-500/10 shadow-sm"
                                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-[#090D16]/30 hover:bg-slate-50"
                                    }`}
                            >
                                <div className="flex justify-between items-center">
                                    <span className={`text-sm font-bold ${plan === "free" ? "text-indigo-600 dark:text-indigo-400" : "text-slate-800 dark:text-slate-200"}`}>Free Plan</span>
                                    <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full font-bold">Basic</span>
                                </div>
                                <span className="text-xs text-slate-400 dark:text-slate-500 mt-1 block">
                                    Access to standard features with limits. $0/mo.
                                </span>
                            </button>

                            {/* Premium Plan */}
                            <button
                                type="button"
                                onClick={() => setPlan("premium")}
                                className={`p-4 rounded-2xl border text-left transition-all ${plan === "premium"
                                        ? "border-indigo-500 bg-indigo-500/5 dark:bg-indigo-500/10 shadow-sm"
                                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-[#090D16]/30 hover:bg-slate-50"
                                    }`}
                            >
                                <div className="flex justify-between items-center">
                                    <span className={`text-sm font-bold ${plan === "premium" ? "text-indigo-600 dark:text-indigo-400" : "text-slate-800 dark:text-slate-200"}`}>Premium Plan</span>
                                    <span className="text-[10px] bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full font-bold">Popular</span>
                                </div>
                                <span className="text-xs text-slate-400 dark:text-slate-500 mt-1 block">
                                    Unlock all advanced features & tools. $19/mo.
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 mt-4 bg-indigo-600 text-white font-bold text-sm rounded-xl hover:bg-indigo-500 transition shadow-lg shadow-indigo-500/20 disabled:opacity-50"
                    >
                        {loading ? "Saving your preferences..." : "Finish Setup & Enter Dashboard"}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}