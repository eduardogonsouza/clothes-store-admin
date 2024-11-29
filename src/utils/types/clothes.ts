import { ClothingBrandI } from "./clothingBrand";
import { CommentI } from "./comments";

export interface ClotheI {
  id: number;
  name: string;
  price: string;
  description: string;
  size: string;
  highlight: boolean;
  photo: string;
  clothingBrandId: number;
  createdAt: string;
  updatedAt: string;
  clothingBrand: ClothingBrandI;
  comments: CommentI[];
}
