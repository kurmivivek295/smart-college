import { useCallback, useEffect, useState } from "react";

// Keys
const LECTURE_KEY = "sc_lecture_progress"; // { [chapterId]: true }
const EXERCISE_KEY = "sc_exercise_progress";

function read(key: string): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function write(key: string, value: Record<string, boolean>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

function useProgress(key: string) {
  const [data, setData] = useState<Record<string, boolean>>(() => read(key));

  useEffect(() => {
    setData(read(key));
  }, [key]);

  const toggle = useCallback((id: string) => {
    setData((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      write(key, next);
      return next;
    });
  }, [key]);

  return { data, toggle };
}

export function useLectureProgress() { return useProgress(LECTURE_KEY); }
export function useExerciseProgress() { return useProgress(EXERCISE_KEY); }
