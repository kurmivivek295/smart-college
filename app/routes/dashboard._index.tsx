import type { Route } from "./+types/dashboard._index";
import { useSearchParams } from "react-router";
import { semesters } from "../data";
import { useExerciseProgress, useLectureProgress } from "../progress";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";

export async function loader({}: Route.LoaderArgs) {
  return null;
}

export default function DashboardHome() {
  const [params] = useSearchParams();
  const semesterId = params.get("semester") || semesters[0].id;
  const semester = semesters.find((s) => s.id === semesterId)!;
  const { data: lectures } = useLectureProgress();
  const { data: exercises } = useExerciseProgress();

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-semibold">Dashboard - {semester.name}</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {semester.subjects.map((subj) => {
          const lectureTotal = subj.chapters.length;
          const lectureDone = subj.chapters.filter(
            (c) => lectures[c.id]
          ).length;
          const exerciseDone = subj.chapters.filter(
            (c) => exercises[c.id]
          ).length;
          return (
            <Card key={subj.id} className="space-y-4 p-0">
              <CardHeader className="pb-0">
                <CardTitle className="text-sm font-medium">
                  {subj.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Metric
                  label="Lectures"
                  done={lectureDone}
                  total={lectureTotal}
                />
                <Metric
                  label="Exercises"
                  done={exerciseDone}
                  total={lectureTotal}
                />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function Metric({
  label,
  done,
  total,
}: {
  label: string;
  done: number;
  total: number;
}) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs font-medium">
        <span>{label}</span>
        <span className="text-muted-foreground">
          {done}/{total} ({pct}%)
        </span>
      </div>
      <Progress value={pct} />
    </div>
  );
}
