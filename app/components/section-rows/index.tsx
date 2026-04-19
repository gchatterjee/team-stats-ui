import React from "react";
import c from "classnames";
import { SECTION_BG, SECTION_BG_SECONDARY } from "~/sections/common";
import "./index.css";

interface SectionTableProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionTable({ children, className }: SectionTableProps) {
  return <div className={c("section-table", className)}>{children}</div>;
}

interface SectionRowProps {
  index: number;
  className?: string;
  children: React.ReactNode;
}

export function SectionRow({ index, className, children }: SectionRowProps) {
  const bg = index % 2 === 0 ? SECTION_BG_SECONDARY : SECTION_BG;
  return <div className={c("section-row", className, ...bg)}>{children}</div>;
}
