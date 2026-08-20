import { createFileRoute, redirect } from "@tanstack/react-router";

/** Legacy public URL — kept alive, now the Torino city page. */
export const Route = createFileRoute("/turin")({
  beforeLoad: () => {
    throw redirect({ to: "/cities/$slug", params: { slug: "torino" } });
  },
});
