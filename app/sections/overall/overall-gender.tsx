import React from "react";
import {
  GENDER_LABELS,
  getTotalFinishersForGender,
  type Partitioned,
} from "../../results/util";
import { Gender, type AugmentedRunnerRace } from "~/types";
import FullResultTable from "./table";
import { SECTION_BADGE_BG_SECONDARY } from "../common";
import CountBadge from "~/components/count-badge";

interface OverallGenderProps {
  eventCode: string;
  results: Partitioned;
  gender: Gender;
  runners: Record<number, AugmentedRunnerRace[]>;
}
export default function OverallGender({
  eventCode,
  results,
  gender,
  runners,
}: OverallGenderProps) {
  const total = getTotalFinishersForGender(gender, results);

  if (total === 0) return <></>;

  const genderResults = results[gender]!;

  return (
    <div className="gender-finishers bg-white dark:bg-stone-900">
      {Object.entries(genderResults).map(([level, participants]) => (
        <div key={`finishers-${gender}-${level}`} className="level-finishers">
          <h4>
            <>
              {level === "0"
                ? `Overall ${GENDER_LABELS[gender]}`
                : `Masters ${level}+`}
            </>{" "}
            <CountBadge
              count={level === "0" ? total : participants.length}
              className={SECTION_BADGE_BG_SECONDARY}
            />
          </h4>
          <FullResultTable
            eventCode={eventCode}
            results={participants}
            runners={runners}
          />
        </div>
      ))}
    </div>
  );
}
