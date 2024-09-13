Book Rental Backend API

Overview

This project is a fullstack Book Rental API built with TypeScript and Node.js. It provides endpoints to manage books, users, and transactions for a book rental system.

Project Structure

    •	src/: Contains the source code for the server.
    •	routes/: Includes route handlers for books, users, and transactions.
    •	middleware/: Contains middleware for error handling.
    •	server.ts: Entry point for the application, sets up the server and middleware.
    •	public/: Directory for static files. Includes index.html for viewing API documentation and endpoints.
    •	dist/: Output directory for compiled JavaScript files from TypeScript.

Error Handling

The application uses custom error handling middleware to ensure that all errors are caught and handled gracefully. The middleware provides clear and informative error messages for any issues that arise during requests.

API Documentation

To facilitate easier navigation of API routes, an index.html file has been created. This file can be accessed via your web browser and provides a user-friendly view of the available API endpoints, methods, and examples.

Running the Project

    1.	Development: Use npm run dev to start the server with nodemon for automatic restarts during development.
    2.	Production: Build the project using npm run build and start the server with npm start.

Setup

    1.	Clone the repository.
    2.	Run npm install to install dependencies.
    3.	Create a .env file with your environment variables.
    4.	Start the development server using npm run dev or build and run for production.
