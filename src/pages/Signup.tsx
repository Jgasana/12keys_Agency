import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { UserPlus } from 'lucide-react';

export function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!supabase) {
      setError('Authentication service is not available');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#f3f3f3] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-8 shadow-lg text-center">
          <h2 className="text-2xl font-light tracking-wider uppercase text-[#8e6d46] mb-4">
            Account Created
          </h2>
          <p className="text-gray-600 font-light mb-6">
            Your account has been created successfully. You can now sign in.
          </p>
          <a
            href="/login"
            className="inline-block px-8 py-3 bg-[#8e6d46] hover:bg-[#a2886a] text-white uppercase tracking-wider text-sm font-light transition-colors"
          >
            Go to Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f3f3] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light tracking-widest uppercase text-[#8e6d46] mb-2">
            12Keys Agency
          </h1>
          <p className="text-gray-600 font-light">Create your account</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-light tracking-wide uppercase text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 focus:border-[#8e6d46] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-light tracking-wide uppercase text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 border border-gray-300 focus:border-[#8e6d46] focus:outline-none transition-colors"
            />
            <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8e6d46] hover:bg-[#a2886a] text-white py-3 px-6 uppercase tracking-wider text-sm font-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              'Creating account...'
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                Sign Up
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/login" className="text-[#8e6d46] hover:text-[#a2886a] font-light text-sm transition-colors">
            Already have an account? Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
