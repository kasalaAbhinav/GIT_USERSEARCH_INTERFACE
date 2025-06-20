import { useState, useEffect, useCallback } from 'react';
import { Search, Loader2, AlertCircle, Github } from 'lucide-react';
import GithubProfile from './GithubProfile';
import GithubRepos from './GithubRepos';

const GithubSearch = ({ darkMode }) => {
  const [username, setUsername] = useState('');
  const [githubUser, setGithubUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRepos, setTotalRepos] = useState(0);
  const reposPerPage = 6;

  const fetchUserData = useCallback(async (searchUsername) => {
    if (!searchUsername.trim()) return;

    setLoading(true);
    setError('');
    setCurrentPage(1);

    try {
      const userResponse = await fetch(`https://api.github.com/users/${searchUsername}`);
      if (!userResponse.ok) {
        throw new Error(userResponse.status === 404 ? 'User not found' : 'Failed to fetch user data');
      }
      const userData = await userResponse.json();
      setGithubUser(userData);

      const reposResponse = await fetch(`https://api.github.com/users/${searchUsername}/repos?sort=updated&per_page=100`);
      if (!reposResponse.ok) {
        throw new Error('Failed to fetch repositories');
      }
      const reposData = await reposResponse.json();
      
      const sortedRepos = reposData.sort((a, b) => b.stargazers_count - a.stargazers_count);
      setRepos(sortedRepos);
      setTotalRepos(sortedRepos.length);

    } catch (err) {
      setError(err.message);
      setGithubUser(null);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (username.trim()) {
      fetchUserData(username.trim());
    }
  };

  return (
    <>
      <div className="mb-8 backdrop-blur-sm bg-white/5 p-6 rounded-2xl border border-white/10">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Enter GitHub username to explore..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
              className={`w-full pl-12 pr-4 py-4 rounded-xl border transition-all ${
                darkMode 
                  ? 'bg-gray-800/50 border-gray-600 focus:border-blue-500 text-white placeholder-gray-400' 
                  : 'bg-white/50 border-gray-300 focus:border-blue-500 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-sm`}
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={loading || !username.trim()}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2 font-semibold shadow-lg"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
            <span>Explore</span>
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-16">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
              <Github className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-blue-500" />
            </div>
            <span className="text-lg font-medium">Exploring GitHub universe...</span>
          </div>
        </div>
      )}

      {error && (
        <div className={`p-6 rounded-2xl border-l-4 border-red-500 mb-8 backdrop-blur-sm ${
          darkMode ? 'bg-red-900/20 text-red-300 border-red-500/30' : 'bg-red-50 text-red-700 border-red-500'
        }`}>
          <div className="flex items-center space-x-3">
            <AlertCircle className="h-6 w-6" />
            <span className="font-medium">Error: {error}</span>
          </div>
        </div>
      )}

      {githubUser && !loading && (
        <div className="space-y-8">
          <GithubProfile githubUser={githubUser} darkMode={darkMode} />
          {repos.length > 0 && (
            <GithubRepos 
              repos={repos} 
              currentPage={currentPage} 
              totalRepos={totalRepos} 
              reposPerPage={reposPerPage} 
              setCurrentPage={setCurrentPage} 
              darkMode={darkMode} 
            />
          )}
        </div>
      )}
    </>
  );
};

export default GithubSearch;