import { BookCategory } from "./BookCategory";
import { BookImage } from "./BookImage";
import { OrderDetail } from "./OrderDetail";
import { Review } from "./Review";

export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  description?: string | null;
  stock: number;
  bookCategories: BookCategory[];
  images: BookImage[];
  orderDetails: OrderDetail[];
  reviews: Review[];
}