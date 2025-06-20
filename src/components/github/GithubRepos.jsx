import { Star, GitFork, ExternalLink } from 'lucide-react';

const GithubRepos = ({ repos, currentPage, totalRepos, reposPerPage, setCurrentPage, darkMode }) => {
  const totalPages = Math.ceil(totalRepos / reposPerPage);
  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = repos.slice(indexOfFirstRepo, indexOfLastRepo);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Featured Repositories ({totalRepos} total)
      </h3>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {currentRepos.map((repo) => (
          <div
            key={repo.id}
            className={`p-6 rounded-2xl border backdrop-blur-sm transition-all hover:scale-105 hover:shadow-2xl ${
              darkMode ? 'bg-gray-800/30 border-gray-700/50 hover:border-blue-500/50' : 'bg-white/30 border-gray-200/50 hover:border-blue-500/50'
            } shadow-lg group`}
          >
            <div className="flex items-start justify-between mb-4">
              <h4 className="font-bold text-blue-400 hover:text-blue-300 cursor-pointer truncate group-hover:text-purple-400 transition-colors">
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                  <span>{repo.name}</span>
                  <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </h4>
            </div>
            
            {repo.description && (
              <p className={`text-sm mb-4 line-clamp-3 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {repo.description}
              </p>
            )}
            
            <div className="flex items-center justify-between text-sm mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 p-2 bg-yellow-500/10 rounded-lg">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>{repo.stargazers_count}</span>
                </div>
                <div className="flex items-center space-x-1 p-2 bg-green-500/10 rounded-lg">
                  <GitFork className="h-4 w-4 text-green-500" />
                  <span>{repo.forks_count}</span>
                </div>
              </div>
              {repo.language && (
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  darkMode ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'
                }`}>
                  {repo.language}
                </span>
              )}
            </div>
            
            <div className={`text-xs ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Updated {formatDate(repo.updated_at)}
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-xl border backdrop-blur-sm transition-all ${
              currentPage === 1 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-blue-500/10 hover:border-blue-500/50'
            } ${darkMode ? 'border-gray-600 bg-gray-800/30' : 'border-gray-300 bg-white/30'}`}
          >
            Previous
          </button>
          
          <span className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold">
            {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-xl border backdrop-blur-sm transition-all ${
              currentPage === totalPages 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-blue-500/10 hover:border-blue-500/50'
            } ${darkMode ? 'border-gray-600 bg-gray-800/30' : 'border-gray-300 bg-white/30'}`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default GithubRepos;
