import { Request, Response, NextFunction } from "express";
import Book from "../models/Book";

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, category, rentPerDay } = req.body;
    const book = new Book({ name, category, rentPerDay });
    await book.save();
    res.status(201).json(book);
  } catch (error: any) {
    // Handle duplicate key error for case-insensitive book names in mongo
    if (error.code === 11000) {
      res
        .status(400)
        .json({ message: "A book with this name already exists." });
    } else {
      next(error);
    }
  }
};

export const getBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const books = await Book.find();

    //check if no books were found
    if (books.length === 0) {
      return res
        .status(404)
        .json({ message: "No books found, create a book." });
    }
    res.json(books);
  } catch (error) {
    next(error);
  }
};

export const getBooksByName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { term } = req.query;

    //case - insensitive search
    const books = await Book.find({ name: new RegExp(term as string, "i") });

    //if no matching books
    if (books.length === 0) {
      return res.status(404).json({ message: "No books by the search name" });
    }
    res.json(books);
  } catch (error) {
    next(error);
  }
};

//keeping values from 1 to 9 in db
export const getBooksByRentRange = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { min, max } = req.query;
    //find books that matches tha para, converting string to number
    const books = await Book.find({
      rentPerDay: { $gte: Number(min), $lte: Number(max) },
    });

    // Check if no books were found within the rent range
    if (books.length === 0) {
      return res
        .status(404)
        .json({ message: "No books found in the specified rent range." });
    }
    res.json(books);
  } catch (error) {
    next(error);
  }
};

export const getBooksByMultipleParams = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { category, term, minRent, maxRent } = req.query;

    //save it in query
    const query: any = {};

    //if category is provided
    if (category) query.category = category;

    //if term is provided
    if (term) query.name = new RegExp(term as string, "i");

    if (minRent || maxRent) {
      query.rentPerDay = {};

      //maximum rent
      if (minRent) query.rentPerDay.$gte = Number(minRent);

      //minimum rent
      if (maxRent) query.rentPerDay.$lte = Number(maxRent);
    }

    const books = await Book.find(query);

    //no books found with given criteria
    if (books.length === 0) {
      return res
        .status(404)
        .json({ message: "No books found with the specified criteria." });
    }
    res.json(books);
  } catch (error) {
    next(error);
  }
};
