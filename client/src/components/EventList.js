import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('/getEvent')
      .then(res => setEvents(res.data))//storing the fetched data into events array using axios
      .catch(err => console.log(err));
  }, []);

  return (
    <div className='container'>
      <h1>Upcoming Events</h1>
      {events.length > 0 ? (
        <ul type="none">
          {events.map(event => (
            <div className="container">
             <li key={event._id}>
            <b>Eventname</b>:{event.name}
            </li>
             <li key={1}>
            <b>Start-Date:</b>{event.startDate}
            </li>
             <li key={2}>
            <b>End-Date</b>:{event.endDate}
            </li>
             <li key={3}>
            <b>Mode</b>:{event.mode}
            </li>
            <hr />
            </div>
     
          ))}
        </ul>
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
}

export default EventList;
