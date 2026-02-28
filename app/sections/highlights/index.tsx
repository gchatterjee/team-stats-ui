import React, { useEffect } from "react";
import type { SectionProps } from "../props";
import type { PersonalRecord } from "./types";
import type { Loadable } from "~/types";
import Highlight from "./highlight";
import { getElement, randomInt } from "./utils";

import "./highlight.css";
import "./gradient.css";
import Section from "../common";
import { Link } from "react-router";

export const enum HightlightType {
  NYRR_PR_SETTERS = "NyrrPrSetters",
  FIRST_TIME_WITH_NBR = "FirstTimeWithNBR",
  TOP_TEN_FINISHERS = "TopTenFinishers",
  FIRST_RACE_OF_DISTANCE_WITH_NYRR = "FirstRaceOfDistanceWithNyrr",
}

export const enum SectionIds {
  PERSONAL_RECORDS = "personal-records",
  FIRST_TIME_WITH_NBR = "first-race-with-nbr",
  TOP_TEN_FINISHERS = "top-ten-finishers",
  FIRST_RACE_OF_DISTANCE_WITH_NYRR = "first-distance-with-nyrr",
}

const LINK_MAP = {
  [HightlightType.NYRR_PR_SETTERS]: SectionIds.PERSONAL_RECORDS,
  [HightlightType.FIRST_TIME_WITH_NBR]: SectionIds.FIRST_TIME_WITH_NBR,
  [HightlightType.TOP_TEN_FINISHERS]: SectionIds.TOP_TEN_FINISHERS,
  [HightlightType.FIRST_RACE_OF_DISTANCE_WITH_NYRR]:
    SectionIds.FIRST_RACE_OF_DISTANCE_WITH_NYRR,
};

const highlightTypes = [
  HightlightType.NYRR_PR_SETTERS,
  HightlightType.FIRST_TIME_WITH_NBR,
  HightlightType.TOP_TEN_FINISHERS,
  HightlightType.FIRST_RACE_OF_DISTANCE_WITH_NYRR,
];

const GRADIENT_MAP = {
  [HightlightType.NYRR_PR_SETTERS]: "bg-gold-gradient",
  [HightlightType.FIRST_TIME_WITH_NBR]: "bg-blue-gradient",
  [HightlightType.TOP_TEN_FINISHERS]: "bg-purple-gradient",
  [HightlightType.FIRST_RACE_OF_DISTANCE_WITH_NYRR]: "bg-coral-gradient",
};

const REFRESH_MS = 10000;

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
  const [randomHighlights, setRandomHighlights] = React.useState<
    { highlight: PersonalRecord | number; type: HightlightType }[]
  >([]);

  useEffect(() => {
    const refresh = () => {
      if (
        nyrrPrSetters === undefined ||
        nyrrPrSetters === null ||
        firstTimeWithNBR === undefined ||
        firstTimeWithNBR === null ||
        topTenFinishers === undefined ||
        topTenFinishers === null ||
        firstRaceOfDistanceWithNyrr === undefined ||
        firstRaceOfDistanceWithNyrr === null
      )
        return;

      const highlights = [
        nyrrPrSetters,
        firstTimeWithNBR,
        topTenFinishers,
        firstRaceOfDistanceWithNyrr,
      ];
      const highlightCount = highlights.reduce(
        (count, highlight) => count + highlight.length,
        0,
      );

      const newRandomHighlights: {
        highlight: PersonalRecord | number;
        type: HightlightType;
      }[] = [];
      for (let i = 0; i < 3; i++) {
        const index = randomInt(highlightCount);
        const highlight = getElement<PersonalRecord | number>(
          highlights,
          index,
        );
        if (highlight.result !== undefined) {
          const highlightType = highlightTypes[highlight.index];
          newRandomHighlights.push({
            highlight: highlight.result,
            type: highlightType,
          });
        }
      }
      setRandomHighlights(newRandomHighlights);
    };
    refresh();
    const interval = setInterval(refresh, REFRESH_MS);
    return () => clearInterval(interval);
  }, [
    nyrrPrSetters,
    firstTimeWithNBR,
    topTenFinishers,
    firstRaceOfDistanceWithNyrr,
  ]);

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
  else {
    return (
      <section className="highlights">
        <div className="highlights-list" id="highlights">
          {randomHighlights.map(({ highlight, type }, index) => (
            <Link
              to={`#${LINK_MAP[type]}`}
              key={index}
              className={`highlight-link ${GRADIENT_MAP[type]}`}
            >
              <Highlight highlight={highlight} type={type} data={data} />
            </Link>
          ))}
        </div>
      </section>
    );
  }

  return <Section>{content}</Section>;
}
