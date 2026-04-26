import React, { type PropsWithChildren } from "react";
import c from "classnames";

export const SECTION_BG = ["bg-stone-200", "dark:bg-stone-800"];
export const SECTION_BG_SECONDARY = ["bg-white", "dark:bg-stone-900"];

export const SECTION_BG_HOVER = ["hover:bg-white", "dark:hover:bg-stone-900"];
export const SECTION_BG_SECONDARY_HOVER = [
  "hover:bg-stone-200",
  "dark:hover:bg-stone-800",
];

export const CONTROL = [
  "bg-stone-300",
  "dark:bg-stone-700",
  "hover:bg-white",
  "dark:hover:bg-stone-900",
];
export const CONTROL_SELECTED = [
  "bg-white",
  "dark:bg-stone-900",
  "hover:bg-stone-300",
  "dark:hover:bg-stone-700",
];

export const SECTION_TEXT = ["text-stone-950", "dark:text-stone-200"];
export const SECTION_TEXT_INVALIDATED = ["text-red-800", "dark:text-red-400"];

export const SECTION_BADGE_BG = c("bg-stone-300", "dark:bg-stone-600");
export const SECTION_BADGE_BG_SECONDARY = c(
  "bg-stone-100",
  "dark:bg-stone-700",
);

export default function Section({ children }: PropsWithChildren) {
  return (
    <section className={c(...SECTION_BG, ...SECTION_TEXT)}>{children}</section>
  );
}

const orderArgs = <T,>(a: T, b: T, asc: boolean): [T, T] =>
  asc ? [b, a] : [a, b];

export const getAlphabeticalSortFn =
  <T,>(key: keyof T) =>
  (asc: boolean) =>
  (itemA: T, itemB: T) => {
    const [a, b] = orderArgs(itemA, itemB, asc);
    return `${a[key]}`.localeCompare(`${b[key]}`);
  };

export const getNumericalSortFn =
  <T,>(key: keyof T) =>
  (asc: boolean) =>
  (itemA: T, itemB: T) => {
    const [a, b] = orderArgs(itemA, itemB, asc);
    return (a[key] as number) - (b[key] as number);
  };

export const getReverseNumericalSortFn =
  <T,>(key: keyof T) =>
  (asc: boolean) =>
  (itemA: T, itemB: T) => {
    const [a, b] = orderArgs(itemA, itemB, asc);
    return (b[key] as number) - (a[key] as number);
  };
