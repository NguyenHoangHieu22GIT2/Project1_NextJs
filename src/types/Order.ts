import { Product } from "./Product";

export type Order = {
  _id: string;
  userId: string;
  products: Product[];
  date: Date;
};
