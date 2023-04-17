# EXPENSES PLANNER
## front-end for app to expensess management

### LIVE EXAMPLE:
https://stoic-leavitt-bd046f.netlify.app/dashboard

### Project Scope:

**complete graphic design, a selection of colors, fonts, graphic elements
projecting a business logic, data flow from the front, data display
creating views and components - e.g. calendar view with notes
providing functionalities for the app presentation without a database - locale storage
project for further development after finding a commercial use.**


### Description:
#### Tech stack:

- React
- Redux
- React Router
- Styled Components
- Formik
- Moment
- Description:

#### technicals

React SPA, RWD.

React Router used for rapid views changing. Redux used to collect and store data - for now locale storage used, however the app can be easly connected to the API with data-base.

Callender view is fully custom component which renders day cards in Grid

Front-end validation obtained by Formik. All elements are styled by Styled Components. Atomic Design attitude used.

#### type

Front-end of the expense management application. Application rendered in the browser.

#### goal

Creation of a usable, simple but functional application that will help users to plan expenses, remind about payments so that the user will always be up to date - just check.

Application to develope, contains font rendered in the browser so far with data display logic and data flow. A server layer to be added, what at this stage will be easy to implement if the decision to produce is made.

#### design

The design is based on cards. Simplicity is broken by a wave that smoothly separates the sections on the dashboard view. One main color plus white and grey give clarity. Depending the view, there is white or blue backgroud shown for easier navigation on the app.

Pretty interesting menu bar coded with icons and color indentation in the bar when active.

#### actions

Calendar view shows day-by-day payments, payment status, amount to be paid or already paid. If there are more payments during the day, it automatically displays the total amount as an abbreviated version of the information. You can use the calendar to go to payment, view details.

The user can add individual payments or entire payment cycles (paid weekly, monthly etc.). Then, after making the payment, the user can change the status, amount and add a note to each payment. The user can modify his records.

All information can also be displayed by month or day in separate views. Brief user information is available on the total spend for the entire month.

------------



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

