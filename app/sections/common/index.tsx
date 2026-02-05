import React, { type PropsWithChildren } from "react";
import c from "classnames";

export default function Section({ children }: PropsWithChildren) {
  return (
    <section className="bg-stone-200 dark:bg-stone-800 text-stone-950 dark:text-stone-200">
      {children}
    </section>
  );
}

export const SECTION_BADGE_BG = c("bg-stone-300", "dark:bg-stone-600");
export const SECTION_BADGE_BG_SECONDARY = c(
  "bg-stone-100",
  "dark:bg-stone-700",
);
