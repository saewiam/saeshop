import { STRIPE_SECRET_KEY } from 'astro:env/server'
import StripeClient from 'stripe'

const stripe = new StripeClient(STRIPE_SECRET_KEY)

export async function POST() {
    /*
     * TODO: This function should take some cart data from the client and turn
     * it into a matching checkout session with the products in the user's cart
     */

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
