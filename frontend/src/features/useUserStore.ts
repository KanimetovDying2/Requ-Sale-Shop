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

const getStoredUser = (): UserData | null => {
  try {
    const stored = localStorage.getItem("user");
    if (!stored || stored === "undefined") return null;
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

const getStoredToken = (): string | null => {
  const token = localStorage.getItem("token");
  if (!token || token === "undefined") return null;
  return token;
};

export const useUserStore = create<UserState>((set) => ({
  user: getStoredUser(),
  token: getStoredToken(),

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
