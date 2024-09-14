import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

function EventForm({ initialData = {}, onSubmit, buttonText = 'Submit' }) {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    capacity: '',
    ...initialData
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(eventData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Title"
        name="title"
        value={eventData.title}
        onChange={handleChange}
        required
      />
      <div className="mb-4">
        <label htmlFor="description" className="block mb-1">Description</label>
        <textarea
          id="description"
          name="description"
          value={eventData.description}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        ></textarea>
      </div>
      <Input
        label="Date"
        name="date"
        type="datetime-local"
        value={eventData.date}
        onChange={handleChange}
        required
      />
      <Input
        label="Location"
        name="location"
        value={eventData.location}
        onChange={handleChange}
        required
      />
      <Input
        label="Capacity"
        name="capacity"
        type="number"
        value={eventData.capacity}
        onChange={handleChange}
        required
      />
      <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600">
        {buttonText}
      </Button>
    </form>
  );
}

export default EventForm;