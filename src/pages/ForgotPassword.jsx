// src/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoaderCircle, Mail, Lock, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  forgotPassword,
  verifyResetOtp,
  resetPasswordWithOtp,
} from '../api/index.js';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('email'); // 'email' | 'otp' | 'reset'
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Step 1: send OTP to email
  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      const { data } = await forgotPassword({ email });
      toast.success(data.message || 'OTP sent to your email address');

      setStep('otp');
    } catch (err) {
      const msg =
        err?.response?.data?.message || 'Failed to send OTP. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp) {
      toast.error('Please enter the OTP');
      return;
    }

    setLoading(true);

    try {
      const { data } = await verifyResetOtp({ email, otp });
      toast.success(data.message || 'OTP verified successfully');
      setStep('reset');
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        'Failed to verify OTP. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // Step 3: reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const { data } = await resetPasswordWithOtp({
        email,
        password,
        confirmPassword,
      });

      toast.success(data.message || 'Password reset successful. Please login.');
      navigate('/login');
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        'Failed to reset password. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <div className="p-8 bg-white rounded-xl shadow-lg w-full max-w-md border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-800 text-center mb-2">
          Forgot Password
        </h1>
        <p className="text-center text-slate-500 mb-6 text-sm">
          Reset your password using your registered email address.
        </p>

        {/* STEP 1: EMAIL */}
        {step === 'email' && (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                type="email"
                placeholder="Registered email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center disabled:bg-indigo-400"
            >
              {loading ? (
                <>
                  <LoaderCircle className="animate-spin mr-2" />
                  Sending OTP...
                </>
              ) : (
                'Send OTP'
              )}
            </button>

            <button
              type="button"
              onClick={() => navigate('/login')}
              className="w-full text-sm text-slate-500 hover:text-slate-700 mt-2"
            >
              Back to Login
            </button>
          </form>
        )}

        {/* STEP 2: OTP */}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div className="text-sm text-slate-500 mb-2">
              OTP sent to: <span className="font-medium">{email}</span>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center disabled:bg-indigo-400"
            >
              {loading ? (
                <>
                  <LoaderCircle className="animate-spin mr-2" />
                  Verifying...
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2" size={18} />
                  Verify OTP
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setStep('email')}
              className="w-full text-sm text-slate-500 hover:text-slate-700 mt-2"
            >
              Change email
            </button>
          </form>
        )}

        {/* STEP 3: RESET PASSWORD */}
        {step === 'reset' && (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div className="text-sm text-slate-500 mb-2">
              Reset password for:{' '}
              <span className="font-medium break-all">{email}</span>
            </div>

            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                type="password"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center disabled:bg-indigo-400"
            >
              {loading ? (
                <>
                  <LoaderCircle className="animate-spin mr-2" />
                  Resetting...
                </>
              ) : (
                'Reset Password'
              )}
            </button>

            <button
              type="button"
              onClick={() => setStep('email')}
              className="w-full text-sm text-slate-500 hover:text-slate-700 mt-2"
            >
              Start over
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
