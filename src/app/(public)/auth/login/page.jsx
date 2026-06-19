"use client";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {

    const router = useRouter()

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const loggedData = Object.fromEntries(formData.entries())
        const { data, error } = await authClient.signIn.email({
            email: loggedData.email,
            password: loggedData.password
        })

        if (data && !error) {
            alert("login successfull")
            router.push('/')
        }
        if (error) {
            alert(error.message)
        }

    }

    const handleGoogleLogin = () => {

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#090D16] px-4 py-24 transition-colors duration-300 relative overflow-hidden">
            {/* Decorative Ambient Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-sky-500/10 dark:bg-sky-500/20 rounded-full blur-[100px] pointer-events-none"></div>

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
                    <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">Welcome Back</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Enter your credentials to access your dashboard</p>
                </div>

                {/* Form */}
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
                            <a href="#" className="text-[11px] text-indigo-500 hover:underline">Forgot?</a>
                        </div>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#090D16] text-sm text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500/50 transition"
                            required
                        />
                    </div>

                    <button type="submit" className="w-full py-3.5 bg-indigo-600 text-white font-bold text-sm rounded-xl hover:bg-indigo-500 transition shadow-lg shadow-indigo-500/20">
                        Sign In with Password
                    </button>
                </form>

                {/* Divider */}
                <div className="relative flex py-5 items-center">
                    <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                    <span className="flex-shrink mx-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Or continue with</span>
                    <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                </div>

                {/* Social Login Button (Tenant Default Hint) */}
                <button
                    onClick={handleGoogleLogin}
                    type="button"
                    className="w-full py-3 px-4 bg-white dark:bg-[#090D16] text-slate-700 dark:text-slate-300 font-semibold text-sm rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition flex items-center justify-center gap-2.5"
                >
                    {/* Google Icon SVG */}
                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                        <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.107C18.416 1.421 15.586 0 12.24 0 5.48 0 0 5.48 0 12.24s5.48 12.24 12.24 12.24c7.05 0 11.732-4.934 11.732-11.94 0-.802-.086-1.414-.188-1.955h-11.545z" />
                    </svg>
                    Google (Sign in as Tenant)
                </button>

                {/* Redirect */}
                <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-6">
                    Don't have an account? <Link href="/auth/register" className="text-indigo-500 font-semibold hover:underline">Create an account</Link>
                </p>
            </motion.div>
        </div>
    );
}