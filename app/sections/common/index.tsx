import React, { type PropsWithChildren } from "react";
import c from "classnames";

export const SECTION_BG = ["bg-stone-200", "dark:bg-stone-800"];
export const SECTION_BG_SECONDARY = ["bg-white", "dark:bg-stone-900"];

export const SECTION_TEXT = ["text-stone-950", "dark:text-stone-200"];
export const SECTION_TEXT_INVALIDATED = ["text-red-800", "dark:text-red-400"];

export default function Section({ children }: PropsWithChildren) {
  return (
    <section className={c(...SECTION_BG, ...SECTION_TEXT)}>{children}</section>
  );
}

export const SECTION_BADGE_BG = c("bg-stone-300", "dark:bg-stone-600");
export const SECTION_BADGE_BG_SECONDARY = c(
  "bg-stone-100",
  "dark:bg-stone-700",
);
