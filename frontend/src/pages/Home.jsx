import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Event Management System</h1>
      <p className="mb-8">Discover and create amazing events in your area!</p>
      <div className="space-x-4">
        <Link to="/events" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
          Browse Events
        </Link>
        <Link to="/create-event" className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
          Create Event
        </Link>
      </div>
    </div>
  );
}

export default Home;