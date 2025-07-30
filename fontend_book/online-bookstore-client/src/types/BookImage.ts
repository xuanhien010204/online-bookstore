import { Book } from "./Book";

export interface BookImage {
  id: number;
  bookId: number;
  book: Book;
}