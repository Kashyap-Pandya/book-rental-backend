# Book Rental Backend API

## Overview

This project is a backend API for a Book Rental System built with TypeScript and Node.js. It provides endpoints to manage books, users, and transactions related to book rentals.

## Project Structure

- **src/**: Contains the source code for the server.
- **routes/**: Includes route handlers for books, users, and transactions.
- **middleware/**: Contains middleware for error handling.
- **models/**: Contains the Mongoose models for books, users, and transactions.
- **controllers/**: Contains the business logic to manage requests for books, transactions, etc.
- **config/**: Includes the MongoDB connection logic.
- **app.ts**: Initializes the Express app and middleware.
- **server.ts**: Entry point for the application; sets up the server and connects to the database.
- **public/**: Directory for static files. Includes `index.html` for viewing API documentation and endpoints.
- **dist/**: Output directory for compiled JavaScript files from TypeScript.

## Error Handling

The application uses custom error-handling middleware to ensure that all errors are caught and handled gracefully. The middleware provides clear and informative error messages for any issues that arise during requests.

## API Documentation

To facilitate easier navigation of API routes, an `index.html` file has been created. This file can be accessed via your web browser and provides a user-friendly view of the available API endpoints, methods, and examples.

## Running the Project

1. **Development**: Use the following command to start the server with `nodemon` for automatic restarts during development:

   ```bash
   npm run dev
   ```

2. **Production**: Build the project using the following command:

   ```bash
   npm run build
   ```

   Start the server with:

   ```bash
   npm start
   ```

## Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/book-rental-backend.git
   cd book-rental-backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory with the following variables:

   ```bash
   NODE_ENV=production
   PORT=3000
   MONGODB_URI=your_mongo_db_uri
   BASE_URL=https://book-rental-backend-three.vercel.app
   ```

4. **Start the development server**:

   ```bash
   npm run dev
   ```

5. **For production**:

   ```bash
   npm run build
   npm start
   ```
