import { Form, redirect } from "react-router";
import type { Route } from "./+types/login";
import { getUserId, setAuthCookie } from "../auth.server";

export async function loader({ request }: Route.LoaderArgs) {
  const user = getUserId(request);
  if (user) return redirect("/dashboard");
  return null;
}

export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();
  const email = String(form.get("email") || "").trim();
  const password = String(form.get("password") || "");
  if (!email || !password) {
    return { error: "Email and password required" };
  }
  // For demo always succeed and treat email as user id
  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": setAuthCookie(email),
    },
  });
}

export default function Login() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 border rounded-xl p-8 shadow-sm bg-white dark:bg-gray-900">
        <h1 className="text-2xl font-semibold text-center">
          Smart College Login
        </h1>
        <Form method="post" className="space-y-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full rounded-md border px-3 py-2 bg-transparent"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full rounded-md border px-3 py-2 bg-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Login
          </button>
        </Form>
        <p className="text-xs text-center text-gray-500">
          Demo: any email/password works
        </p>
      </div>
    </main>
  );
}
