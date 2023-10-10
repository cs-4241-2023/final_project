export interface Create {
  username: string;
  name: string;
  skills: string;
  food: string;
  slogan: string;
  color: string;
  hat: string;
  shirt: string;
  face: string;
}

export interface Update extends Create {
  _id: string;
}
