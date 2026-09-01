function firstNonEmpty(...values: Array<string | undefined>): string {
  for (const value of values) {
    if (typeof value === "string" && value.length > 0) return value;
  }
  return "";
}

export function getSiteUrl(): string {
  const fromProcess =
    typeof process !== "undefined"
      ? firstNonEmpty(process.env["SITE_URL"], process.env["VITE_SITE_URL"], process.env["RENDER_EXTERNAL_URL"])
      : "";
  const fromVite = firstNonEmpty(import.meta.env["VITE_SITE_URL"] as string | undefined);
  return firstNonEmpty(fromProcess, fromVite).replace(/\/$/, "");
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return base ? `${base}${normalized}` : normalized;
}
