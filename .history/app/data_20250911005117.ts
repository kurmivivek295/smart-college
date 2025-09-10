// Basic in-memory data model for semesters, subjects, chapters and videos
export type Chapter = {
  id: string;
  title: string;
  videoUrl: string; // placeholder url
};

export type Subject = {
  id: string;
  name: string;
  chapters: Chapter[];
};

export type Semester = {
  id: string;
  name: string;
  subjects: Subject[];
};

// Seed data (could later be fetched from API)
export const semesters: Semester[] = [
  {
    id: "sem1",
    name: "Semester 1",
    subjects: [
      {
        id: "maths",
        name: "Mathematics I",
        chapters: [
          { id: "limits", title: "Limits & Continuity", videoUrl: "https://example.com/video/limits" },
          { id: "derivatives", title: "Derivatives", videoUrl: "https://example.com/video/derivatives" },
          { id: "integration", title: "Integration Basics", videoUrl: "https://example.com/video/integration" }
        ]
      },
      {
        id: "physics",
        name: "Physics I",
        chapters: [
          { id: "kinematics", title: "Kinematics", videoUrl: "https://example.com/video/kinematics" },
          { id: "dynamics", title: "Dynamics", videoUrl: "https://example.com/video/dynamics" },
          { id: "waves", title: "Waves", videoUrl: "https://example.com/video/waves" }
        ]
      }
    ]
  },
  {
    id: "sem2",
    name: "Semester 2",
    subjects: [
      {
        id: "chemistry",
        name: "Chemistry I",
        chapters: [
          { id: "atomic", title: "Atomic Structure", videoUrl: "https://example.com/video/atomic" },
          { id: "bonding", title: "Chemical Bonding", videoUrl: "https://example.com/video/bonding" }
        ]
      },
      {
        id: "programming",
        name: "Programming Fundamentals",
        chapters: [
          { id: "intro", title: "Introduction", videoUrl: "https://example.com/video/intro" },
          { id: "variables", title: "Variables", videoUrl: "https://example.com/video/variables" },
          { id: "loops", title: "Loops", videoUrl: "https://example.com/video/loops" }
        ]
      }
    ]
  }
];

export function getSemester(id: string) {
  return semesters.find(s => s.id === id);
}

export function getSubject(semesterId: string, subjectId: string) {
  return getSemester(semesterId)?.subjects.find(s => s.id === subjectId);
}
