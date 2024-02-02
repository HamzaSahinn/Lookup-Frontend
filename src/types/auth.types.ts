import { JwtPayload } from "jwt-decode";

export interface IAuthContext {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    id: string;
  };
  isAuthenticated: boolean;
}

export interface CustomJWTPayload extends JwtPayload {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  isAuthenticated: boolean;
}
