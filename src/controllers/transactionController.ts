import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Transaction from "../models/Transaction";
import User from "../models/User";
import Book from "../models/Book";

export const issueBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId, userId, issueDate } = req.body;

    // Convert string IDs to ObjectId
    const bookObjectId = new mongoose.Types.ObjectId(bookId);
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const user = await User.findById(userObjectId);
    const book = await Book.findById(bookObjectId);

    // check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // if book exists
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const transaction = new Transaction({
      book: bookObjectId,
      user: userObjectId,
      issueDate: new Date(issueDate),
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    //if formant is invalid
    if (error instanceof mongoose.Error.CastError) {
      return res
        .status(400)
        .json({ message: "Invalid book or user ID format" });
    }
    next(error);
  }
};

export const returnBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { transactionId, returnDate } = req.body;
    const transaction = await Transaction.findById(transactionId).populate(
      "book"
    );

    //if transaction not found
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    const issueDate = new Date(transaction.issueDate);
    const actualReturnDate = new Date(returnDate);

    //calculate day rented
    const daysRented = Math.ceil(
      (actualReturnDate.getTime() - issueDate.getTime()) / (1000 * 3600 * 24)
    );

    //check book object exists and rentPerDay is a number
    const book = transaction.book as any;
    //todo change the types
    if (!book || typeof book.rentPerDay !== "number") {
      return res.status(400).json({ message: "Invalid book data" });
    }

    //total rent amout
    const rentAmount = daysRented * book.rentPerDay;

    transaction.returnDate = actualReturnDate;
    transaction.rentAmount = rentAmount;

    await transaction.save();
    res.json(transaction);
  } catch (error) {
    //if it's invalid format
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid transaction ID format" });
    }
    next(error);
  }
};

export const getBookTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId } = req.params;
    const bookObjectId = new mongoose.Types.ObjectId(bookId);

    const transactions = await Transaction.find({
      book: bookObjectId,
    }).populate("user");

    //is book issued or not
    const currentlyIssued = transactions.find((t) => !t.returnDate);
    const totalCount = transactions.length;

    //if book isn't issued to anyone
    res.json({
      totalCount,
      currentlyIssued: currentlyIssued
        ? currentlyIssued.user
        : "Currently, book isn't issued to anyone.",
      transactions,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid book ID format" });
    }
    next(error);
  }
};

export const getBookRentTotal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId } = req.params;
    const bookObjectId = new mongoose.Types.ObjectId(bookId);

    //find all tran. for books where the book has been returned
    const transactions = await Transaction.find({
      book: bookObjectId,
      //if it exits give it back with returndate
      returnDate: { $exists: true },
    });

    //if no tran. found
    if (transactions.length === 0) {
      return res
        .status(404)
        .json({ message: "No rent transactions found for this book" });
    }

    //total rent, if rent amount is missing default to 0
    const totalRent = transactions.reduce(
      (sum, t) => sum + (t.rentAmount || 0),
      0
    );

    res.json({ totalRent });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid book ID format" });
    }
    next(error);
  }
};

export const getUserTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const transactions = await Transaction.find({
      user: userObjectId,
    }).populate("book");

    //if no tran. found for the user
    if (transactions.length === 0) {
      return res
        .status(404)
        .json({ message: "No transactions found for this user" });
    }
    res.json(transactions);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    next(error);
  }
};

export const getTransactionsByDateRange = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { startDate, endDate } = req.query;

    //have to validate that both start date and end date are string
    if (typeof startDate !== "string" || typeof endDate !== "string") {
      return res.status(400).json({ message: "Invalid date format" });
    }

    //find tran. with issuedate within this range
    const transactions = await Transaction.find({
      issueDate: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    }).populate("book user");

    // Check if any transactions were found
    if (transactions.length === 0) {
      return res.status(404).json({
        message: "No transactions found for the specified date range",
      });
    }
    res.json(transactions);
  } catch (error) {
    if (error instanceof Error && error.name === "InvalidDate") {
      return res.status(400).json({ message: "Invalid date format" });
    }
    next(error);
  }
};
