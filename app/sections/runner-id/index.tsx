import React from "react";
import type { Loadable, TeamRunner } from "~/types";
import Section, { SECTION_BADGE_BG } from "../common";
import type { SectionProps } from "../props";
import CountBadge from "~/components/count-badge";

export const kebabCase = (str: string): string =>
  str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();

interface RunnerIdSectionProps extends SectionProps {
  finisherIds: Loadable<number[]>;
  title: string;
  renderData: ({ runners }: { runners: TeamRunner[] }) => React.ReactNode;
}
export default function RunnerIdSection({
  data,
  finisherIds,
  title,
  renderData,
}: RunnerIdSectionProps) {
  let content;

  if (data === undefined) content = <p>Loading...</p>;
  else if (finisherIds === undefined) content = <p>Loading...</p>;
  else if (data === null) content = <p>Error loading {title}</p>;
  else if (finisherIds === null) content = <p>Error loading {title}</p>;
  else if (finisherIds.length === 0) return <></>;
  else {
    const { results } = data.document;
    const runners: TeamRunner[] = finisherIds
      .map((id) => results.items.find((runner) => runner.runnerId === id))
      .filter((x) => x !== undefined) as TeamRunner[];
    content = (
      <>
        <h2>
          {title}{" "}
          <CountBadge count={finisherIds.length} className={SECTION_BADGE_BG} />
        </h2>
        {renderData({ runners })}
      </>
    );
  }

  return (
    <div id={kebabCase(title)}>
      <Section>{content}</Section>
    </div>
  );
}
