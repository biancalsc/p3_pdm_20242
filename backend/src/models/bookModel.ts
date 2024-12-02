import mongoose, { Schema, Document } from "mongoose";

// Definição do tipo para o livro
interface IBook extends Document {
  course: string;
  title: string;
  author: string;
  publisher: string;
  year: number;
}

// Definição do schema do livro
const bookSchema = new Schema<IBook>({
  course: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  publisher: { type: String, required: true },
  year: { type: Number, required: true },
});

// Criação do modelo
const Book = mongoose.model<IBook>("Book", bookSchema);

export default Book;
