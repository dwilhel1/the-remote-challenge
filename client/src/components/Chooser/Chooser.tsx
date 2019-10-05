import React, { useEffect, useState } from 'react';
import { TimeSlot } from '../../models/timeSlot';

const Chooser = (): React.ReactElement => {
  const [ timeSlots, setTimeSlots ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);

  async function getTimeSlots() {
      const res = await fetch('/employer_schedules');
      res
        .json()
        .then(res => {
          setTimeSlots(res);
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
    }

  useEffect(() => {
    getTimeSlots();
  }, []);

  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    console.error(error);
  }

  return (
    <div>
      <p>Select a date and time</p>
      { timeSlots.length ? timeSlots.map((timeSlot: TimeSlot) => <p>ID: {timeSlot.id} - Start time: {timeSlot.start_time}</p>) : <p>No time slots available.</p>}
    </div>
  )
};

export default Chooser;
