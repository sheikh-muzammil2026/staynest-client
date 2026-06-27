"use client";
import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white dark:bg-[#090D16] text-slate-600 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-800/60 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    <div className="lg:col-span-2 space-y-5">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-sky-400 flex items-center justify-center text-white font-black shadow-md">
                                S
                            </div>
                            <span className="text-lg font-black tracking-tight text-slate-950 dark:text-white">
                                Stay<span className="text-indigo-500">Nest</span>
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed max-w-sm">
                            The ultimate next-gen ecosystem for premium rentals. Connecting verified property owners with quality tenants under smart automated workflows.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold text-slate-950 dark:text-white uppercase tracking-widest mb-4">
                            Marketplace
                        </h4>
                        <ul className="space-y-3 text-sm font-medium">
                            <li><Link href="/properties" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition">All Properties</Link></li>
                            <li><Link href="#" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition">Featured Homes</Link></li>
                            <li><Link href="#" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition">Top Locations</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold text-slate-950 dark:text-white uppercase tracking-widest mb-4">
                            Platform
                        </h4>
                        <ul className="space-y-3 text-sm font-medium">
                            <li><Link href="/login" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition">User Login</Link></li>
                            <li><Link href="/register" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition">Become an Owner</Link></li>
                            <li><Link href="#" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition">Trust & Safety</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-xs font-bold text-slate-950 dark:text-white uppercase tracking-widest">
                            Stay Updated
                        </h4>
                        <p className="text-xs">Get notified the second a premium listing matches your criteria.</p>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#131B2E] text-xs font-medium border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500/50"
                            />
                            <button type="submit" className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition shadow-md shadow-indigo-500/10">
                                Join
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800/40 bg-slate-50/50 dark:bg-[#0c121e]/40 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium">
                    <div>
                        &copy; {currentYear} StayNest Inc. Built for Excellence.
                    </div>

                    <div className="flex items-center gap-6">
                        <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-950 dark:hover:text-white transition" aria-label="Twitter X">
                            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>

                        <a href="#" className="text-slate-400 hover:text-indigo-600 transition" aria-label="LinkedIn">
                            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}