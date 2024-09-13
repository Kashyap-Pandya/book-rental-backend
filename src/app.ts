import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import bookRoutes from "./routes/bookRoutes";
import userRoutes from "./routes/userRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import { errorHandler } from "./middleware/errorHandler";

// Load environment variables
dotenv.config();

const app: Express = express();

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Define API routes
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

// Base URL
const baseUrl = process.env.BASE_URL || "http://localhost:3000";

// API Routes endpoint
app.get("/api/routes", (req: Request, res: Response) => {
  res.json({
    message: "API Routes",
    routes: [
      {
        path: "/api/books",
        method: "GET",
        description: "Get all books",
        link: `${baseUrl}/api/books`,
        example: `GET ${baseUrl}/api/books`,
      },
      {
        path: "/api/books",
        method: "POST",
        description: "Create a new book",
        link: `${baseUrl}/api/books`,
        example: `
          POST ${baseUrl}/api/books
          Body: {
            "name": "Atomic Habits",
            "category": "Productivity",
            "rentPerDay": 5
          }`,
      },
      {
        path: "/api/books/search",
        method: "GET",
        description: "Search books by name",
        link: `${baseUrl}/api/books/search?term={searchTerm}`,
        example: `GET ${baseUrl}/api/books/search?term=Harry`,
      },
      {
        path: "/api/books/rent-range",
        method: "GET",
        description:
          "Get books by rent range, min range 1 and maximum range is 9",
        link: `${baseUrl}/api/books/rent-range?min={minRent}&max={maxRent}`,
        example: `GET ${baseUrl}/api/books/rent-range?min=5&max=9`,
      },
      {
        path: "/api/books/multi-search",
        method: "GET",
        description: "Get books by multiple parameters",
        link: `${baseUrl}/api/books/multi-search?category={category}&term={searchTerm}&minRent={minRent}&maxRent={maxRent}`,
        example: `GET ${baseUrl}/api/books/multi-search?category=Mystery&term=sherlock&minRent=5&maxRent=9`,
      },
      {
        path: "/api/users",
        method: "GET",
        description: "Get all users",
        link: `${baseUrl}/api/users`,
        example: `GET ${baseUrl}/api/users`,
      },
      {
        path: "/api/users",
        method: "POST",
        description: "Create a new user",
        link: `${baseUrl}/api/users`,
        example: `
          POST ${baseUrl}/api/users
          Body: {
            "name": "John Doe",
            "email": "john@example.com"
          }`,
      },
      {
        path: "/api/transactions/issue",
        method: "POST",
        description: "Issue a book to a user",
        link: `${baseUrl}/api/transactions/issue`,
        example: `
          POST ${baseUrl}/api/transactions/issue
          Body: {
            "bookId": "5f8a7b2c9d3e1f2a3b4c5d6e",
            "userId": "5f8a7b2c9d3e1f2a3b4c5d6f",
            "issueDate": "2024-09-13T00:00:00.000Z"
          }`,
      },
      {
        path: "/api/transactions/return",
        method: "POST",
        description: "Return a book",
        link: `${baseUrl}/api/transactions/return`,
        example: `
          POST ${baseUrl}/api/transactions/return
          Body: {
            "transactionId": "66e4360f84cd88964f2d7eb6",
            "returnDate": "2024-09-13T00:00:00.000Z"
          }`,
      },
      {
        path: "/api/transactions/book/:bookId",
        method: "GET",
        description: "Get transactions for a specific book",
        link: `${baseUrl}/api/transactions/book/{bookId}`,
        example: `GET ${baseUrl}/api/transactions/book/66e479b949ef2b95cdfaa460`,
      },
      {
        path: "/api/transactions/book/:bookId/rent-total",
        method: "GET",
        description: "Get total rent for a book",
        link: `${baseUrl}/api/transactions/book/{bookId}/rent-total`,
        example: `GET ${baseUrl}/api/transactions/book/5f8a7b2c9d3e1f2a3b4c5d6e/rent-total`,
      },
      {
        path: "/api/transactions/user/:userId",
        method: "GET",
        description: "Get transactions for a specific user",
        link: `${baseUrl}/api/transactions/user/{userId}`,
        example: `GET ${baseUrl}/api/transactions/user/66e199db4a584a4c72b303c1`,
      },
      {
        path: "/api/transactions/date-range",
        method: "GET",
        description: "Get transactions within a date range",
        link: `${baseUrl}/api/transactions/date-range?startDate={startDate}&endDate={endDate}`,
        example: `GET ${baseUrl}/api/transactions/date-range?startDate=2023-09-01&endDate=2023-09-30`,
      },
    ],
  });
});

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Error Handler middleware
app.use(errorHandler);

export default app;
