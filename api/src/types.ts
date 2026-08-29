import { Types } from "mongoose";
import { Request } from "express";
import { HydratedDocument, Model } from "mongoose";

export interface UserFields {
  username: string;
  password: string;
  token: string;
  displayName: string;
  phoneNumber: string;
}

export type UserWithoutId = Omit<UserFields, "token">;

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;

export interface RequestWithUser extends Request {
  user?: HydratedDocument<UserFields, UserMethods>;
}

export interface CategoryFields {
  name: string;
}

export interface ItemFields {
  title: string;
  description: string;
  price: number;
  image?: string;
  category: Types.ObjectId;
  user: Types.ObjectId;
}

export type ItemWithoutId = Omit<ItemFields, "user">;
