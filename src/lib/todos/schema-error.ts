// src/lib/todos/schema-error.ts
export function isMissingTableError(message: string, table?: string): boolean {
  const normalized = message.toLowerCase();
  const missing =
    normalized.includes("could not find the table") ||
    (normalized.includes("relation") && normalized.includes("does not exist")) ||
    normalized.includes("schema cache");

  if (!missing) {
    return false;
  }

  if (!table) {
    return true;
  }

  return normalized.includes(table.toLowerCase());
}

export function isMissingTodosTableError(message: string): boolean {
  return isMissingTableError(message, "todos");
}

export function isMissingShoppingTableError(message: string): boolean {
  return isMissingTableError(message, "shopping_items");
}
