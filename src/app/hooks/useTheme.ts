import { create } from "zustand";

interface ThemeStore {
  theme: string;
  set: (theme: string) => void;
}

const useTheme = create<ThemeStore>((set) => ({
  theme: "light",
  set: (theme) => set({ theme }),
}));

export default useTheme;
