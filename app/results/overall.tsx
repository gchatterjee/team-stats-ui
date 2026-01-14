import React from "react";
import {
  Gender,
  type ApiResponse,
  type TeamRunner,
} from "~/nyrr-api-client/types";
import { getMastersLevels, type Partitioned } from "./util";
import OverallGender from "./overall-gender";
import type { Loadable } from "~/types";

interface OverallResultsProps {
  results: Loadable<ApiResponse<TeamRunner>>;
}

export default function OverallResults({ results }: OverallResultsProps) {
  if (results === undefined)
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  if (results === null)
    return (
      <section>
        <p>Error loading results</p>
      </section>
    );
  if (results.items.length === 0) return <></>;

  const partitioned: Partitioned = {};

  results.items.forEach((result) => {
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
      <OverallGender results={partitioned} gender={Gender.Women} />
      <OverallGender results={partitioned} gender={Gender.Men} />
      <OverallGender results={partitioned} gender={Gender.NonBinary} />
    </section>
  );
}
