import { create } from "zustand";

type State = {
  history: string;
  setHistory: (slug: string) => void;
};

export const useHistoryStore = create<State>((set) => ({
  history: "",
  setHistory: (slug) => set({ history: slug }),
}));
