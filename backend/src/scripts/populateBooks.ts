import { connect } from "../database/connection";
import { Book } from "../models/bookModel";
import books from "../database/books.json";

(async function populateBooks() {
  try {
    await connect();
    await Book.deleteMany(); // Limpa os dados existentes
    await Book.insertMany(books);
    console.log("Livros inseridos com sucesso!");
    process.exit(0);
  } catch (error) {
    console.error("Erro ao popular os livros:", error);
    process.exit(1);
  }
})();
