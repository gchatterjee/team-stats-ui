import React from "react";
import type { PersonalRecord } from "../highlights/types";
import type { Loadable } from "~/types";
import Section, { SECTION_BADGE_BG } from "../common";
import type { SectionProps } from "../props";
// import PersonalRecordsTable from "./table";
import CountBadge from "~/components/count-badge";
import Row from "./row";
import { parseTimeToSeconds } from "../highlights/utils";
import Table from "./table";

interface PersonalRecordsProps extends SectionProps {
  personalRecords: Loadable<PersonalRecord[]>;
}
export default function PersonalRecords({
  data,
  personalRecords,
}: PersonalRecordsProps) {
  let content;

  if (data === undefined) content = <p>Loading...</p>;
  else if (personalRecords === undefined) content = <p>Loading...</p>;
  else if (data === null) content = <p>Error loading personal records</p>;
  else if (personalRecords === null)
    content = <p>Error loading personal records</p>;
  else if (personalRecords.length === 0) return <></>;
  else {
    content = (
      <>
        <h2>
          Personal Records (with NYRR){" "}
          <CountBadge
            count={personalRecords.length}
            className={SECTION_BADGE_BG}
          />
        </h2>
        <Table
          rows={personalRecords.map((pr, index) => {
            const prTimeS = parseTimeToSeconds(pr.finisher.overallTime);
            const prevPrTimeS = parseTimeToSeconds(
              pr.fastestPreviousRace.actualTime,
            );
            return {
              index,
              firstName: pr.finisher.firstName,
              lastName: pr.finisher.lastName,
              prTimeS,
              prevPrTimeS,
              prevPrRaceName: pr.fastestPreviousRace.eventName,
              prevPrRaceDate: new Date(pr.fastestPreviousRace.startDateTime),
              improvementS: prevPrTimeS - prTimeS,
            };
          })}
          renderRow={Row}
        />
      </>
    );
  }

  return (
    <div id="personal-records">
      <Section>{content}</Section>
    </div>
  );
}
