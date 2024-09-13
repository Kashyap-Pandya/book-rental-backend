import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
  name: string;
  category: string;
  rentPerDay: number;
}

const BookSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    rentPerDay: { type: Number, required: true },
  },
  { timestamps: true, collation: { locale: "en", strength: 2 } }
);
BookSchema.index(
  { name: 1 },
  { unique: true, collation: { locale: "en", strength: 2 } }
);

export default mongoose.model<IBook>("Book", BookSchema);
