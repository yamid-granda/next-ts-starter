"use client"

import { useQuery } from "@tanstack/react-query"

type GreetingResponse = {
  message: string
  servedAt: string
}

async function fetchGreeting(): Promise<GreetingResponse> {
  const response = await fetch("/api/greeting")

  if (!response.ok) {
    throw new Error("Failed to load the greeting")
  }

  return response.json()
}

export function Greeting() {
  const { data, error, isPending, refetch } = useQuery({
    queryKey: ["greeting"],
    queryFn: fetchGreeting,
  })

  return (
    <section
      data-testid="greeting"
      className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
    >
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
          TanStack Query
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Server state</p>
      </div>

      <div className="mt-6 flex min-h-16 items-center">
        {isPending ? (
          <p data-testid="greeting-loading" className="text-sm text-zinc-500 dark:text-zinc-400">
            Loading…
          </p>
        ) : null}

        {error ? (
          <div className="flex items-center gap-3">
            <p className="text-sm text-red-600 dark:text-red-400">Could not load the greeting.</p>
            <button
              type="button"
              onClick={() => refetch()}
              className="text-sm font-medium text-zinc-900 underline underline-offset-4 dark:text-zinc-100"
            >
              Retry
            </button>
          </div>
        ) : null}

        {data ? (
          <div>
            <p
              data-testid="greeting-message"
              className="text-lg font-medium text-zinc-950 dark:text-zinc-50"
            >
              {data.message}
            </p>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Served at {new Date(data.servedAt).toLocaleTimeString()}
            </p>
          </div>
        ) : null}
      </div>
    </section>
  )
}
