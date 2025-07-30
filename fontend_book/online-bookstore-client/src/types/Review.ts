import { Book } from "./Book";
import { User } from "./user";

export interface Review {
  id: number;
  bookId: number;
  book: Book;
  userId: number;
  user: User
  rating: number;
  comment: string;
  createdAt: Date;
}