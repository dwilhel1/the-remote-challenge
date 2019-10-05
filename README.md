# the-remote-challenge

This is an application to help candidates schedule interviews. As a candidate, you will see three available time slots. You may select one of these time slots, or propose a new time for your interview. Once you have selected your time slot or proposed a new time, you should see a confirmation message.

# Requirements

## Backend

The API must have two endpoints:

* Method: **`GET`** Path: `/employer_schedules`
  * Returns three 30 minute windows of time ("time slots") that represent when an employer is available to interview, each with a unique identifier.
  * The time slots should be hard coded (not pulled from a dynamic data source, file, or database), but must remain the same between requests. 
  * Example response:
```
[
  { "id": 2, "start_time": "2019-02-28T16:00:00.000Z" },
  { "id": 6, "start_time": "2019-02-28T21:00:00.000Z" },
  { "id": 9, "start_time": "2019-02-28T14:00:00.000Z" }
]
```

* Method: **`POST`** Path: `/schedule_interview`
  * Send an appropriate API response to confirm that the interview has been scheduled.
  * For the sake of this project, we do not need to update the availability schedule for future requests. Even if we confirm that slot in the `/schedule_interview` POST, it’ll still be available in future `/employer_schedules` requests.
  * Handle incorrect input as you see necessary, ideally including a descriptive error message or error code to help the frontend understand the problem.
  
## Frontend

1. Create a browser UI for a candidate to select a time slot to interview. This doesn’t have to be elaborate, it can the minimum viable product to get the job done. 
2. The UI should allow the user to view the available time slots. You should make an API request to your server on page load, and display the results in a way the user can understand. 
3. The user should be able to select one of the available time slots. This will make an API request to schedule the interview.
4. Once the request has been made, display either a human readable confirmation or error message.
5. Make sure the frontend has the ability to make multiple requests without refreshing the page. There is no change in behavior if a candidate schedules two different interviews or if the candidate schedules the same interview multiple times.

## Bonus

* If none of the available time slots work, give the candidate the ability to propose a new date and time. This will involve a new API endpoint as well an input field and success/failure confirmation in the UI.
* Make your application better! Do you want to make your application more secure, improve accessibility, or add better styling? Use the rest of your time to show off your skills.

# Installation

## Prerequisites

# Running the application

# Final thoughts

## Summary

## Testing

## General
