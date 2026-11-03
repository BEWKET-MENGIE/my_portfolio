export function getBackendApiUrl() {
  const configuredUrl = (
    process.env.BACKEND_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    ""
  ).trim();
  const baseUrl = configuredUrl || "http://127.0.0.1:4000/api";

  return baseUrl
    .replace(/^https?:\/\/localhost(?=[:/]|$)/i, "http://127.0.0.1")
    .replace(/^https?:\/\/\[::1\](?=[:/]|$)/i, "http://127.0.0.1")
    .replace(/\/+$/, "");
}
