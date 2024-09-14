import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../services/eventService';
import { ThemeContext } from '../context/ThemeContext';

function CreateEvent() {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    capacity: '',
  });
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEvent(eventData);
      navigate('/events');
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto animate-fadeIn">
      <h1 className={`text-3xl font-bold mb-6 ${
        darkMode ? 'text-yellow-300' : 'text-indigo-700'
      } transition-colors duration-300`}>Create New Event</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className={`block mb-2 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          } transition-colors duration-300`}>Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={eventData.title}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 ${
              darkMode 
                ? 'bg-gray-700 text-white border-gray-600 focus:ring-purple-500' 
                : 'bg-white text-gray-900 border-gray-300 focus:ring-blue-500'
            }`}
          />
        </div>
        <div>
          <label htmlFor="description" className={`block mb-2 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          } transition-colors duration-300`}>Description</label>
          <textarea
            id="description"
            name="description"
            value={eventData.description}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 ${
              darkMode 
                ? 'bg-gray-700 text-white border-gray-600 focus:ring-purple-500' 
                : 'bg-white text-gray-900 border-gray-300 focus:ring-blue-500'
            }`}
          ></textarea>
        </div>
        <div>
          <label htmlFor="date" className={`block mb-2 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          } transition-colors duration-300`}>Date</label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={eventData.date}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 ${
              darkMode 
                ? 'bg-gray-700 text-white border-gray-600 focus:ring-purple-500' 
                : 'bg-white text-gray-900 border-gray-300 focus:ring-blue-500'
            }`}
          />
        </div>
        <div>
          <label htmlFor="location" className={`block mb-2 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          } transition-colors duration-300`}>Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={eventData.location}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 ${
              darkMode 
                ? 'bg-gray-700 text-white border-gray-600 focus:ring-purple-500' 
                : 'bg-white text-gray-900 border-gray-300 focus:ring-blue-500'
            }`}
          />
        </div>
        <div>
          <label htmlFor="capacity" className={`block mb-2 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          } transition-colors duration-300`}>Capacity</label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={eventData.capacity}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 ${
              darkMode 
                ? 'bg-gray-700 text-white border-gray-600 focus:ring-purple-500' 
                : 'bg-white text-gray-900 border-gray-300 focus:ring-blue-500'
            }`}
          />
        </div>
        <button 
          type="submit" 
          className={`w-full py-3 rounded-lg transition-all duration-300 transform hover:scale-105 ${
            darkMode 
              ? 'bg-purple-600 hover:bg-purple-700' 
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white font-semibold`}
        >
          Create Event
        </button>
      </form>
    </div>
  );
}

export default CreateEvent;