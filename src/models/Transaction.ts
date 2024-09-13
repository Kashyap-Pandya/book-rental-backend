import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
  book: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  issueDate: Date;
  returnDate?: Date;
  rentAmount?: number;
}

const TransactionSchema: Schema = new Schema(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    issueDate: { type: Date, required: true },
    returnDate: { type: Date },
    rentAmount: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model<ITransaction>("Transaction", TransactionSchema);
