import React from "react";
import c from "classnames";
import type { TeamRunner } from "~/types";
import { SECTION_BG, SECTION_BG_SECONDARY } from "../common";
import "./index.css";
import { getAgeGroup } from "./utils";
import { SectionRow } from "~/components/section-rows";

interface Props {
  index: number;
  runner: TeamRunner;
}
export default function Row({ index, runner }: Props) {
  const inverseBg = index % 2 === 0 ? SECTION_BG : SECTION_BG_SECONDARY;

  return (
    <SectionRow index={index} className="t10-row">
      <div className="t10-left">
        <div className="t10-place-container">
          <div className={c("t10-place", ...inverseBg)}>
            <div>{runner.ageGroupPlace}</div>
          </div>
        </div>
        <div className="t10-runner-info">
          <div>
            {runner.firstName} {runner.lastName} ({runner.gender}
            {runner.age})
          </div>
          <div className="t10-age-group">
            in {runner.gender}
            {getAgeGroup(runner.age).join("-")} age group
          </div>
        </div>
      </div>
      <div>
        <div>{runner.overallTime}</div>
      </div>
    </SectionRow>
  );
}
