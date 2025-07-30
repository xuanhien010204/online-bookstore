import { Book } from "./Book";
import { Order } from "./Order";

export interface OrderDetail {
  id: number;
  orderId: number;
  order: Order;
  bookId: number;
  book: Book;
  quantity: number;
  unitPrice: number;
}