export interface PutServerDto {
  name: string;
  username: string;
  password: string;
  ip: string;
  status: boolean;
  cpu: string;
  ram: number;
  http: boolean;
  https: boolean;
}
