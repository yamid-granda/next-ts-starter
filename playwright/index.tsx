import "./index.css"
import { beforeMount } from "@playwright/experimental-ct-react/hooks"
import { Providers } from "../src/app/providers"

beforeMount(async ({ App }) => {
  return (
    <Providers>
      <App />
    </Providers>
  )
})
