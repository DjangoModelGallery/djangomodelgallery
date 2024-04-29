import { create } from "zustand";

interface HistoryState {
  history: string[];
  prevPathname: string;
  setHistory: (pathname: string) => void;
}

export const useHistoryStore = create<HistoryState>((set, get) => ({
  history: [],
  prevPathname: "",
  setHistory: (pathname: string) => {
    const { history, prevPathname } = get();
    if (prevPathname !== pathname && !history.includes(pathname)) {
      set((state) => ({
        history: [...state.history, pathname],
        prevPathname: pathname,
      }));
    }
  },
}));
