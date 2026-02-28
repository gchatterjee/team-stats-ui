import React from "react";
import type { PersonalRecord } from "./types";
import { HightlightType } from ".";
import { Gender, type Document } from "~/types";
import "./gradient.css";

interface HighlightProps {
  highlight: PersonalRecord | number;
  type: HightlightType;
  data: Document;
}

const ordinal = (n: number): string => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

const pronoun = (gender: Gender): string => {
  switch (gender) {
    case Gender.Men:
      return "his";
    case Gender.Women:
      return "her";
    default:
      return "their";
  }
};

const name = (person: { firstName?: string; lastName?: string }): string => {
  return [person.firstName, person.lastName].filter(Boolean).join(" ");
};

const getDistance = (distanceName: string): string => {
  if (distanceName.endsWith(" miles"))
    return `${distanceName.slice(0, -" miles".length)}M`;
  else if (distanceName.endsWith(" kilometers"))
    return `${distanceName.slice(0, -" kilometers".length)}k`;
  else return distanceName.toLowerCase();
};

export default function Highlight({ highlight, type, data }: HighlightProps) {
  if (typeof highlight === "number") {
    const runner = data.document.results.items.find(
      (item) => item.runnerId === highlight,
    );
    const runnerName = runner ? name(runner) : "Unknown Runner";
    let sentence = <></>;

    if (!runner) sentence = <></>;
    else if (type === HightlightType.FIRST_TIME_WITH_NBR)
      sentence = (
        <>
          This was <b>{runnerName}</b>&apos;s first race with NBR!
        </>
      );
    else if (type === HightlightType.FIRST_RACE_OF_DISTANCE_WITH_NYRR)
      sentence = (
        <>
          This race was <b>{runnerName}</b>&apos;s first{" "}
          <b>{getDistance(data.document.event.distanceName)}</b> with NYRR!
        </>
      );
    else if (type === HightlightType.TOP_TEN_FINISHERS)
      sentence = (
        <>
          <b>{runnerName}</b> finished{" "}
          <b>{ordinal(runner.ageGroupPlace || 0)}</b> in{" "}
          {pronoun(runner.gender)} age group!
        </>
      );
    return (
      <div className="highlight">
        <p>{sentence}</p>
      </div>
    );
  } else {
    const { finisher, fastestPreviousRace } = highlight;
    return (
      <div className="highlight">
        <p className="line-clamp-3">
          This was <b>{name(finisher)}</b>
          &apos;s fastest NYRR{" "}
          <b>{getDistance(data.document.event.distanceName)}</b> time!
          Previously, it was the <b>{fastestPreviousRace.eventName}</b>.
        </p>
      </div>
    );
  }
}
