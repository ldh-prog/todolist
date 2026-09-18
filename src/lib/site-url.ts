// src/lib/site-url.ts
export function resolveSiteUrl(input: {
  origin?: string | null;
  host?: string | null;
  proto?: string | null;
  explicit?: string | null;
  vercelUrl?: string | null;
}): string {
  const origin = input.origin?.replace(/\/$/, "");
  if (origin) {
    return origin;
  }

  const host = input.host?.trim();
  if (host) {
    const proto = input.proto?.trim() || "https";
    return `${proto}://${host}`;
  }

  const explicit = input.explicit?.replace(/\/$/, "");
  if (explicit) {
    return explicit;
  }

  const vercelUrl = input.vercelUrl?.replace(/^https?:\/\//, "");
  if (vercelUrl) {
    return `https://${vercelUrl}`;
  }

  return "http://localhost:3000";
}
