export const prerender = false

import { STRIPE_SECRET_KEY } from 'astro:env/server'
import StripeClient from 'stripe'

export async function POST() {
    const stripe = new StripeClient(STRIPE_SECRET_KEY)

    const session = await stripe.checkout.sessions.create({
        ui_mode: 'elements',
        return_url: `${import.meta.env.SITE}/checkout-complete`,
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'T-shirt',
                    },
                    unit_amount: 2000,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
    })

    return new Response(JSON.stringify(session))
}
