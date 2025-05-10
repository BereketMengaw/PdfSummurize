'use client'; // This is required for client-side hooks

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Success() {
  const router = useRouter();

  useEffect(() => {
    // Set payment flag
    localStorage.setItem('hasPaid', 'true');

    // Redirect after 3 seconds
    const timeout = setTimeout(() => {
      router.push('/resume-result');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold text-green-600">✅ Payment Successful</h1>
      <p className="mt-4 text-lg text-gray-700">Redirecting to your resume result...</p>
    </div>
  );
}
