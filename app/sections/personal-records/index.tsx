import React from "react";
import type { PersonalRecord } from "../highlights/types";
import type { Loadable } from "~/types";
import Section, { SECTION_BADGE_BG } from "../common";
import type { SectionProps } from "../props";
import PersonalRecordsTable from "./table";
import CountBadge from "~/components/count-badge";

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
        <PersonalRecordsTable personalRecords={personalRecords} />
      </>
    );
  }

  return (
    <div id="personal-records">
      <Section>{content}</Section>
    </div>
  );
}
