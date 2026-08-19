import type { ReactNode } from "react";
import type { World } from "@/content/site";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { ScrollProgress } from "./ScrollProgress";

/**
 * Wraps a page in one of the two personalities. Setting `data-world` here is
 * what swaps every accent token underneath — components never hard-code a
 * world colour.
 */
export function WorldFrame({
  world,
  children,
}: {
  world: World;
  children: ReactNode;
}) {
  return (
    <div data-world={world} className="relative min-h-screen">
      <ScrollProgress />
      <Nav world={world} />
      <main id="main">{children}</main>
      <Footer world={world} />
    </div>
  );
}
