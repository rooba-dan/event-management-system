import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getEvent, rsvpEvent } from '../services/eventService';
import { AuthContext } from '../context/AuthContext';

function EventDetails() {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await getEvent(id);
      setEvent(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching event:', error);
      setLoading(false);
    }
  };

  const handleRSVP = async () => {
    try {
      await rsvpEvent(id);
      fetchEvent(); // Refresh event data after RSVP
    } catch (error) {
      console.error('Error RSVPing to event:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!event) return <div>Event not found</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <p className="text-gray-600 mb-2">Date: {new Date(event.date).toLocaleString()}</p>
      <p className="text-gray-600 mb-4">Location: {event.location}</p>
      <p className="mb-4">{event.description}</p>
      <p className="mb-4">Organizer: {event.organizer.name}</p>
      <p className="mb-4">Capacity: {event.attendees.length} / {event.capacity}</p>
      {user && !event.attendees.includes(user.id) && (
        <button
          onClick={handleRSVP}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          RSVP
        </button>
      )}
    </div>
  );
}

export default EventDetails;