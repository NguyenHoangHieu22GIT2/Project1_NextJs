import { Rating } from "./Rating";
export type Product = {
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
};
