import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

function Footer() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <footer className={`${
      darkMode 
        ? 'bg-gray-800 text-gray-300' 
        : 'bg-gray-200 text-gray-700'
    } text-center py-4 transition-all duration-300`}>
      <p className="animate-slideIn">&copy; 2023 Event Management System. All rights reserved.</p>
    </footer>
  );
}

export default Footer;