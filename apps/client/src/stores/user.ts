import { create } from "zustand";

type UserStore = {
  username: string;
  setUsername: (username: string) => void;
}

const useUserStore = create<UserStore>(set => ({
  username: '',
  setUsername: (username) => set({ username })
}))

export { useUserStore };