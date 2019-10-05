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
        res.error ? alert(res.error) : alert('Interview successfully scheduled!');
      })
      .catch(error => alert('Error: ' + error))
  };

  const getTimeSlots = async () => {
      const res = await fetch(`${fetchUrlPrefix}/employer_schedules`);
      res.json()
        .then(res => {
          setTimeSlots(res);
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          alert(`Error retrieving time slots: ${error}`);
        });
    };

  useEffect(() => {
    getTimeSlots();
  }, []);

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div className={'card'}>
      <h2 className={'title'}>Select a date and time</h2>
      <div>
        { timeSlots.length ? timeSlots.map((timeSlot: TimeSlot) =>
          <p
            key={timeSlot.id}
            onClick={handleChange('timeSlot', timeSlot)}
            className={`item chooser-button ${timeSlot.id === values.timeSlot.id ? 'chooser-selected' : ''}`}
          >
            {formatDateTime(timeSlot.start_time)}
          </p>) :
          <p>No time slots available.</p>
        }
        <p
          className={`item ${9999 === values.timeSlot.id ? 'chooser-selected' : ''}`}
          onClick={handleChange('timeSlot', {id: 9999, start_time: new Date()})}
        >
          Invalid test
        </p>
      </div>
      <button
        disabled={!Boolean(values.timeSlot.start_time)}
        onClick={() => postTimeSlot(values.timeSlot.id)}
        title={values.timeSlot.start_time ? formatDateTime(values.timeSlot.start_time) : 'Choose a time slot'}
      >
        Submit
      </button>
    </div>
  )
};

export default Chooser;
