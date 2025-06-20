import { useState, useEffect } from 'react';
import AuthForm from './components/auth/AuthForm';
import Header from './components/layout/Header';
import ThreeScene from './components/layout/ThreeScene';
import GithubSearch from './components/github/GithubSearch';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const savedUser = sessionStorage.getItem('githubSearchUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    sessionStorage.removeItem('githubSearchUser');
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`min-h-screen relative transition-all duration-500 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <ThreeScene darkMode={darkMode} />
      
      {!isLoggedIn ? (
        <AuthForm 
          setIsLoggedIn={setIsLoggedIn} 
          setUser={setUser} 
          darkMode={darkMode}
        />
      ) : (
        <>
          <Header 
            user={user} 
            darkMode={darkMode} 
            toggleDarkMode={toggleDarkMode} 
            handleLogout={handleLogout}
          />
          <GithubSearch darkMode={darkMode} />
        </>
      )}
    </div>
  );
}

export default App;