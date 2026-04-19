import React from "react";
import type { TeamAwardRunner } from "~/types";
import { formatTime } from "~/results/util";
import { SectionRow } from "~/components/section-rows";
import "./index.css";

interface Props {
  index: number;
  runner: TeamAwardRunner;
}
export default function Row({ runner, index }: Props) {
  return (
    <SectionRow index={index} className="award-row">
      <div className="award-content">
        <div>
          {runner.firstName} {runner.lastName}
        </div>
        <div>{formatTime(runner.finishTime)}</div>
      </div>
    </SectionRow>
  );
}
