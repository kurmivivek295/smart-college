import {
  Form,
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router";
import type { Route } from "./+types/dashboard";
import { requireUser } from "../auth.server";
import { semesters } from "../data";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "~/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";

export async function loader({ request }: Route.LoaderArgs) {
  await requireUser(request);
  return { semesters };
}

export default function DashboardLayout({ loaderData }: Route.ComponentProps) {
  const { semesters } = loaderData;
  const [params, setParams] = useSearchParams();
  const semesterId = params.get("semester") || semesters[0].id;
  const location = useLocation();
  const navigate = useNavigate();
  const semester = semesters.find((s) => s.id === semesterId)!;

  function onSemesterChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newSem = e.target.value;
    // Always navigate back to dashboard root to avoid stale subjectId from previous semester
    params.set("semester", newSem);
    // Use navigate to ensure pathname reset, then sync search params
    navigate(`/dashboard?${params.toString()}`);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="h-14 border-b flex items-center justify-between px-4 bg-white dark:bg-gray-900">
        <div className="font-bold">Smart College</div>
        <div className="flex items-center gap-4">
          <select
            value={semesterId}
            onChange={onSemesterChange}
            className="border rounded px-2 py-1 bg-transparent"
          >
            {semesters.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                aria-label="Open profile menu"
                className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              >
                <Avatar>
                  <AvatarFallback className="bg-blue-600 text-white text-xs">
                    SC
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem asChild>
                <Link to="/dashboard/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild variant="destructive">
                <Form method="post" action="/logout">
                  <button type="submit" className="w-full text-left">
                    Logout
                  </button>
                </Form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 border-r p-4 space-y-6 overflow-y-auto bg-gray-50 dark:bg-gray-950">
          <div className="space-y-2">
            <SidebarLink
              to={`/dashboard?semester=${semesterId}`}
              active={location.pathname === "/dashboard"}
            >
              Home
            </SidebarLink>
          </div>
          <div>
            <p className="font-semibold text-sm mb-2">Lectures</p>
            <div className="space-y-1">
              {semester.subjects.map((subj) => (
                <SidebarLink
                  key={subj.id}
                  to={`/dashboard/lectures/${subj.id}?semester=${semesterId}`}
                  active={location.pathname.includes(
                    `/dashboard/lectures/${subj.id}`
                  )}
                >
                  {subj.name}
                </SidebarLink>
              ))}
            </div>
          </div>
          <div>
            <p className="font-semibold text-sm mb-2">Exercises</p>
            <div className="space-y-1">
              {semester.subjects.map((subj) => (
                <SidebarLink
                  key={subj.id}
                  to={`/dashboard/exercises/${subj.id}?semester=${semesterId}`}
                  active={location.pathname.includes(
                    `/dashboard/exercises/${subj.id}`
                  )}
                >
                  {subj.name}
                </SidebarLink>
              ))}
            </div>
          </div>
        </aside>
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function SidebarLink({
  to,
  active,
  children,
}: {
  to: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className={`block px-3 py-2 rounded text-sm ${
        active
          ? "bg-blue-600 text-white"
          : "hover:bg-gray-200 dark:hover:bg-gray-800"
      }`}
    >
      {children}
    </Link>
  );
}
