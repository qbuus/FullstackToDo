export type User = {
  username: string;
  email: string;
};

export type SignInBody = {
  username: string;
  password: string;
};

export type SignUpBody = {
  username: string;
  email: string;
  password: string;
};
