export interface UserData {
  _id: string;
  username: string;
  displayName: string;
  phoneNumber: string;
}

export interface Category {
  _id: string;
  name: string;
}

export interface Item {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  user: UserData;
}

export interface ApiError {
  response?: {
    data?: {
      error?: string;
    };
  };
}
