import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, AtSign, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

export const AuthCard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isSignUpPage = location.pathname === '/signup';
  const [isSignUp, setIsSignUp] = useState(isSignUpPage);

  // Sync state with URL location
  useEffect(() => {
    setIsSignUp(location.pathname === '/signup');
  }, [location.pathname]);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Sign Up form state
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const toggleMode = (targetSignUp: boolean) => {
    setIsSignUp(targetSignUp);
    navigate(targetSignUp ? '/signup' : '/login');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('/api/auth/login', {
        email: loginEmail,
        password: loginPassword,
      });

      const message = response.data?.message || 'Signed in successfully!';
      toast.success(message);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Authentication failed. Please check your credentials.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('/api/auth/signup', {
        fullName,
        username,
        email: signUpEmail,
        password: signUpPassword,
      });

      const message = response.data?.message || 'Account created successfully!';
      toast.success(`${message} Please sign in.`);
      
      // Auto-prefill login email and switch to login view
      setLoginEmail(signUpEmail);
      toggleMode(false);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        (Array.isArray(err.response?.data?.details)
          ? err.response.data.details.map((d: any) => d.message).join(', ')
          : 'Registration failed. Please check your details.');
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md mx-auto"
    >
      {/* Floating Card Container */}
      <div className="bg-[#0e0e12]/90 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 sm:p-10 shadow-2xl shadow-black/80 relative overflow-hidden">
        {/* Subtle top edge highlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

        <AnimatePresence mode="wait">
          {isSignUp ? (
            <motion.div
              key="signup"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Card Header */}
              <div className="mb-6 text-left">
                <h2 className="text-2xl font-bold tracking-tight text-white font-sans">
                  Create an account
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Sign up to get started with Nexus.
                </p>
              </div>

              {/* Sign Up Form */}
              <form onSubmit={handleSignUp} className="space-y-3.5">
                {/* Full Name Input */}
                <div className="space-y-1.5">
                  <label 
                    htmlFor="fullName" 
                    className="block text-xs font-medium text-zinc-300"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      id="fullName"
                      type="text"
                      required
                      minLength={3}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full h-10 pl-10 pr-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-purple-500/80 focus:ring-2 focus:ring-purple-500/20 transition-all duration-150"
                    />
                  </div>
                </div>

                {/* Username Input */}
                <div className="space-y-1.5">
                  <label 
                    htmlFor="username" 
                    className="block text-xs font-medium text-zinc-300"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                      <AtSign className="w-4 h-4" />
                    </div>
                    <input
                      id="username"
                      type="text"
                      required
                      minLength={3}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="johndoe"
                      className="w-full h-10 pl-10 pr-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-purple-500/80 focus:ring-2 focus:ring-purple-500/20 transition-all duration-150"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="space-y-1.5">
                  <label 
                    htmlFor="signUpEmail" 
                    className="block text-xs font-medium text-zinc-300"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="signUpEmail"
                      type="email"
                      required
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full h-10 pl-10 pr-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-purple-500/80 focus:ring-2 focus:ring-purple-500/20 transition-all duration-150"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1.5">
                  <label 
                    htmlFor="signUpPassword" 
                    className="block text-xs font-medium text-zinc-300"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      id="signUpPassword"
                      type={showSignUpPassword ? 'text' : 'password'}
                      required
                      minLength={8}
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      placeholder="•••••••• (min. 8 characters)"
                      className="w-full h-10 pl-10 pr-10 rounded-lg bg-zinc-900/60 border border-zinc-800/80 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-purple-500/80 focus:ring-2 focus:ring-purple-500/20 transition-all duration-150"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors focus:outline-none"
                      tabIndex={-1}
                      aria-label={showSignUpPassword ? 'Hide password' : 'Show password'}
                    >
                      {showSignUpPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 mt-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-sm shadow-md shadow-purple-950/40 transition-all duration-200 active:scale-[0.99] flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Create account</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Card Header */}
              <div className="mb-7 text-left">
                <h2 className="text-2xl font-bold tracking-tight text-white font-sans">
                  Welcome back
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Sign in to continue to Nexus.
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email Input */}
                <div className="space-y-1.5">
                  <label 
                    htmlFor="loginEmail" 
                    className="block text-xs font-medium text-zinc-300"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="loginEmail"
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full h-11 pl-10 pr-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-purple-500/80 focus:ring-2 focus:ring-purple-500/20 transition-all duration-150"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1.5">
                  <label 
                    htmlFor="loginPassword" 
                    className="block text-xs font-medium text-zinc-300"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      id="loginPassword"
                      type={showLoginPassword ? 'text' : 'password'}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-11 pl-10 pr-10 rounded-lg bg-zinc-900/60 border border-zinc-800/80 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-purple-500/80 focus:ring-2 focus:ring-purple-500/20 transition-all duration-150"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors focus:outline-none"
                      tabIndex={-1}
                      aria-label={showLoginPassword ? 'Hide password' : 'Show password'}
                    >
                      {showLoginPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember me & Forgot Password */}
                <div className="flex items-center justify-between pt-1 pb-1 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-zinc-800 bg-zinc-900 text-purple-600 focus:ring-purple-500/20 focus:ring-offset-0 transition-colors cursor-pointer accent-purple-600"
                    />
                    <span className="text-zinc-400 group-hover:text-zinc-300 transition-colors">
                      Remember me
                    </span>
                  </label>

                  <a
                    href="#forgot-password"
                    className="text-purple-400 hover:text-purple-300 font-medium transition-colors focus:outline-none focus:underline"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Continue Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 mt-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-sm shadow-md shadow-purple-950/40 transition-all duration-200 active:scale-[0.99] flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Continue</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Divider */}
        <div className="relative flex items-center my-5">
          <div className="flex-grow border-t border-zinc-800/80" />
          <span className="flex-shrink mx-3 text-[11px] font-medium text-zinc-500 tracking-wider uppercase">
            or
          </span>
          <div className="flex-grow border-t border-zinc-800/80" />
        </div>

        {/* OAuth Social Buttons */}
        <div className="grid grid-cols-2 gap-3">
          {/* Google Button */}
          <button
            type="button"
            className="h-10 rounded-lg border border-zinc-800/90 bg-zinc-900/40 hover:bg-zinc-800/60 hover:border-zinc-700/80 text-zinc-200 text-xs font-medium transition-all duration-150 flex items-center justify-center gap-2.5 focus:outline-none focus:ring-1 focus:ring-zinc-700 cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.2 8.9 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
              />
              <path
                fill="#FBBC05"
                d="M5.3 14.8c-.3-.8-.4-1.8-.4-2.8s.1-2 .4-2.8L1.6 6.3C.6 8.3 0 10.1 0 12s.6 3.7 1.6 5.7l3.7-2.9z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.2-6.7-5.3L1.6 16C3.5 19.8 7.4 23 12 23z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* GitHub Button */}
          <button
            type="button"
            className="h-10 rounded-lg border border-zinc-800/90 bg-zinc-900/40 hover:bg-zinc-800/60 hover:border-zinc-700/80 text-zinc-200 text-xs font-medium transition-all duration-150 flex items-center justify-center gap-2.5 focus:outline-none focus:ring-1 focus:ring-zinc-700 cursor-pointer"
          >
            <svg className="w-4 h-4 fill-current text-zinc-100" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span>Continue with GitHub</span>
          </button>
        </div>

        {/* Footer Toggle Link */}
        <div className="mt-6 text-center text-xs text-zinc-400">
          {isSignUp ? (
            <>
              Already have an account?{' '}
              <Link
                to="/login"
                onClick={(e) => {
                  e.preventDefault();
                  toggleMode(false);
                }}
                className="text-purple-400 hover:text-purple-300 font-semibold ml-1 transition-colors focus:outline-none focus:underline"
              >
                Sign in
              </Link>
            </>
          ) : (
            <>
              Don&apos;t have an account?{' '}
              <Link
                to="/signup"
                onClick={(e) => {
                  e.preventDefault();
                  toggleMode(true);
                }}
                className="text-purple-400 hover:text-purple-300 font-semibold ml-1 transition-colors focus:outline-none focus:underline"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};
