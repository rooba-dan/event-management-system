import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

function Home() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className="text-center animate-fadeIn">
      <h1 className={`text-5xl font-bold mb-6 ${
        darkMode ? 'text-yellow-300' : 'text-indigo-700'
      } transition-colors duration-300 animate-slideIn`}>
        Welcome to Event Management System
      </h1>
      <p className={`text-xl mb-10 ${
        darkMode ? 'text-gray-300' : 'text-gray-700'
      } transition-colors duration-300 animate-slideIn`}>
        Discover and create amazing events in your area!
      </p>
      <div className="space-x-6">
        <Link to="/events" className={`${
          darkMode 
            ? 'bg-purple-700 hover:bg-purple-800' 
            : 'bg-blue-600 hover:bg-blue-700'
        } text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-200 transform hover:scale-105 inline-block`}>
          Browse Events
        </Link>
        <Link to="/create-event" className={`${
          darkMode 
            ? 'bg-green-700 hover:bg-green-800' 
            : 'bg-green-600 hover:bg-green-700'
        } text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-200 transform hover:scale-105 inline-block`}>
          Create Event
        </Link>
      </div>
    </div>
  );
}

export default Home;