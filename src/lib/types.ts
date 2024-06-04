export type RawPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type Post = {
  body: string;
  id: string;
  name: string;
  username: string;
  userId: string;
  title: string;
};

export type User = {
  id: string;
  name: string;
  username: string;
};
