# AIHumanity Insights - Pre-Order Sales Funnel Prototype

## Overview
This prototype extends the existing AIHumanity Insights platform with a full pre-order sales funnel for the book "AIHumanity Insights." It includes:

- Pre-order form capturing user details, quantity, and shipping address
- Integration with Stripe payment intent for payment processing
- Basic inventory track simulation
- Responsive, accessible UI consistent with existing design
- Order confirmation page with order ID and email confirmation messaging

## Technical Details
- Frontend built in Next.js with react-hook-form for validation
- Backend API endpoint at `/api/preorder` to create Stripe payment intents
- Environment variable needed: `STRIPE_SECRET_KEY` for Stripe API access
- Prototype simulates inventory management with an in-memory counter

## Validation & Next Steps
- The pre-order page validates user input and submits an order
- Server confirms inventory and creates payment intent
- Future iterations may add frontend payment confirmation and full order DB
- Add email confirmation system and integration with fulfillment workflows

## Deployment Instructions
1. Set the environment variable `STRIPE_SECRET_KEY` with your Stripe secret key.
2. Run the Next.js app normally:
   ```
   npm install
   npm run dev
   ```
3. Users can place pre-orders at `/preorder`.

---

Prepared for rapid launch and validation of book pre-order sales funnel.
