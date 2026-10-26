"use client"

import { cn } from "@/lib/utils"
import { useCounterStore } from "@/stores/counter-store"

const buttonBase =
  "inline-flex h-9 items-center justify-center rounded-lg px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:focus-visible:outline-zinc-100"

const primaryButton =
  "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"

const secondaryButton =
  "border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900"

export function Counter() {
  const count = useCounterStore((state) => state.count)
  const increment = useCounterStore((state) => state.increment)
  const decrement = useCounterStore((state) => state.decrement)
  const reset = useCounterStore((state) => state.reset)

  return (
    <section
      data-testid="counter"
      className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            Zustand
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Client state</p>
        </div>
        <span
          data-testid="count"
          className="text-4xl font-semibold tabular-nums text-zinc-950 dark:text-zinc-50"
        >
          {count}
        </span>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        <button type="button" onClick={decrement} className={cn(buttonBase, secondaryButton)}>
          Decrement
        </button>
        <button type="button" onClick={increment} className={cn(buttonBase, primaryButton)}>
          Increment
        </button>
        <button type="button" onClick={reset} className={cn(buttonBase, secondaryButton)}>
          Reset
        </button>
      </div>
    </section>
  )
}
