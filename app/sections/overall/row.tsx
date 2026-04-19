import React, { useState } from "react";
import c from "classnames";
import type { TeamRunner } from "~/types";
import { SECTION_BG, SECTION_BG_SECONDARY, SECTION_TEXT } from "../common";
import { Iaaf } from "~/components/iaaf";
import { getAgeGroup } from "../top-ten-finishers/utils";
import { SectionRow } from "~/components/section-rows";

interface Props {
  index: number;
  runner: TeamRunner;
}
export default function Row({ index, runner }: Props) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const bgInverse = index % 2 === 0 ? SECTION_BG : SECTION_BG_SECONDARY;
  return (
    <button onClick={() => setIsCollapsed((old) => !old)}>
      <SectionRow index={index} className="oa-row">
        <div className="oa-top">
          <div className="oa-left">
            <div className="oa-place-container">
              <div className={c("oa-place", ...bgInverse)}>
                {runner.overallPlace}
              </div>
            </div>
            <div className="oa-data">
              <div className="oa-runner-info">
                <div className="oa-id">
                  <div>{runner.firstName}&nbsp;</div>
                  <div>{runner.lastName}&nbsp;</div>
                  <div>
                    ({runner.gender}
                    {runner.age} <Iaaf code={runner.iaaf} />)
                  </div>
                </div>
                <div className="oa-city">
                  {runner.city}, {runner.stateProvince}
                </div>
              </div>
            </div>
          </div>
          <div className="oa-right">
            <div className="oa-pace-details">
              <div>{runner.overallTime}</div>
              <div>{runner.pace}/mi.</div>
            </div>
            <div className={c("oa-expand-button", ...SECTION_TEXT)}>
              {isCollapsed ? "▾" : "▴"}
            </div>
          </div>
        </div>
        <div className={c("oa-bottom", isCollapsed && "hidden")}>
          <div className="oa-gender-place">
            <div className={c("oa-place-numeric", ...bgInverse)}>
              {runner.genderPlace}
            </div>
            &nbsp;in {runner.gender}
          </div>
          <div className="oa-age-grade-place">
            <div className={c("oa-place-numeric", ...bgInverse)}>
              {runner.ageGradePlace}
            </div>
            &nbsp;age graded ({runner.ageGradePercent}%)
          </div>
          <div className="oa-age-group-place">
            <div className={c("oa-place-numeric", ...bgInverse)}>
              {runner.ageGroupPlace}
            </div>
            &nbsp;in {runner.gender}
            {getAgeGroup(runner.age).join("-")}
          </div>
        </div>
      </SectionRow>
    </button>
  );
}
