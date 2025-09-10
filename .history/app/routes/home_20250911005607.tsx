import type { Route } from "./+types/home";
import { redirect } from "react-router";
import { getUserId } from "../auth.server";

export async function loader({ request }: Route.LoaderArgs) {
  const user = getUserId(request);
  if (user) return redirect("/dashboard");
  return redirect("/login");
}

export default function IndexRedirect() {
  return null;
}
