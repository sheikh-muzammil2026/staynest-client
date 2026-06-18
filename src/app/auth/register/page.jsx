"use client";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {

    const [showPassword, setShowPassword] = useState(false);

    const [role, setRole] = useState("tenant");

    const handleRegister = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const Registreddata = Object.fromEntries(formData.entries());

        Registreddata.role = role;
        console.log("Registered Data:", Registreddata);

        const { data, error } = await authClient.signUp.email({
            email: Registreddata.email,
            password: Registreddata.password,
            name: Registreddata.name,
            image: Registreddata.image,
            role: Registreddata.role
        }, {
            onSuccess: (ctx) => {
                alert("Register successful!");
            },
            onError: (ctx) => {
                alert(ctx.error.message);
            },
        });
    };

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
                <form onSubmit={handleRegister} className="space-y-4">

                    {/* UNIQUE ROLE SELECTION */}
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-2">I want to join as a</label>
                        <div className="grid grid-cols-2 gap-3 relative">

                            {/* Tenant Button */}
                            <button
                                type="button"
                                onClick={() => setRole("tenant")}
                                className={`relative p-3 rounded-xl border text-left transition-all overflow-hidden ${role === "tenant"
                                    ? "border-indigo-500 bg-indigo-500/5 dark:bg-indigo-500/10 shadow-sm"
                                    : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#090D16]/50 hover:bg-slate-100/50"
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className={`text-xs font-bold ${role === "tenant" ? "text-indigo-600 dark:text-indigo-400" : "text-slate-700 dark:text-slate-300"}`}>Tenant</span>
                                    {role === "tenant" && (
                                        <motion.div layoutId="activeCheck" className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                                    )}
                                </div>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">Looking for a perfect place to live.</p>
                            </button>

                            {/* Owner Button */}
                            <button
                                type="button"
                                onClick={() => setRole("owner")}
                                className={`relative p-3 rounded-xl border text-left transition-all overflow-hidden ${role === "owner"
                                    ? "border-indigo-500 bg-indigo-500/5 dark:bg-indigo-500/10 shadow-sm"
                                    : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#090D16]/50 hover:bg-slate-100/50"
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className={`text-xs font-bold ${role === "owner" ? "text-indigo-600 dark:text-indigo-400" : "text-slate-700 dark:text-slate-300"}`}>Property Owner</span>
                                    {role === "owner" && (
                                        <motion.div layoutId="activeCheck" className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                                    )}
                                </div>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">Rent out or sell my property easily.</p>
                            </button>

                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1.5">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="John Doe"
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#090D16] text-sm text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500/50 transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1.5">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="john@example.com"
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#090D16] text-sm text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500/50 transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1.5">Profile Photo URL</label>
                        <input
                            type="url"
                            name="image"
                            placeholder="https://imgbb.com/your-photo-link"
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#090D16] text-sm text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500/50 transition"
                            required
                        />
                    </div>

                    {/* PASSWORD FIELD WITH EYE ICON */}
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1.5">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Minimum 6 characters"
                                className="w-full pl-4 pr-11 py-2.5 rounded-xl bg-slate-50 dark:bg-[#090D16] text-sm text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500/50 transition"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition"
                            >
                                {showPassword ? (
                                    // Eye Off SVG Icon
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                ) : (
                                    // Eye ON SVG Icon
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3.5 mt-2 bg-indigo-600 text-white font-bold text-sm rounded-xl hover:bg-indigo-500 transition shadow-lg shadow-indigo-500/20"
                    >
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