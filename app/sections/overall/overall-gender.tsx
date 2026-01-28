import React from "react";
import {
  GENDER_LABELS,
  getTotalFinishersForGender,
  type Partitioned,
} from "../../results/util";
import { Gender, type AugmentedRunnerRace } from "~/types";
import FullResultTable from "./full-result-table";

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
        <div key={`${gender}-${level}`}>
          <h4>
            {level === "0"
              ? `Overall ${GENDER_LABELS[gender]} (${total})`
              : `Masters ${level}+ (${participants.length})`}
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
