import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, ArrowLeft } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import { AppLogo } from '../components/common/AppLogo';

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log('Google login success!', tokenResponse);
      setIsLoading(true);
      try {
        const API_BASE = import.meta.env.DEV ? (import.meta.env.VITE_API_URL || 'http://localhost:5000/api') : 'https://lounge-backend-npok.onrender.com/api';
        const res = await fetch(`${API_BASE}/auth/google`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: tokenResponse.access_token })
        });
        
        const data = await res.json();
        
        if (res.ok && data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          navigate('/');
        } else {
          console.error('Login failed', data);
        }
      } catch (error) {
        console.error('Failed to authenticate with backend', error);
      } finally {
        setIsLoading(false);
      }
    },
    onError: errorResponse => console.error('Google login failed', errorResponse),
  });

  return (
    <div className="min-h-screen w-full flex bg-[#F8FAFC]">
      {/* Left Column - Image & Branding (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 relative bg-slate-900 overflow-hidden flex-col justify-between p-12">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/lounge-pair-final-image.jpg"
            alt="Lounge Experience"
            className="w-full h-full object-cover opacity-70"
          />
          {/* Lighter, more transparent blue overlay */}
          <div className="absolute inset-0 bg-[#0A192F]/30 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/90 via-[#0A192F]/40 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <button
            onClick={() => navigate('/')}
            className="text-white/80 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>

          <AppLogo size="lg" isDark={true} />
          <h1 className="text-white text-5xl font-extrabold mt-12 mb-6 font-quicksand leading-tight">
            Elevate Your <br />
            <span className="text-accent-rose">Airport Experience.</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-md font-medium leading-relaxed">
            Join thousands of travelers who enjoy premium lounge access, exclusive deals, and seamless bookings.
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="relative z-10 flex items-center gap-4 mt-auto">
          <div className="flex -space-x-4">
            {[1, 2, 3, 4].map((i) => (
              <img
                key={i}
                src={`https://i.pravatar.cc/100?img=${i + 10}`}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-[#0A192F]"
              />
            ))}
          </div>
          <div className="text-sm font-medium text-slate-300">
            <strong className="text-white text-base">4.9/5</strong> rating from travelers
          </div>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-rose/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

        <div className="w-full max-w-md relative z-10">
          {/* Mobile Header (Visible only on mobile) */}
          <div className="lg:hidden mb-10 flex flex-col items-center text-center">
            <AppLogo size="md" useOrangeLogo={true} />
            <h2 className="text-2xl font-extrabold text-navy mt-6 mb-2">Welcome to Get Your Lounge</h2>
            <p className="text-slate-500 text-sm">Sign in to unlock exclusive features.</p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold text-navy mb-2 tracking-tight">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-slate-500 font-medium">
                {isLogin ? 'Enter your details to access your account.' : 'Start your premium travel journey today.'}
              </p>
            </div>

            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); navigate('/'); }}>
              {!isLogin && (
                <div>
                  <label className="block text-sm font-bold text-navy mb-1.5">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-navy focus:bg-white focus:ring-2 focus:ring-accent-rose/20 focus:border-accent-rose transition-all font-medium placeholder:text-slate-400 outline-none"
                      placeholder="ABC XYZ"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-navy mb-1.5">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-navy focus:bg-white focus:ring-2 focus:ring-accent-rose/20 focus:border-accent-rose transition-all font-medium placeholder:text-slate-400 outline-none"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-sm font-bold text-navy">Password</label>
                  {isLogin && (
                    <a href="#" className="text-xs font-bold text-accent-rose hover:text-accent-rose-hover">
                      Forgot Password?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="password"
                    className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-navy focus:bg-white focus:ring-2 focus:ring-accent-rose/20 focus:border-accent-rose transition-all font-medium placeholder:text-slate-400 outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#0A192F] hover:bg-[#162C46] text-white py-3.5 px-4 rounded-xl font-bold text-base transition-all shadow-lg shadow-navy/20 mt-6 group"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-200"></div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">OR</span>
              <div className="flex-1 h-px bg-slate-200"></div>
            </div>

            <button
              type="button"
              disabled={isLoading}
              className={`mt-6 w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 border border-slate-200 text-navy py-3 px-4 rounded-xl font-bold text-[15px] transition-all shadow-sm ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              onClick={() => googleLogin()}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              {isLoading ? 'Connecting to Google...' : 'Continue with Google'}
            </button>

            <div className="mt-8 text-center">
              <p className="text-sm font-medium text-slate-500">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="font-bold text-accent-rose hover:text-accent-rose-hover ml-1"
                >
                  {isLogin ? 'Sign up' : 'Log in'}
                </button>
              </p>
            </div>
          </div>

          {/* Footer for mobile */}
          <div className="lg:hidden mt-8 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-slate-500 hover:text-navy flex items-center justify-center gap-2 text-sm font-medium transition-colors mx-auto"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
