// 'use client';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic input validation
    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }

    // Simulate a login request
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error('Invalid login credentials');
      }

      const data = await res.json();
      if (data.success) {
        // On success, store the token or user details in localStorage or sessionStorage
        sessionStorage.setItem('user', JSON.stringify(data.user));

        // Redirect to the home page after successful login
        router.push('/');
      } else {
        setError('Login failed');
      }
    } catch (err) {
      //setError('Something went wrong. Please try again.');
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-700 to-emerald-700">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-teal-600 mb-6">Login</h2>

        {error && <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="w-full bg-teal-600 text-white py-3 rounded-md hover:bg-teal-700 transition duration-200">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
