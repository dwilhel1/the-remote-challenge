import React, { useEffect, useState } from 'react';
import { TimeSlot } from '../../models/timeSlot';
import formatDateTime from '../../utilities/formatDateTime';
import './Chooser.scss';

interface ChooserState {
  timeSlot: TimeSlot;
}

const Chooser = (): React.ReactElement => {
  const fetchUrlPrefix = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : '';
  const [ timeSlots, setTimeSlots ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);
  const [ values, setValues ] = useState({
    timeSlot: { id: 0, start_time: '' },
  });

  const handleChange = (key: keyof ChooserState, value: any) => () => {
    setValues({ ...values, [key]: value });
  };

  const postTimeSlot = async (id: number) => {
    const fetchParams = { method: 'POST' };
    const res = await fetch(`${fetchUrlPrefix}/schedule_interview?id=${id}`, fetchParams);
    res.json()
      .then((res) => {
        res.error ? console.error(res.error) : alert('success');
      })
      .catch(error => alert('failure: ' + error))
  };

  const getTimeSlots = async () => {
      const res = await fetch(`${fetchUrlPrefix}/employer_schedules`);
      res.json()
        .then(res => {
          setTimeSlots(res);
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
    };

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
      { timeSlots.length ? timeSlots.map((timeSlot: TimeSlot) =>
        <p
          key={timeSlot.id}
          onClick={handleChange('timeSlot', timeSlot)}
          className={`chooser-button ${timeSlot.id === values.timeSlot.id ? 'chooser-selected' : ''}`}
        >
          {formatDateTime(timeSlot.start_time)}
        </p>) :
        <p>No time slots available.</p>
      }
      { values.timeSlot.start_time ?
        <button
          onClick={() => postTimeSlot(values.timeSlot.id)}
          title={formatDateTime(values.timeSlot.start_time)}
        >
          Submit
        </button> : null
      }
    </div>
  )
};

export default Chooser;
