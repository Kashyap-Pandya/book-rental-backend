import express from "express";
import {
  getBooks,
  getBooksByName,
  getBooksByRentRange,
  getBooksByMultipleParams,
  createBook,
} from "../controllers/bookController";

const router = express.Router();

router.post("/", createBook);
router.get("/", getBooks);
router.get("/search", getBooksByName);
router.get("/rent-range", getBooksByRentRange);
router.get("/multi-search", getBooksByMultipleParams);

export default router;
