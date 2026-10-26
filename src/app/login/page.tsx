"use client"

import { useActionState } from "react"
import { login } from "@/app/actions/auth"

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, null)

  return (
    <div>
      <form action={formAction}>
        <div>
          <label>
            Email{" "}
            <input
              required
              id="email"
              type="email"
              autoComplete="email"
              className="border"
              name="email"
            />
          </label>
        </div>

        <div>
          <label>
            Password{" "}
            <input
              type="password"
              required
              id="password"
              autoComplete="current-password"
              className="border"
              name="password"
            />
          </label>
        </div>

        {state?.error && (
          <p role="alert" aria-live="polite" style={{ color: "red", fontSize: "14px" }}>
            {state.error}
          </p>
        )}

        <div>
          <button disabled={isPending} type="submit">
            {isPending ? "... loading ..." : "Sign in"}
          </button>
        </div>
      </form>
    </div>
  )
}
