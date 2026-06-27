"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

/**
 * @typedef {Object} LoginFormData
 * @property {string} email
 * @property {string} password
 */

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        const formData = new FormData(e.currentTarget);
        const loggedData = Object.fromEntries(formData.entries());
        
        try {
            setIsSubmitting(true);
            
            const { data, error } = await authClient.signIn.email({
                email: loggedData.email,
                password: loggedData.password
            });

            if (data && !error) {
                toast.success("Welcome back! Login successful.");
                router.push('/');
            }
            if (error) {
                toast.error(error.message || "Invalid credentials. Please try again.");
            }
        } catch (err) {
            console.error("Authentication lifecycle crash:", err);
            toast.error("An unexpected error occurred during sign-in.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (err) {
            console.error("OAuth flow provider error:", err);
            toast.error("Google authentication failed.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#090D16] px-4 py-24 transition-colors duration-300 relative overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-sky-500/10 dark:bg-sky-500/20 rounded-full blur-[100px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white/80 dark:bg-[#131B2E]/50 backdrop-blur-xl p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 shadow-xl shadow-slate-100 dark:shadow-none"
            >
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 mb-4 cursor-pointer">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-sky-400 flex items-center justify-center text-white font-black">
                            S
                        </div>
                        <span className="text-lg font-black tracking-tight text-slate-950 dark:text-white">StayNest</span>
                    </Link>
                    <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">Welcome Back</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Enter your credentials to access your dashboard</p>
                </div>

                <form onSubmit={handleOnSubmit} className="space-y-5">
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1.5">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="name@example.com"
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#090D16] text-sm text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500/50 transition"
                            required
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-1.5">
                            <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Password</label>
                            <a href="#" className="text-[11px] text-indigo-500 hover:underline cursor-pointer">Forgot?</a>
                        </div>

                        <div className="relative flex items-center">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="••••••••"
                                className="w-full px-4 pr-12 py-3 rounded-xl bg-slate-50 dark:bg-[#090D16] text-sm text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500/50 transition"
                                required
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 text-slate-400 dark:text-slate-500 hover:text-indigo-500 dark:hover:text-indigo-400 cursor-pointer focus:outline-none transition-colors"
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full py-3.5 bg-indigo-600 text-white font-bold text-sm rounded-xl hover:bg-indigo-500 transition shadow-lg shadow-indigo-500/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                        {isSubmitting ? "Signing In..." : "Sign In with Password"}
                    </button>
                </form>

                <div className="relative flex py-5 items-center">
                    <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
                    <span className="flex-shrink mx-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Or continue with</span>
                    <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
                </div>

                <button
                    onClick={handleGoogleLogin}
                    type="button"
                    className="w-full py-3 px-4 bg-white dark:bg-[#090D16] text-slate-700 dark:text-slate-300 font-semibold text-sm rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition flex items-center justify-center gap-2.5 cursor-pointer"
                >
                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                        <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.107C18.416 1.421 15.586 0 12.24 0 5.48 0 0 5.48 0 12.24s5.48 12.24 12.24 12.24c7.05 0 11.732-4.934 11.732-11.94 0-.802-.086-1.414-.188-1.955h-11.545z" />
                    </svg>
                    Google (Sign in as Tenant)
                </button>

                <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-6">
                    Do not have an account? <Link href="/auth/register" className="text-indigo-500 font-semibold hover:underline cursor-pointer">Create an account</Link>
                </p>
            </motion.div>
        </div>
    );
}
