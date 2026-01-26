import React from "react";
import { getMastersLevels, type Partitioned } from "./util";
import OverallGender from "./overall-gender";
import {
  type ApiResponse,
  type AugmentedRunnerRace,
  type Loadable,
  type TeamRunner,
} from "~/types";
import { GENDERS } from "~/nyrr-api-client/client";

interface OverallResultsProps {
  eventCode: string;
  results: Loadable<ApiResponse<TeamRunner>>;
  runners: Loadable<Record<number, AugmentedRunnerRace[]>>;
}

export default function OverallResults({
  eventCode,
  results,
  runners,
}: OverallResultsProps) {
  if (results === undefined || runners === undefined)
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  if (results === null || runners === null)
    return (
      <section>
        <p>Error loading results</p>
      </section>
    );
  if (results.items.length === 0) return <></>;

  const partitioned: Partitioned = {};

  Object.values(results.items).forEach((result) => {
    if (!partitioned[result.gender]) partitioned[result.gender] = {};
    const levels = getMastersLevels(result.age);
    levels.forEach((level) => {
      if (!partitioned[result.gender]![level])
        partitioned[result.gender]![level] = [];
      partitioned[result.gender]![level].push(result);
    });
  });

  return (
    <section>
      <h2>Total Finishers ({results.items.length})</h2>
      {GENDERS.map((gender) => (
        <OverallGender
          key={gender}
          eventCode={eventCode}
          results={partitioned}
          gender={gender}
          runners={runners}
        />
      ))}
    </section>
  );
}
