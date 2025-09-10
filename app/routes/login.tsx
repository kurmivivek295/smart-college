import { Form, redirect } from "react-router";
import type { Route } from "./+types/login";
import { getUserId, setAuthCookie } from "../auth.server";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

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
      <Card className="w-full max-w-md">
        <CardHeader className="pb-0">
          <CardTitle className="text-center text-2xl">
            Smart College Login
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-2">
          <Form method="post" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </Form>
          <p className="text-xs text-center text-muted-foreground">
            Demo: any email/password works
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
