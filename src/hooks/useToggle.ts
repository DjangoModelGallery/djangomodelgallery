// useToggle.ts
import { useState } from "react";

export function useToggle(initialState: boolean) {
  const [state, setState] = useState(initialState);
  const toggle = () => setState((state) => !state);

  return [state, toggle] as const;
}
