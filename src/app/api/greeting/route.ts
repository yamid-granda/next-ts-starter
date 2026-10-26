export async function GET() {
  return Response.json({
    message: "Hello from the Route Handler",
    servedAt: new Date().toISOString(),
  })
}
