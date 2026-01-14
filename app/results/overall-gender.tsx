import React from "react";
import {
  GENDER_LABELS,
  getTotalFinishersForGender,
  type Partitioned,
} from "./util";
import { Gender } from "~/nyrr-api-client/types";
import FullResultTable from "./full-result-table";

interface OverallGenderProps {
  results: Partitioned;
  gender: Gender;
}
export default function OverallGender({ results, gender }: OverallGenderProps) {
  const total = getTotalFinishersForGender(gender, results);

  if (total === 0) return <></>;

  const genderResults = results[gender]!;

  return (
    <div className="gender-finishers">
      {Object.entries(genderResults).map(([level, runners]) => (
        <div key={`${gender}-${level}`}>
          <h4>
            {level === "0"
              ? `Overall ${GENDER_LABELS[gender]} (${total})`
              : `Masters ${level}+ (${runners.length})`}
          </h4>
          <FullResultTable results={runners} />
        </div>
      ))}
    </div>
  );
}
