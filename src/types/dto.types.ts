export interface FilmDto {
  id: string;
  name: string;
  releaseDate: string;
  lengthInSeconds: number;
  category: string;
  applicationUserId: string;
  applicationUserName: string;
}

export interface GameDto {
  id: string;
  name: string;
  genre: string;
  price: number;
  releaseDate: string;
  applicationUserId: string;
  applicationUserName: string;
}

export interface RecipeDto {
  id: string;
  name: string;
  ingredients: string[];
  requiredTimeIntermsSeconds: number;
  recipeDescription: string;
  applicationUserId: string;
  applicationUserName: string;
}
