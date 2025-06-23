'use client'

import React from 'react'
import { useState, useEffect } from 'react'

interface Event {
  id: string;
  summary: string;
  description: string;
  htmlLink?: string;
  start: {
    dateTime?: string;
    date?: string;
  };
  end: {
    datetime?: string;
    date?: string;
  }
}

const Calendar = () => {
  const [events, setEvents] = useState<Event[]>([])

  const formatDate = (start: { dateTime?: string; date?: string }) => {
    if (start.dateTime) return new Date(start.dateTime).toLocaleString();
    if (start.date) return new Date(start.date).toLocaleString();
    return 'Unknown Date';
  }

  useEffect(() => {
    fetch('/api/calendar')
      .then(res => res.json())
      .then(data => setEvents(data || [])); // make sure it matches your backend key
  }, []);


  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Calendar Events</h2>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul className="space-y-4">
          {events.map(event => (
            <li key={event.id} className="border border-neutral-700 p-4 rounded-lg shadow bg-neutral-800">
              <h3 className="text-lg font-semibold">{event.summary}</h3>
              <p className="text-sm text-gray-600">
                {formatDate(event.start)} → {formatDate(event.end)}
              </p>
              {event.description && <p className="mt-2">{event.description}</p>}
              {event.htmlLink && (
                <a href={event.htmlLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline mt-2 inline-block">
                  View on Google Calendar
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Calendar
