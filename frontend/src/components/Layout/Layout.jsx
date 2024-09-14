import React, { useContext } from 'react';
import Header from './Header';
import Footer from './Footer';
import NotificationList from '../Notifications/NotificationList';
import { ThemeContext } from '../../context/ThemeContext';

function Layout({ children }) {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`flex flex-col min-h-screen transition-all duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100' 
        : 'bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900'
    }`}>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 transition-all duration-300 ease-in-out animate-fadeIn">
        {children}
      </main>
      <NotificationList />
      <Footer />
    </div>
  );
}

export default Layout;