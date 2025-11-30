// src/pages/SetupAdmin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LoaderCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { initialSetup } from '../api/index.js';

const SetupAdmin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await initialSetup({ email, mobile, password, confirmPassword });

      toast.success(
        res.data?.message || 'Admin account created successfully. Please login.'
      );

      navigate('/login');
    } catch (err) {
      const msg =
        err?.response?.data?.message || 'Setup failed. Please try again.';

      toast.error(msg);

      if (msg.toLowerCase().includes('setup already completed')) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-slate-200">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800">
            Admin Panel Setup
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Create your first admin account to start using the dashboard.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="email"
              placeholder="Admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>

          <div className="relative">
            {/* You can use a phone icon if you want, but keeping Mail for simplicity */}
            <input
              type="tel"
              placeholder="Admin mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
              className="w-full pl-3 pr-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>

          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>

          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors"
          >
            {loading ? (
              <>
                <LoaderCircle className="animate-spin" size={18} />
                Creating admin...
              </>
            ) : (
              'Create Admin Account'
            )}
          </button>

          <p className="text-xs text-slate-500 text-center">
            If setup is already completed, go to{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-indigo-600 hover:underline font-medium"
            >
              Login
            </button>
            .
          </p>
        </form>
      </div>
    </div>
  );
};

export default SetupAdmin;
