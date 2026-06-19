import Link from 'next/link';

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full text-center space-y-6">

                {/* Animated Lock Icon */}
                <div className="flex justify-center">
                    <div className="bg-red-50 p-4 rounded-full text-red-500 animate-bounce">
                        <svg
                            className="h-16 w-16"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 15v2m0-8v4m-3.333-4h6.666c1.867 0 3.333 1.467 3.333 3.333v3.334c0 1.866-1.466 3.333-3.333 3.333H8.667C6.8 19 5.333 17.533 5.333 15.667V12.333C5.333 10.467 6.8 9 8.667 9z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 9V7a3 3 0 116 0v2"
                            />
                        </svg>
                    </div>
                </div>

                {/* Text Messages */}
                <div className="space-y-2">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                        403 - Access Denied
                    </h1>
                    <p className="text-base text-gray-500 font-medium">
                        Sorry, you don't have permission to access this dashboard.
                    </p>
                    <p className="text-sm text-red-400 max-w-xs mx-auto">
                        You are attempting to enter a restricted area. This incident will be logged.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                    <Link
                        href="/"
                        className="inline-flex justify-center items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 shadow-sm"
                    >
                        <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                        Back to Home
                    </Link>

                    <Link
                        href="/auth/login"
                        className="inline-flex justify-center items-center px-5 py-2.5 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                    >
                        Log in with another ID
                    </Link>
                </div>

                {/* Footer Note */}
                <p className="text-xs text-gray-400 pt-6">
                    If you believe this is a mistake, please contact your administrator.
                </p>
            </div>
        </div>
    );
}