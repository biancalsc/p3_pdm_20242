import { Request, Response } from "express";
import path from "path";
import fs from "fs";

// Caminho para o arquivo JSON
const booksFilePath = path.join(__dirname, "../database/books.json");

// Função para obter os livros
export const getBooks = async (req: Request, res: Response) => {
  try {
    // Lê o arquivo JSON
    const data = fs.readFileSync(booksFilePath, "utf-8");
    // Converte os dados para JSON
    const books = JSON.parse(data);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Erro ao carregar os livros", error });
  }
};
