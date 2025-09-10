import { Form, redirect } from "react-router";
import { requireUser } from "../auth.server";
import { getProfile, upsertProfile } from "../profiles.server";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";

export async function loader({ request }: { request: Request }) {
  const userId = await requireUser(request);
  const profile = getProfile(userId) || {
    firstName: "",
    lastName: "",
    stream: "",
  };
  return { profile };
}

export async function action({ request }: { request: Request }) {
  const userId = await requireUser(request);
  const form = await request.formData();
  const firstName = String(form.get("firstName") || "").trim();
  const lastName = String(form.get("lastName") || "").trim();
  const stream = String(form.get("stream") || "").trim();
  upsertProfile(userId, { firstName, lastName, stream });
  return redirect("/dashboard/profile");
}

// Use server-provided loaderData via useRouteLoaderData alternative if needed; here component props provide it.
export default function ProfilePage({
  loaderData,
}: {
  loaderData: {
    profile: { firstName: string; lastName: string; stream: string };
  };
}) {
  const { profile } = loaderData;
  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Student Information</CardTitle>
        </CardHeader>
        <Form method="post">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                defaultValue={profile.firstName}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                defaultValue={profile.lastName}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stream">Stream</Label>
              <Input
                id="stream"
                name="stream"
                placeholder="e.g. Computer Science"
                defaultValue={profile.stream}
              />
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button type="submit">Save</Button>
          </CardFooter>
        </Form>
      </Card>
    </div>
  );
}
