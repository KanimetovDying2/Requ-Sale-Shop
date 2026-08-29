import { create } from "zustand";

interface UserData {
  _id: string;
  username: string;
  displayName: string;
  phoneNumber: string;
}

interface UserState {
  user: UserData | null;
  token: string | null;
  setUserData: (user: UserData, token: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token"),

  setUserData: (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    set({ user, token });
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));
