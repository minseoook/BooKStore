import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreState {
  isloggedIn: boolean;
  isAdmin: number;
  token: string;
  loginAction: (token: string, isAdmin?: number) => void;
  logoutAction: () => void;
}

export const useAuthStore = create(
  persist<StoreState>(
    (set) => ({
      isloggedIn: false,
      isAdmin: 0,
      token: "",
      loginAction: (token: string, isAdmin?: number) => {
        set({ isloggedIn: true });
        set({ token: token });
        set({ isAdmin: isAdmin || 0 });
      },
      logoutAction: () => {
        set({ isloggedIn: false });
        set({ token: "" });
        set({ isAdmin: 0 });
      },
    }),
    { name: "auth" }
  )
);
