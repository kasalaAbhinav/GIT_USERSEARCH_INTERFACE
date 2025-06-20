import { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Github } from 'lucide-react';

const AuthForm = ({ setIsLoggedIn, setUser, darkMode }) => {
  const [authMode, setAuthMode] = useState('login');
  const [authData, setAuthData] = useState({ 
    email: '', 
    password: '', 
    confirmPassword: '', 
    name: '' 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError('');

    if (authMode === 'signup') {
      if (authData.password !== authData.confirmPassword) {
        setAuthError('Passwords do not match');
        return;
      }
      if (authData.password.length < 6) {
        setAuthError('Password must be at least 6 characters');
        return;
      }
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const userData = {
      id: Date.now(),
      name: authData.name || authData.email.split('@')[0],
      email: authData.email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${authData.email}`
    };

    setUser(userData);
    setIsLoggedIn(true);
    sessionStorage.setItem('githubSearchUser', JSON.stringify(userData));
    setLoading(false);
    setAuthData({ email: '', password: '', confirmPassword: '', name: '' });
  };

  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
      <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <Github className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">GitHub Explorer</h1>
          <p className="text-gray-300">Discover and explore GitHub profiles with stunning 3D visuals</p>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={authData.email}
            onChange={(e) => setAuthData({...authData, email: e.target.value})}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
          />
          
          {authMode === 'signup' && (
            <input
              type="text"
              placeholder="Full name"
              value={authData.name}
              onChange={(e) => setAuthData({...authData, name: e.target.value})}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
            />
          )}
          
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={authData.password}
              onChange={(e) => setAuthData({...authData, password: e.target.value})}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          
          {authMode === 'signup' && (
            <input
              type="password"
              placeholder="Confirm password"
              value={authData.confirmPassword}
              onChange={(e) => setAuthData({...authData, confirmPassword: e.target.value})}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
            />
          )}

          {authError && (
            <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm">
              {authError}
            </div>
          )}

          <button
            onClick={handleAuth}
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2 font-semibold"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
            <span>{authMode === 'login' ? 'Sign In' : 'Create Account'}</span>
          </button>

          <div className="text-center">
            <button
              onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              {authMode === 'login' 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;