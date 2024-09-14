import React, { useState, useEffect } from 'react';
import { updateEvent } from '../../services/eventService';
import { useNotification } from '../../hooks/useNotification';
import Button from '../common/Button';

const UpdateEventModal = ({ event, isOpen, onClose, onEventUpdated }) => {
  const [title, setTitle] = useState(event.title);
  const [date, setDate] = useState(event.date.split('T')[0]);
  const [location, setLocation] = useState(event.location);
  const [description, setDescription] = useState(event.description);
  const [capacity, setCapacity] = useState(event.capacity);
  const { addNotification } = useNotification();

  useEffect(() => {
    if (isOpen) {
      setTitle(event.title);
      setDate(event.date.split('T')[0]);
      setLocation(event.location);
      setDescription(event.description);
      setCapacity(event.capacity);
    }
  }, [isOpen, event]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedEvent = await updateEvent(event._id, {
        title,
        date,
        location,
        description,
        capacity: parseInt(capacity, 10),
      });
      addNotification('Event updated successfully', 'success');
      onEventUpdated(updatedEvent);
      onClose();
    } catch (error) {
      console.error('Error updating event:', error);
      addNotification('Failed to update event', 'error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Update Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="capacity">
              Capacity
            </label>
            <input
              type="number"
              id="capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              min="1"
              required
            />
          </div>
          <div className="flex justify-end">
            <Button type="button" onClick={onClose} className="bg-gray-500 text-white hover:bg-gray-600 mr-2">
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600">
              Update Event
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEventModal;