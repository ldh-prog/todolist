// src/lib/todos/schema-error.ts
export function isMissingTodosTableError(message: string): boolean {
  const normalized = message.toLowerCase();

  return (
    normalized.includes("could not find the table") ||
    (normalized.includes("relation") && normalized.includes("does not exist")) ||
    normalized.includes("schema cache")
  );
}
