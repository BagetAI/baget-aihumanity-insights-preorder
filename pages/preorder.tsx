import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PreOrderForm } from '@/components/PreOrderForm';
import { useRouter } from 'next/router';

export default function PreOrderPage() {
  const [orderId, setOrderId] = useState('');
  const router = useRouter();

  function handleSuccess(id: string) {
    setOrderId(id);
  }

  if (orderId) {
    return (
      <section className="max-w-lg mx-auto p-6 my-20 bg-gray-900 text-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Thank you for pre-ordering!</h2>
        <p className="mb-4">
          Your order ID is <span className="font-mono">{orderId}</span>.
        </p>
        <p>
          You will receive an email confirmation shortly with details and updates about the release of <b>AIHumanity Insights</b>.
        </p>
        <Button className="mt-6" onClick={() => router.push('/')}>Back to Home</Button>
      </section>
    );
  }

  return (
    <section className="max-w-lg mx-auto p-6 my-20 bg-gray-900 text-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold mb-6">Pre-Order AIHumanity Insights</h1>
      <PreOrderForm onSuccess={handleSuccess} />
    </section>
  );
}
