import { Sun, Moon, LogOut } from 'lucide-react';
import { Github } from 'lucide-react';

const Header = ({ user, darkMode, toggleDarkMode, handleLogout }) => {
  return (
    <div className="flex items-center justify-between mb-8 backdrop-blur-sm bg-white/5 p-4 rounded-2xl border border-white/10">
      <div className="flex items-center space-x-4">
        <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
          <Github className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            GitHub Explorer
          </h1>
          <p className="text-sm text-gray-400">Welcome back, {user?.name}!</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-xl transition-all ${
            darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'
          } border border-gray-300 dark:border-gray-600 backdrop-blur-sm`}
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        
        <div className="flex items-center space-x-2">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-8 h-8 rounded-full border-2 border-blue-500"
          />
          <button
            onClick={handleLogout}
            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all"
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;