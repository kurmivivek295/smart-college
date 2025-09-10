// Simple in-memory profile store. In production replace with database.
export interface Profile {
  userId: string;
  firstName: string;
  lastName: string;
  stream: string;
  createdAt: number;
  updatedAt: number;
}

const profiles = new Map<string, Profile>();

export function getProfile(userId: string): Profile | null {
  return profiles.get(userId) || null;
}

export function upsertProfile(
  userId: string,
  data: Partial<Omit<Profile, "userId" | "createdAt" | "updatedAt">>
): Profile {
  const existing = profiles.get(userId);
  const now = Date.now();
  if (existing) {
    const updated: Profile = {
      ...existing,
      ...data,
      updatedAt: now,
    };
    profiles.set(userId, updated);
    return updated;
  }
  const created: Profile = {
    userId,
    firstName: data.firstName || "",
    lastName: data.lastName || "",
    stream: data.stream || "",
    createdAt: now,
    updatedAt: now,
  };
  profiles.set(userId, created);
  return created;
}
