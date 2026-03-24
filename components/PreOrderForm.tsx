import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function PreOrderForm({ onSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [paymentProcessing, setPaymentProcessing] = useState(false);

  async function onSubmit(data) {
    setPaymentProcessing(true);
    try {
      const response = await fetch('/api/preorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await response.json();

      if (!response.ok) throw new Error(json.message || 'Pre-order failed');

      // This is prototype mode: simulate immediate confirmation
      onSuccess(json.orderId);
    } catch (error) {
      toast({
        title: 'Pre-order Error',
        description: error.message || 'Failed to process order',
        variant: 'destructive',
      });
    } finally {
      setPaymentProcessing(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="fullName" className="block mb-1">
          Full Name
        </label>
        <Input
          {...register('fullName', { required: 'Full name is required' })}
          id="fullName"
          placeholder="Your full name"
          className="w-full"
        />
        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block mb-1">
          Email Address
        </label>
        <Input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
              message: 'Invalid email address',
            },
          })}
          id="email"
          type="email"
          placeholder="you@example.com"
          className="w-full"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="address" className="block mb-1">
          Shipping Address
        </label>
        <Input
          {...register('address', { required: 'Shipping address is required' })}
          id="address"
          placeholder="Street address, city, postal code, country"
          className="w-full"
        />
        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
      </div>
      <div>
        <label htmlFor="quantity" className="block mb-1">
          Quantity
        </label>
        <Input
          {...register('quantity', {
            required: 'Please specify quantity',
            valueAsNumber: true,
            min: { value: 1, message: 'Minimum is 1' },
            max: { value: 10, message: 'Maximum 10 copies' },
          })}
          id="quantity"
          type="number"
          defaultValue={1}
          min={1}
          max={10}
          className="w-full"
        />
        {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>}
      </div>
      <Button type="submit" disabled={isSubmitting || paymentProcessing} className="w-full">
        {isSubmitting || paymentProcessing ? 'Processing...' : 'Place Pre-Order'}
      </Button>
    </form>
  );
}
