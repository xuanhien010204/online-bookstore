import { Order } from "./Order";
import { Review } from "./Review";

export enum Role {
  User = 'User',
  Admin = 'Admin'
}

export interface User {
  id: number;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  gender?: string | null;
  address?: string | null;
  phone?: string | null;
  role: Role;
  avatarUrl?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt?: Date | null;
  orders: Order[];
  reviews: Review[];
}