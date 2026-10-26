"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export type LoginState = { error: string } | null

export async function login(_previousState: LoginState, formData: FormData): Promise<LoginState> {
  const email = formData.get("email")
  const password = formData.get("password")

  if (typeof email !== "string" || !email || typeof password !== "string" || !password) {
    return { error: "Email and password are required" }
  }

  // Demo only: replace with a real credential check.
  const fakeToken = "your-secure-jwt-token"

  const cookieStore = await cookies()

  cookieStore.set("token", fakeToken, {
    httpOnly: true, // Prevents client-side JS from reading the cookie
    secure: process.env.NODE_ENV === "production", // Use HTTPS in production
    sameSite: "lax", // Protects against CSRF attacks
    maxAge: 60 * 60 * 24 * 7, // 1 week in seconds
    path: "/", // Available across the whole site
  })

  redirect("/dashboard")
}
