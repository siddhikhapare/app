'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      sessionStorage.setItem('user', JSON.stringify(data.user));
      sessionStorage.setItem('token', data.token);
      router.push('/');
    } catch (err) {
      // console.error('Login error:', error);
      // setError(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
    // } catch (err: any) {
    //   setError(err.message);
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900 to-teal-800 p-6">
      <form
        onSubmit={handleLogin}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Login</h2>

        {error && <p className="text-red-400 mb-4 text-center">{error}</p>}

        <div className="mb-4">
          <label className="block text-white mb-2">Email</label>
          <input
            type="email"
            className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/30 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-white mb-2">Password</label>
          <input
            type="password"
            className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/30 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold py-3 rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all"
        >
          Login
        </button>
      </form>
    </div>
  );
}
