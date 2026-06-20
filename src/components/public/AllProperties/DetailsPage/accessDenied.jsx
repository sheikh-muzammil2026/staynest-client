import Link from 'next/link';
import React from 'react';

const AccessDenied = () => {


    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 transition-colors duration-300 bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100">
            <div className="max-w-md w-full text-center space-y-6 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">

                {/* Lock Icon */}
                <div className="flex justify-center">
                    <div className="p-4 bg-red-100 dark:bg-red-950/50 text-red-500 dark:text-red-400 rounded-full animate-bounce">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-12 h-12"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                            />
                        </svg>
                    </div>
                </div>

                {/* English Text Content */}
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">
                        Access Denied
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                        Please log in to view the full property details on Staynest.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <Link href={'/auth/login'}>
                        <button

                            className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-xl transition-all duration-200 shadow-sm"
                        >
                            Login Now
                        </button>
                    </Link>

                    <Link href={'/'}>
                        <button

                            className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-xl transition-all duration-200"
                        >
                            Go Back
                        </button>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default AccessDenied;