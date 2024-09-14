import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';

function Header() {
  const { user, logout } = useContext(AuthContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className={`${
      darkMode 
        ? 'bg-gradient-to-r from-purple-900 to-indigo-900' 
        : 'bg-gradient-to-r from-blue-500 to-indigo-600'
    } text-white shadow-lg transition-all duration-300`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-yellow-300 transition-colors duration-200 animate-pulse">Event Management</Link>
        <nav>
          <ul className="flex space-x-6 items-center">
            <li><Link to="/events" className="hover:text-yellow-300 transition-colors duration-200">Events</Link></li>
            {user ? (
              <>
                <li><Link to="/create-event" className="hover:text-yellow-300 transition-colors duration-200">Create Event</Link></li>
                <li><Link to="/profile" className="hover:text-yellow-300 transition-colors duration-200">Profile</Link></li>
                <li>
                  <button 
                    onClick={handleLogout}
                    className={`${
                      darkMode 
                        ? 'bg-red-700 hover:bg-red-800' 
                        : 'bg-red-500 hover:bg-red-600'
                    } text-white font-bold py-2 px-4 rounded transition-all duration-200 transform hover:scale-105`}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="hover:text-yellow-300 transition-colors duration-200">Login</Link></li>
                <li>
                  <Link 
                    to="/register" 
                    className={`${
                      darkMode 
                        ? 'bg-green-700 hover:bg-green-800' 
                        : 'bg-green-500 hover:bg-green-600'
                    } text-white font-bold py-2 px-4 rounded transition-all duration-200 transform hover:scale-105`}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
            <li>
              <button 
                onClick={toggleTheme}
                className={`${
                  darkMode 
                    ? 'bg-yellow-400 text-gray-900' 
                    : 'bg-gray-700 text-yellow-400'
                } p-2 rounded-full transition-all duration-200 transform hover:scale-110`}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;