import { UserI } from "./user";

export interface RatingI {
  id: number;
  score: number;
  userId: string;
  clotheId: number;
  createdAt: string;
  user: UserI;
}
