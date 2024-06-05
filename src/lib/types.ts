export type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export type PostData = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type UserData = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export type Post = {
  body: string;
  id: number;
  name: string;
  username: string;
  userId: number;
  title: string;
};

export type User = {
  name: string;
  userId: number;
  username: string;
};

export type ComponentStoreProp = {
  users: User[];
  posts: Post[];
};

export type AppReducerData = null | {
  posts: Post[];
  users: User[];
  filteredUsers: User[];
  filteredPosts: Post[];
  selectedUserId: SelectedUserId;
  updateSelectedUserId: (userId: SelectedUserId) => void;
};

export type UserStore = { [id: number]: User };
export type SelectedUserId = number | null;
