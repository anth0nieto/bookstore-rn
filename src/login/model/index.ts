export type User = {
  sessionTokenBck: string | null;
  firstname: string;
  lastName: string;
  email: string;
  active: boolean;
};

export type Credentials = {
  email: string;
  password: string;
};
