const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;
const demoTimeSlots = [
  { "id": 2, "start_time": "2019-02-28T16:00:00.000Z" },
  { "id": 6, "start_time": "2019-02-28T21:00:00.000Z" },
  { "id": 9, "start_time": "2019-02-28T14:00:00.000Z" },
];

app.use(cors());
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/employer_schedules', (req, res) => {
  res.send(demoTimeSlots);
});

app.post('/schedule_interview', (req, res) => {
  console.log(req);
  res.send(200);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
