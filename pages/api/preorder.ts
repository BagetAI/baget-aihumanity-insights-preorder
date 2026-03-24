import Stripe from 'stripe';

// Initialize Stripe with secret key from env
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

// Simulated inventory for the book
let inventoryCount = 100; // For prototype demo, normally in DB

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const { fullName, email, address, quantity } = req.body;

  // Basic validation
  if (!fullName || !email || !address || !quantity || quantity < 1 || quantity > 10) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  if (quantity > inventoryCount) {
    return res.status(400).json({ message: 'Not enough inventory available' });
  }

  try {
    // Create Stripe payment intent
    const amountCents = 1999 * quantity; // $19.99 per book

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: 'usd',
      description: `Pre-order of ${quantity} copies of AIHumanity Insights`,
      receipt_email: email,
      metadata: {
        fullName,
        address,
        quantity: quantity.toString(),
      },
    });

    // Reduce inventory (in real scenario, use DB transaction)
    inventoryCount -= quantity;

    // Return client secret for payment confirmation on frontend
    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      amount: amountCents,
      orderId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Payment intent creation failed:', error);
    return res.status(500).json({ message: 'Payment processing error' });
  }
}
