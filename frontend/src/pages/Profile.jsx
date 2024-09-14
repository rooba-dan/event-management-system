import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { getEvents } from '../services/eventService';
import EventList from '../components/Events/EventList';

function Profile() {
  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);
  const [userEvents, setUserEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserEvents();
  }, []);

  const fetchUserEvents = async () => {
    try {
      const response = await getEvents();
      const filteredEvents = response.data.filter(event => 
        event.organizer._id === user.id || event.attendees.includes(user.id)
      );
      setUserEvents(filteredEvents);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user events:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto animate-fadeIn">
      <h1 className={`text-3xl font-bold mb-6 ${
        darkMode ? 'text-yellow-300' : 'text-indigo-700'
      } transition-colors duration-300`}>Your Profile</h1>
      <div className={`bg-opacity-80 rounded-lg p-6 mb-8 ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-lg transition-all duration-300`}>
        <p className={`mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <span className="font-semibold">Name:</span> {user.name}
        </p>
        <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <span className="font-semibold">Email:</span> {user.email}
        </p>
      </div>
      <h2 className={`text-2xl font-semibold mb-4 ${
        darkMode ? 'text-yellow-200' : 'text-indigo-600'
      } transition-colors duration-300`}>Your Events</h2>
      <EventList events={userEvents} />
    </div>
  );
}

export default Profile;