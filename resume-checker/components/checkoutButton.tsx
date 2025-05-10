// components/CheckoutButton.tsx
import { loadStripe } from '@stripe/stripe-js';
import { Stripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51RNA8iPBX1QeD5CSuS7O4VUkgRA0KS1O76RFptYLPfGG0gJKmsxwEGY4VMQv3M2XB1oIBau7qW330a68SJWX1vyi00J4nMHCpH'); // Replace with your real key

export default function CheckoutButton() {
  const handleCheckout = async () => {
    const stripe: Stripe | null = await stripePromise;
    if (!stripe) return;

    await stripe.redirectToCheckout({
      lineItems: [{ price: 'price_1RNACmPBX1QeD5CSomD9Tmtg', quantity: 1 }], // Replace with your actual Price ID
      mode: 'payment',
      successUrl: 'https://yourdomain.com/success?session_id={CHECKOUT_SESSION_ID}',
      cancelUrl: 'https://yourdomain.com/cancel',
    });
  };

  return (
    <button
      onClick={handleCheckout}
      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200 ease-in-out"
    >
      Pay to Unlock Resume Result
    </button>
  );
}
