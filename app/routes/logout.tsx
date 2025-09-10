import { redirect } from "react-router";
import type { Route } from "./+types/logout";
import { clearAuthCookie } from "../auth.server";

export async function action({}: Route.ActionArgs) {
  return redirect("/login", { headers: { "Set-Cookie": clearAuthCookie() } });
}

export default function Logout() {
  return null; // not rendered; form posts here
}
