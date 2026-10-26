import { create } from "zustand"

export type CounterState = {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

export const initialCounterState = { count: 0 }

export const useCounterStore = create<CounterState>()((set) => ({
  ...initialCounterState,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set(initialCounterState),
}))
