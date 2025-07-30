import { Book } from "./Book";
import { Category } from "./Category";

export interface BookCategory {
  id: number;
  bookId: number;
  book: Book;
  categoryId: number;
  category: Category;
}