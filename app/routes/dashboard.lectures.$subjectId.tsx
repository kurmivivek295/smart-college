import type { Route } from "./+types/dashboard.lectures.$subjectId";
import { useParams, useSearchParams } from "react-router";
import { semesters } from "../data";
import { useLectureProgress } from "../progress";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";

export async function loader({}: Route.LoaderArgs) {
  return null;
}

export default function LecturesSubject() {
  const { subjectId } = useParams<"subjectId">();
  const [params] = useSearchParams();
  const semesterId = params.get("semester") || semesters[0].id;
  const semester = semesters.find((s) => s.id === semesterId)!;
  const subject = semester.subjects.find((s) => s.id === subjectId);
  if (!subject) {
    return (
      <div className="text-sm text-muted-foreground">
        Subject not found for this semester. Please pick a subject from the
        sidebar.
      </div>
    );
  }
  const { data, toggle } = useLectureProgress();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Lectures - {subject.name}</h1>
      <div className="space-y-4">
        {subject.chapters.map((ch) => (
          <Card key={ch.id} className="p-0">
            <CardHeader className="pb-2 flex flex-row items-start gap-3">
              <Checkbox
                checked={!!data[ch.id]}
                onCheckedChange={() => toggle(ch.id)}
                className="mt-1"
                aria-label="Mark lecture complete"
              />
              <CardTitle className="text-sm font-medium flex-1">
                {ch.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-xs text-muted-foreground">
              Video URL:{" "}
              <a
                href={ch.videoUrl}
                className="text-primary underline-offset-4 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Open
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
