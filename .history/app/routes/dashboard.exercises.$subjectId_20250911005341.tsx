import type { Route } from "./+types/dashboard.exercises.$subjectId";
import { useParams, useSearchParams } from "react-router";
import { semesters } from "../data";
import { useExerciseProgress } from "../progress";

export async function loader({}: Route.LoaderArgs) { return null; }

export default function ExercisesSubject() {
  const { subjectId } = useParams<"subjectId">();
  const [params] = useSearchParams();
  const semesterId = params.get("semester") || semesters[0].id;
  const semester = semesters.find(s => s.id === semesterId)!;
  const subject = semester.subjects.find(s => s.id === subjectId)!;
  const { data, toggle } = useExerciseProgress();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Exercises - {subject.name}</h1>
      <ul className="space-y-4">
        {subject.chapters.map(ch => (
          <li key={ch.id} className="border rounded p-4 flex items-start gap-4 bg-white dark:bg-gray-900">
            <input type="checkbox" checked={!!data[ch.id]} onChange={() => toggle(ch.id)} className="mt-1" />
            <div className="space-y-2 flex-1">
              <div className="font-medium text-sm">{ch.title}</div>
              <div className="text-xs text-gray-500">Exercise Video: <a href={ch.videoUrl} className="text-blue-600" target="_blank" rel="noreferrer">Open</a></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
