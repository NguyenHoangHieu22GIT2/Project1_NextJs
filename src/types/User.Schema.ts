export interface User {
  _id: string;
  email: string;
  username: string;
  avatar: string;
  cart: { items: [{ productId: string; quantity: number }] };
  isOnline: boolean;
  reputation: number;
}
