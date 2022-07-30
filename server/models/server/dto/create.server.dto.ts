export interface CreateServerDto {
  name: string;
  auth: {
    username: string;
    password: string;
  };
  host: string;
  status: boolean;
  cpu: string;
  ram: number;
  http: boolean;
  https: boolean;
}
