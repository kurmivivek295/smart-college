import type { Route } from "./+types/dashboard._index";
import { useSearchParams } from "react-router";
import { semesters } from "../data";
import { useExerciseProgress, useLectureProgress } from "../progress";

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
            <div
              key={subj.id}
              className="rounded-lg border p-4 space-y-2 bg-white dark:bg-gray-900"
            >
              <h2 className="font-medium text-sm">{subj.name}</h2>
              <ProgressBar
                label="Lectures"
                done={lectureDone}
                total={lectureTotal}
              />
              <ProgressBar
                label="Exercises"
                done={exerciseDone}
                total={lectureTotal}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProgressBar({
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
      <div className="flex justify-between text-xs">
        <span>{label}</span>
        <span>
          {done}/{total} ({pct}%)
        </span>
      </div>
      <div className="h-2 rounded bg-gray-200 dark:bg-gray-800 overflow-hidden">
        <div style={{ width: pct + "%" }} className="h-full bg-blue-600" />
      </div>
    </div>
  );
}
