import { Rating } from "./Rating";
import { User } from "./User.Schema";
export type Product = {
  user: User;
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  userId: string;
  quantity?: number;
  stock: number;
  discount: number;
  ratings: Rating[];
  hasSold: {
    quantity: number;
    userId: string;
    date: Date;
  };
};
