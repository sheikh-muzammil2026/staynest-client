"use client";
import { motion } from "framer-motion";
import Link from "next/link";



export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#090D16] px-4 py-24 transition-colors duration-300 relative overflow-hidden">
            {/* Decorative Ambient Glows */}
            <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-sky-500/10 dark:bg-sky-500/20 rounded-full blur-[100px] pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white/80 dark:bg-[#131B2E]/50 backdrop-blur-xl p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 shadow-xl shadow-slate-100 dark:shadow-none"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-sky-400 flex items-center justify-center text-white font-black">
                            D
                        </div>
                        <span className="text-lg font-black tracking-tight text-slate-950 dark:text-white">DwellX</span>
                    </Link>
                    <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">Create Account</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Join our marketplace as a new verified user</p>
                </div>

                {/* Form */}
                <form className="space-y-4">
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1.5">Full Name</label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#090D16] text-sm text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500/50 transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1.5">Email Address</label>
                        <input
                            type="email"
                            placeholder="john@example.com"
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#090D16] text-sm text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500/50 transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1.5">Profile Photo URL</label>
                        <input
                            type="url"
                            placeholder="https://imgbb.com/your-photo-link"
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#090D16] text-sm text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500/50 transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1.5">Password</label>
                        <input
                            type="password"
                            placeholder="Minimum 6 characters"
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#090D16] text-sm text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500/50 transition"
                            required
                        />
                    </div>

                    <button type="submit" className="w-full py-3.5 mt-2 bg-indigo-600 text-white font-bold text-sm rounded-xl hover:bg-indigo-500 transition shadow-lg shadow-indigo-500/20">
                        Create Account
                    </button>
                </form>

                {/* Redirect */}
                <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-6">
                    Already have an account? <Link href="/auth/login" className="text-indigo-500 font-semibold hover:underline">Sign In</Link>
                </p>
            </motion.div>
        </div>
    );
}