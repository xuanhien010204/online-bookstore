import { BookCategory } from "./BookCategory";

export interface Category {
  id: number;
  name: string;
  description?: string | null;
  bookCategories: BookCategory[];
}