import { OrderDetail } from "./OrderDetail";
import { User } from "./User";

export interface Order {
    id: number;
    userId: number;
    user: User;
    orderDate: Date;
    totalAmount: number;
    status: string;
    shippingAddress: string;
    orderDetails: OrderDetail[];
}