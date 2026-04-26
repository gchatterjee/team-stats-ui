import React from "react";
import c from "classnames";
import type { TeamRunner } from "~/types";
import { SECTION_BG_SECONDARY } from "../common";

import "./chips.css";

interface RunnerIdChipsProps {
  runners: TeamRunner[];
}
export default function RunnerIdChips({ runners }: RunnerIdChipsProps) {
  const names = [
    ...runners.map(({ firstName, lastName }) => ({ firstName, lastName })),
  ]
    .sort((a, b) => a.lastName.localeCompare(b.lastName))
    .map(({ firstName, lastName }) => `${firstName} ${lastName}`);

  return (
    <div className="chips">
      {names.map((name) => (
        <div key={name} className={c("chip", ...SECTION_BG_SECONDARY)}>
          {name}
        </div>
      ))}
    </div>
  );
}
