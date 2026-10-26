import { Suspense } from "react"
import { Counter } from "@/components/counter"
import { Greeting } from "@/components/greeting"

const stack = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "Tailwind CSS 4",
  "Zustand",
  "TanStack Query",
  "Vitest",
  "Playwright",
  "Biome",
]

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 font-sans dark:bg-black">
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center gap-10 px-6 py-20">
        <header className="space-y-4">
          <span className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
            Starter template
          </span>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl dark:text-zinc-50">
            Next.js + TypeScript starter
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Biome, Zustand, TanStack Query, Tailwind CSS, Vitest and Playwright — wired together and
            ready to build on.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          <Counter />
          <Suspense fallback={<GreetingSkeleton />}>
            <Greeting />
          </Suspense>
        </div>

        <ul className="flex flex-wrap gap-2">
          {stack.map((item) => (
            <li
              key={item}
              className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400"
            >
              {item}
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

function GreetingSkeleton() {
  return (
    <section className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
          TanStack Query
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Server state</p>
      </div>
      <div className="mt-6 flex min-h-16 items-center">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Loading…</p>
      </div>
    </section>
  )
}
