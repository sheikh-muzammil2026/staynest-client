import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';


export async function POST(req) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    const { bookingId, rent, propertyTitle } = await req.json();
    console.log(bookingId, "from checkout sessions page");
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price_data: {
            currency: 'usd',
            product_data: {
              name: propertyTitle || 'Property Booking Payment',
            },
            unit_amount: rent * 100, 
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&booking_id=${bookingId}`,
     
    });
    // return NextResponse.redirect(session.url, 303)
    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}