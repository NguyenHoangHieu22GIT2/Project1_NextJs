export type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  userId: string;
  quantity?: number;
  stock: number;
  discount: number;
};
