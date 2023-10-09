import { User } from "./auth.types";

export interface Create {
  user: User;
  name: string;
  skills: string;
  food: string;
  slogan: string;
  color: string;
  hat: string;
  shirt: string;
  face: string;
}
