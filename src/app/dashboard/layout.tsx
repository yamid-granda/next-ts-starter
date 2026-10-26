import Link from "next/link"

const dashboards = [
  { href: "/dashboard/dashboard-1", label: "Dashboard 1" },
  { href: "/dashboard/dashboard-2", label: "Dashboard 2" },
]

export default function DashboardPageLayout({ children }) {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center gap-6 px-6 py-20">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Dashboard
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">Pick a dashboard to open.</p>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2">
        {dashboards.map((dashboard) => (
          <li key={dashboard.href}>
            <Link
              href={dashboard.href}
              className="flex h-24 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-sm font-medium text-zinc-900 shadow-sm transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
            >
              {dashboard.label}
            </Link>
          </li>
        ))}
      </ul>

      <div>{children}</div>
    </main>
  )
}
