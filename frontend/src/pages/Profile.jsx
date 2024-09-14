import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getEvents } from '../services/eventService';
import EventList from '../components/Events/EventList';

function Profile() {
  const { user } = useContext(AuthContext);
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

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <p className="mb-2">Name: {user.name}</p>
      <p className="mb-4">Email: {user.email}</p>
      <h2 className="text-xl font-semibold mb-2">Your Events</h2>
      <EventList events={userEvents} />
    </div>
  );
}

export default Profile;