import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-blue-200 transition-colors">Event Management</Link>
        <nav>
          <ul className="flex space-x-6 items-center">
            <li><Link to="/events" className="hover:text-blue-200 transition-colors">Events</Link></li>
            {user ? (
              <>
                <li><Link to="/create-event" className="hover:text-blue-200 transition-colors">Create Event</Link></li>
                <li><Link to="/profile" className="hover:text-blue-200 transition-colors">Profile</Link></li>
                <li>
                  <button 
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="hover:text-blue-200 transition-colors">Login</Link></li>
                <li>
                  <Link 
                    to="/register" 
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;