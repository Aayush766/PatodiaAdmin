import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { setPassword } from '../api'; // Import your new API function
import { Lock, Eye, EyeOff, LoaderCircle } from 'lucide-react';

const SetPassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            toast.error('Passwords do not match.');
            return;
        }
        setError('');
        setIsLoading(true);

        try {
            await setPassword({ password, confirmPassword });
            toast.success('Password set successfully! Please log in with your new password.');
            localStorage.removeItem('authToken'); // Log the user out
            navigate('/login'); // Redirect to login page
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'An error occurred. Please try again.';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="p-8 bg-white rounded-xl shadow-lg w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Set Your Password</h1>
                    <p className="text-gray-500">This is your first login. Please choose a secure password.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* New Password Input */}
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                         <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                             {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                         </button>
                    </div>

                    {/* Confirm Password Input */}
                    <div className="relative">
                         <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                         <input
                            type="password"
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>


                    {error && <div className="text-red-500 text-sm text-center">{error}</div>}

                    <button type="submit" disabled={isLoading} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center disabled:bg-blue-300">
                        {isLoading ? <><LoaderCircle className="animate-spin mr-2" /> Setting Password...</> : 'Set Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SetPassword;