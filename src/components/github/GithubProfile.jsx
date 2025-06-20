import { MapPin, Users, User, ExternalLink, Github, Calendar, Link, Building, Twitter } from 'lucide-react';

const GithubProfile = ({ githubUser, darkMode }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`p-8 rounded-2xl border backdrop-blur-sm ${
      darkMode ? 'bg-gray-800/30 border-gray-700/50' : 'bg-white/30 border-gray-200/50'
    } shadow-2xl`}>
      <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
        <div className="relative">
          <img
            src={githubUser.avatar_url}
            alt={githubUser.login}
            className="w-32 h-32 rounded-2xl border-4 border-gradient-to-r from-blue-500 to-purple-500 shadow-2xl"
          />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-800"></div>
        </div>
        
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {githubUser.name || githubUser.login}
          </h2>
          <p className="text-blue-500 mb-3 text-lg">@{githubUser.login}</p>
          
          {githubUser.bio && (
            <p className={`mb-4 text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {githubUser.bio}
            </p>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {githubUser.company && (
              <div className="flex items-center space-x-2 p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <Building className="h-5 w-5 text-blue-400" />
                <span className="text-sm">{githubUser.company}</span>
              </div>
            )}
            
            {githubUser.location && (
              <div className="flex items-center space-x-2 p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <MapPin className="h-5 w-5 text-green-400" />
                <span className="text-sm">{githubUser.location}</span>
              </div>
            )}
            
            {githubUser.blog && (
              <div className="flex items-center space-x-2 p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <Link className="h-5 w-5 text-purple-400" />
                <a href={githubUser.blog.startsWith('http') ? githubUser.blog : `https://${githubUser.blog}`} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-sm hover:underline">
                  {githubUser.blog.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
            
            {githubUser.twitter_username && (
              <div className="flex items-center space-x-2 p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <Twitter className="h-5 w-5 text-blue-400" />
                <a href={`https://twitter.com/${githubUser.twitter_username}`} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-sm hover:underline">
                  @{githubUser.twitter_username}
                </a>
              </div>
            )}
            
            <div className="flex items-center space-x-2 p-3 bg-white/10 rounded-xl backdrop-blur-sm">
              <Calendar className="h-5 w-5 text-orange-400" />
              <span className="text-sm">Joined {formatDate(githubUser.created_at)}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center p-3 bg-white/10 rounded-xl backdrop-blur-sm">
              <span className="text-2xl font-bold">{githubUser.public_repos}</span>
              <span className="text-sm">Repositories</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-white/10 rounded-xl backdrop-blur-sm">
              <span className="text-2xl font-bold">{githubUser.followers}</span>
              <span className="text-sm">Followers</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-white/10 rounded-xl backdrop-blur-sm">
              <span className="text-2xl font-bold">{githubUser.following}</span>
              <span className="text-sm">Following</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-white/10 rounded-xl backdrop-blur-sm">
              <span className="text-2xl font-bold">{githubUser.public_gists || 0}</span>
              <span className="text-sm">Gists</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col space-y-4">
          <a
            href={githubUser.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg font-semibold"
          >
            <ExternalLink className="h-5 w-5" />
            <span>View Profile</span>
          </a>
          
          {githubUser.email && (
            <a
              href={`mailto:${githubUser.email}`}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all font-semibold"
            >
              <span>Contact</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default GithubProfile;