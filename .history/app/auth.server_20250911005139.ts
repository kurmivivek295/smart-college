import { redirect } from "react-router";

const AUTH_COOKIE = "sc_auth";

export function getUserId(request: Request): string | null {
  const cookie = request.headers.get("Cookie") || "";
  const match = cookie.match(new RegExp(`${AUTH_COOKIE}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export async function requireUser(request: Request) {
  const userId = getUserId(request);
  if (!userId) throw redirect("/login");
  return userId;
}

export function setAuthCookie(userId: string) {
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 1 week
  return `${AUTH_COOKIE}=${encodeURIComponent(userId)}; Path=/; HttpOnly; SameSite=Lax; Expires=${expires.toUTCString()}`;
}

export function clearAuthCookie() {
  return `${AUTH_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}
