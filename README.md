# the-remote-challenge

This is an application to help candidates schedule interviews. As a candidate, you will see three available time slots. You may select one of these time slots, or propose a new time for your interview. Once you have selected your time slot or proposed a new time, you should see a confirmation message.

**Completed UI**

![](https://i.imgur.com/hO5leeK.png "Application screenshot")

# Notable features

* Submit button is disabled before input is selected
* Submit button hover reflects the selected date-time, else shows "Choose a time slot"
* Main UI is not displayed before the time slots are returned from the REST call
* Added basic colors / animation to the time slot options
* Time slot chooser is responsive to viewport width

# Resources

* Deployment URL: https://dw-remote-challenge.herokuapp.com
* Git Repository: https://github.com/dwilhel1/the-remote-challenge

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

* **Package manager**
  * I chose to use `yarn` as my package manager for developing this project, feel free to use one of your choice!
  * Instructions: https://yarnpkg.com/lang/en/docs/install/
* **NodeJS**
  * I chose to use ExpressJS / NodeJS for the backend REST API framework since I have some familiarity with this particular stack
  * Instructions: https://nodejs.org/en/download/
  
Once the prerequisites are satisfied, two installations must occur since the backend is separated from the frontend. In the top-level directory, a `yarn install` can be performed to install the necessary packages to run the backend server. In the `/client` directory, a separate `yarn install` can be performed to install the packages necessary for the frontend React application.

## Stack

* [NodeJS](https://nodejs.org/en/), [ExpressJS](https://expressjs.com/)
  * Backend REST API server
* [React](https://reactjs.org/) ([create-react-app](https://reactjs.org/docs/create-a-new-react-app.html) was used ot save time)
  * Frontend component library
* [TypeScript](https://www.typescriptlang.org/)
  * Superset language for JS to encourage code cleanliness and typing enforcement
  * Due to the time constraints, consistent type-checking is loosely implemented
* [MomentJS](https://momentjs.com/)
  * Date-time handling library / dependency used as a utility to format date-time values for humans
* [SASS](https://sass-lang.com/)
  * CSS library used to reduce style repetition and overhead
* [Heroku](https://dashboard.heroku.com/)
  * Cloud provider where the application is currently deployed
  * https://dw-remote-challenge.herokuapp.com/

# Running the application

* Backend server (top-level)
  * Command: `node server.js`
  * Address: `localhost:8080`
* Frontend application (`/client`)
  * Command: `yarn start`
  * Address: `localhost:3000`
  
Deployment to the staging Heroku URL is completed whenever changes are pushed to the `develop` branch. The `master` branch is currently not configured for deployment.
  
Navigate to the frontend application's address (above) in your web browser of choice to use the application. The three hard-coded time slots are fetched from the backend and rendered in a small card for the user to choose from. **Note:** A fourth "invalid" timeslot option is rendered as a way to test the backend error functionality on the `POST` endpoint since tests were not included.

If navigating to backend server's root address in a browser, you will encounter an error since the server is setup to serve the frontend application from the `build` directory which, currently, does not exist on the repository:

`Error: ENOENT: no such file or directory, stat '/Users/doug/Projects/the-remote-challenge/client/build/index.html'`

If building / serving the frontend application is desired, feel free to perform a `yarn build` in the `/client` directory and navigate to the `localhost:8080` address in your browser of choice!

# Final thoughts

## Summary

I had fun working on this application and wished there was more time! I am especially proud of the simple nature of the UI, and I love the ease of implementing date-time formatting with MomentJS. I struggled the most with deciding what to do in the limited amount of time I had to work on this project. If I had more time, I would have done the following, at minimum:

* Add and enforce appropriate linting packages, to the project and pipeline respectively
  * ESLint
  * TSLint
  * Evaluate a CSS / SASS linting framework
* Add unit and e2e tests
  * Remove the fourth "Invalid test" date-time option from the UI
* Structure the styling to be more reusable
* Investigate using a component library (such as Material UI)
* Abstract the AJAX calls from the `Chooser` component into either a utility or a service
* Give the user a date picker to propose a new date for an interview
* Evaluate separating frontend from backend with individual repositories

## Testing

If I were to add tests for this application, I would test each frontend component individually with [Jest](https://jestjs.io/docs/en/tutorial-react) and add workflow-based e2e tests with [Cypress](https://www.cypress.io/) and mocked server responses. For the backend API testing, I would add a series of [Mocha](https://mochajs.org/) tests using the [Chai](https://www.chaijs.com/) assertion library since that is a fairly common and robust combination of testing mechanisms for this platform.
