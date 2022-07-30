export type AuthResJwt = {
  _id: string;
  username: string;
  isAdmin: number;
  refreshKey: {
    type: string;
    data: [number];
  };
  iat: number;
  exp: number;
};
