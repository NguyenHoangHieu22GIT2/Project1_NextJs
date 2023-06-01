export interface Rating {
  title: string;
  userId: string;
  createdAt: Date;
  downvote: string[];
  upvote: string[];
  stars: number;
  rating: string;
  _id: string;
}
