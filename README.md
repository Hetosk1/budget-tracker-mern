# Budget Tracker App

**A simple budget tracker application built with the MERN stack.**  
This app allows users to manage and track their income and expenses, providing a clear view of their financial situation. It helps users keep track of their spending and stay within their budget by categorizing and analyzing their financial data.

## Features

- **User Authentication**: Secure sign-up and login features.
- **Add/Remove Transactions**: Users can record their income and expenses.
- **Transaction Categories**: Categorize transactions (e.g., Food, Rent, Entertainment).
- **Monthly Budget Overview**: View total income, expenses, and remaining budget.
- **Responsive UI**: Works seamlessly on mobile and desktop devices.
- **Data Persistence**: MongoDB database to store users' financial data securely.

## Tech Stack

- **MongoDB**: NoSQL database to store user data and transaction records.
- **Express.js**: Web application framework for Node.js to handle HTTP requests.
- **React**: Front-end JavaScript library for building the user interface.
- **Node.js**: JavaScript runtime to handle server-side operations.
- **JWT (JSON Web Tokens)**: Used for user authentication and session management.
 
## Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (>=14.x.x)
- [MongoDB](https://www.mongodb.com/) (or a MongoDB cloud instance via [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation


### Backend Setup (Node.js + Express)

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add the following environment variables:

   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. Run the backend server:

   ```bash
   npm start
   ```

### Frontend Setup (React)

1. Navigate to the frontend directory:

   ```bash
   cd ../frontend
   ```

2. Install the frontend dependencies:

   ```bash
   npm install
   ```

3. Run the frontend server:

   ```bash
   npm start
   ```

The app should now be running on `http://localhost:5173` (frontend) and `http://localhost:3000` (backend).

## Usage

1. **Sign Up/Log In**: Create a new account or log into an existing account.
2. **Add Transactions**: Record your income or expenses by entering the amount, category, and description.
3. **View Transactions**: See a list of all your transactions with filters for categories and dates.
4. **Monthly Budget Overview**: View the total income, expenses, and remaining balance for the current month.
5. **Delete Transactions**: If necessary, delete any transaction to keep your records up-to-date.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a new Pull Request.

## Developers

- **Het Jasani** - Backend Developer
- **Lakshita Chaudhary** - Frontend Developer
- **Devashree Kale** - UI/UX Designer
- **Bhumi Asati** - Database Designer

## Acknowledgments

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [JWT](https://jwt.io/)
