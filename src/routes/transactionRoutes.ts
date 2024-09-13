import express from "express";
import {
  issueBook,
  returnBook,
  getBookTransactions,
  getBookRentTotal,
  getUserTransactions,
  getTransactionsByDateRange,
} from "../controllers/transactionController";

const router = express.Router();

router.post("/issue", issueBook);
router.post("/return", returnBook);
router.get("/book/:bookId", getBookTransactions);
router.get("/book/:bookId/rent-total", getBookRentTotal);
router.get("/user/:userId", getUserTransactions);
router.get("/date-range", getTransactionsByDateRange);

export default router;
