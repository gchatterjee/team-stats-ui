import React from "react";
import c from "classnames";
import { formatDuration, formatTime, TimeUnit } from "~/results/util";
import { SECTION_TEXT_INVALIDATED } from "../common";
import { SectionRow } from "~/components/section-rows";
import "./index.css";

interface RowProps {
  index: number;
  firstName: string;
  lastName: string;
  prTimeS: number;
  prevPrTimeS: number;
  prevPrRaceName: string;
  prevPrRaceDate: Date;
}

export default function Row({
  index,
  firstName,
  lastName,
  prTimeS,
  prevPrTimeS,
  prevPrRaceName,
  prevPrRaceDate,
}: RowProps) {
  const improvementS = prevPrTimeS - prTimeS;

  return (
    <SectionRow index={index} className="pr-row">
      <div className="pr-top">
        <div className="pr-left">
          <div className="pr-name">
            {firstName} {lastName}
          </div>
          <div className="pr-divider">&nbsp;•&nbsp;</div>
          <div className="pr-times">
            <span className={c(...SECTION_TEXT_INVALIDATED)}>
              <s>{formatTime(prevPrTimeS, TimeUnit.SECONDS)}</s>
            </span>{" "}
            {formatTime(prTimeS, TimeUnit.SECONDS)}
          </div>
        </div>
        <div className="pr-right">
          <div>{formatDuration(improvementS, TimeUnit.SECONDS)}</div>
          <div>&nbsp;NYRR PR</div>
        </div>
      </div>
      <div className="pr-bottom">
        Previous: {prevPrRaceName} (
        {prevPrRaceDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
        )
      </div>
    </SectionRow>
  );
}
