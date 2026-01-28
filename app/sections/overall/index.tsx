import React from "react";
import { getMastersLevels, type Partitioned } from "../../results/util";
import OverallGender from "./overall-gender";
import { GENDERS } from "~/nyrr-api-client/client";
import type { SectionProps } from "../props";
import Section from "../common";

export default function OverallResults({ data }: SectionProps) {
  let content;
  if (data === undefined) content = <p>Loading...</p>;
  else if (data === null) content = <p>Error loading results</p>;
  else {
    const { results, runners } = data.document;

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

    content = (
      <>
        <h2>Total Finishers ({results.items.length})</h2>
        {GENDERS.map((gender) => (
          <OverallGender
            key={gender}
            eventCode={data.document.event.eventCode}
            results={partitioned}
            gender={gender}
            runners={runners}
          />
        ))}
      </>
    );
  }

  return (
    <div id="overall-results">
      <Section>{content}</Section>
    </div>
  );
}
