// app/success/page.js
import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'


export const metadata = {
    title: "Payment Successful",
    description: "Thank you for your payment! Your booking is confirmed.",
};

export default async function Success({ searchParams }) {
    const { session_id, booking_id } = await searchParams


    if (!session_id)
        throw new Error('Please provide a valid session_id (`cs_test_...`)')

    const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    })

    const status = session.status;
    const customerEmail = session.customer_details?.email;

    if (status === 'open') {
        return redirect('/')
    }

    if (status === 'complete') {

        try {

            const backendUrl = process.env.NEXT_PUBLIC_SERVER_URI

            const response = await fetch(`${backendUrl}/payment-success`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bookingId: booking_id,
                    sessionId: session_id,
                    amount: session.amount_total / 100,
                    currency: session.currency,
                    customerEmail: customerEmail
                })
            });

            const data = await response.json();
            if (!response.ok || !data.success) {
                console.error("Express backend failed to update:", data.message);
            } else {
                console.log("Database updated successfully via Express!");
            }
        } catch (error) {
            console.error("Failed to connect with Express backend:", error.message);
        }


        return (
            <section id="success" className="min-h-[80vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
                <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl dark:shadow-slate-950/50 text-center border border-slate-100 dark:border-slate-700">

                    {/* Success Icon */}
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 animate-bounce">
                        <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    {/* Heading */}
                    <div className="space-y-2">
                        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            Payment Successful!
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Thank you for your purchase. Your booking is now <strong>Approved</strong>.
                        </p>
                    </div>

                    {/* Content Body */}
                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-slate-100 dark:border-slate-800 text-left text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        <p className="mb-3">
                            We appreciate your business! A confirmation email has been sent to{' '}
                            <span className="font-semibold text-slate-900 dark:text-white underline decoration-green-500">
                                {customerEmail}
                            </span>.
                        </p>
                        <p>
                            If you have any questions, feel free to contact us at{' '}
                            <a href="mailto:orders@example.com" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                                orders@example.com
                            </a>.
                        </p>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                        <Link
                            href="/"
                            className="inline-flex w-full justify-center items-center px-5 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Return to Dashboard
                        </Link>
                    </div>

                </div>
            </section>
        )
    }
}