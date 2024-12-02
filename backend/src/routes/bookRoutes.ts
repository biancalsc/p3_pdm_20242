import express from "express";
import { getBooks } from "../controllers/bookController";

const router = express.Router();

// Rota para obter todos os livros
router.get("/books", getBooks);

export default router;
