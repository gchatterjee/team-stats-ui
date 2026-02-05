import React from "react";
import type { SectionProps } from "../props";
// import Section from "../common";
import type { PersonalRecord } from "./types";
import type { Loadable } from "~/types";

interface HighlightsProps extends SectionProps {
  nyrrPrSetters: Loadable<PersonalRecord[]>;
  firstTimeWithNBR: Loadable<number[]>;
  topTenFinishers: Loadable<number[]>;
  firstRaceOfDistanceWithNyrr: Loadable<number[]>;
}
export default function Highlights({
  nyrrPrSetters,
  firstTimeWithNBR,
  topTenFinishers,
  firstRaceOfDistanceWithNyrr,
  data,
}: HighlightsProps) {
  let content;

  if (data === undefined) content = <p>Loading...</p>;
  else if (data === null) content = <p>Error loading highlights</p>;
  else if (nyrrPrSetters === undefined) content = <p>Loading...</p>;
  else if (nyrrPrSetters === null) content = <p>Error loading highlights</p>;
  else if (firstTimeWithNBR === undefined) content = <p>Loading...</p>;
  else if (firstTimeWithNBR === null) content = <p>Error loading highlights</p>;
  else if (firstRaceOfDistanceWithNyrr === undefined)
    content = <p>Loading...</p>;
  else if (firstRaceOfDistanceWithNyrr === null)
    content = <p>Error loading highlights</p>;
  else if (topTenFinishers === undefined) content = <p>Loading...</p>;
  else if (topTenFinishers === null) content = <p>Error loading highlights</p>;
  else
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    content = (
      <div>
        <pre>
          {`${JSON.stringify(
            { nyrrPrSetters, firstTimeWithNBR, topTenFinishers },
            undefined,
            2,
          )}`.slice(0, 1000)}
          ...
        </pre>
      </div>
    );

  // return (
  //   <div className="highlights">
  //     <Section>{content}</Section>
  //   </div>
  // );

  return <></>;
}
