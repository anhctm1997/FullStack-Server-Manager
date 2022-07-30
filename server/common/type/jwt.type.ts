import { Jwt } from "jsonwebtoken";

export type jwtType = {
  refreshKey: string;
  userName: string;
  isAdmin: number;
};
export interface JwtDecode extends Jwt {
  payload: {
    _id: string;
    username: string;
    isAdmin: number;
  };
}
