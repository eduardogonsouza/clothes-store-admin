import { UserI } from "./user";

export interface CommentI {
  id: number;
  content: string;
  userId: string;
  clotheId: number;
  createdAt: string;
  user: UserI;
}
