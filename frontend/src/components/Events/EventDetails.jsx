import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEvent, rsvpEvent, deleteEvent } from '../../services/eventService';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';
import { formatDate } from '../../utils/dateUtils';
import Button from '../common/Button';

function EventDetails() {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addNotification } = useNotification();

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
      addNotification('Failed to load event details', 'error');
      setLoading(false);
    }
  };

  const handleRSVP = async () => {
    try {
      await rsvpEvent(id);
      addNotification('RSVP successful!', 'success');
      fetchEvent(); // Refresh event data after RSVP
    } catch (error) {
      console.error('Error RSVPing to event:', error);
      addNotification('Failed to RSVP', 'error');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(id);
        addNotification('Event deleted successfully', 'success');
        navigate('/events');
      } catch (error) {
        console.error('Error deleting event:', error);
        addNotification('Failed to delete event', 'error');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!event) return <div>Event not found</div>;

  const isOrganizer = user && event.organizer._id === user.id;
  const hasRSVPd = user && event.attendees.includes(user.id);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <p className="text-gray-600 mb-2">Date: {formatDate(event.date)}</p>
      <p className="text-gray-600 mb-4">Location: {event.location}</p>
      <p className="mb-4">{event.description}</p>
      <p className="mb-4">Organizer: {event.organizer.name}</p>
      <p className="mb-4">Capacity: {event.attendees.length} / {event.capacity}</p>
      
      {user && !isOrganizer && !hasRSVPd && (
        <Button onClick={handleRSVP} className="bg-green-500 text-white hover:bg-green-600 mr-2">
          RSVP
        </Button>
      )}
      
      {isOrganizer && (
        <>
          <Button onClick={() => navigate(`/edit-event/${id}`)} className="bg-blue-500 text-white hover:bg-blue-600 mr-2">
            Edit Event
          </Button>
          <Button onClick={handleDelete} className="bg-red-500 text-white hover:bg-red-600">
            Delete Event
          </Button>
        </>
      )}
    </div>
  );
}

export default EventDetails;