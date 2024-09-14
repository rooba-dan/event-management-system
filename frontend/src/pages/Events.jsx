import React, { useState, useEffect, useContext } from 'react';
import { getEvents } from '../services/eventService';
import EventList from '../components/Events/EventList';
import { ThemeContext } from '../context/ThemeContext';

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await getEvents();
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="animate-fadeIn">
      <h1 className={`text-3xl font-bold mb-6 ${
        darkMode ? 'text-yellow-300' : 'text-indigo-700'
      } transition-colors duration-300`}>Upcoming Events</h1>
      <EventList events={events} />
    </div>
  );
}

export default Events;