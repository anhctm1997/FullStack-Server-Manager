export interface PutUserDto {
  username: string;
  password: string;
  isAdmin?: number;
  email: string;
  name: string;
}
