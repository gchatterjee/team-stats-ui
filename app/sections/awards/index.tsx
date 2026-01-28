import React from "react";
import { formatTime, GENDER_LABELS } from "../../results/util";
import AwardTable from "./award-table";
import Place from "~/components/place";
import type { SectionProps } from "../props";
import Section from "../common";

export default function Awards({ data }: SectionProps) {
  let content;
  if (data === undefined) content = <p>Loading...</p>;
  else if (data === null) content = <p>Error loading awards</p>;
  else {
    const { awards } = data.document;

    if (awards.length === 0) return <></>;
    else
      content = (
        <>
          <h2>Awards</h2>
          {awards.map((award) => {
            const title =
              award.minimumAge === 0
                ? `Open Class ${GENDER_LABELS[award.teamGender]}`
                : `Master's ${GENDER_LABELS[award.teamGender]} ${award.minimumAge}+`;
            return (
              <div
                key={`award-${award.teamCode}-${award.teamGender}-${award.minimumAge}`}
              >
                <h3>{title}</h3>
                {formatTime(award.summaryTime)} -{" "}
                <Place n={award.teamOrder} ordinal={true} /> Place
                <AwardTable runners={award.runners.items} />
              </div>
            );
          })}
        </>
      );
  }

  return (
    <div id="awards">
      <Section>{content}</Section>
    </div>
  );
}
