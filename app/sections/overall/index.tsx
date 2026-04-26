import React from "react";
import { getMastersLevels } from "../../results/util";
import type { SectionProps } from "../props";
import Section, {
  getAlphabeticalSortFn,
  getNumericalSortFn,
  SECTION_BADGE_BG,
} from "../common";
import CountBadge from "~/components/count-badge";
import Table from "../../components/table";
import Row from "./row";

export default function OverallResults({ data }: SectionProps) {
  let content;
  if (data === undefined) content = <p>Loading...</p>;
  else if (data === null) content = <p>Error loading results</p>;
  else {
    const { results } = data.document;

    if (results.items.length === 0) return <></>;

    content = (
      <>
        <h2>
          Total Finishers{" "}
          <CountBadge
            count={results.items.length}
            className={SECTION_BADGE_BG}
          />
        </h2>

        <Table
          rows={results.items}
          renderRow={(runner, index) => <Row runner={runner} index={index} />}
          filter={[
            { labeler: (runner) => new Set([runner.gender]) },
            {
              labeler: (runner) =>
                new Set(
                  getMastersLevels(runner.age).map((n) =>
                    n === 0 ? "All Ages" : `${n}+`,
                  ),
                ),
            },
          ]}
          sort={[
            {
              label: "Overall Place",
              sortFn: getNumericalSortFn("overallPlace"),
            },
            { label: "Last Name", sortFn: getAlphabeticalSortFn("lastName") },
            { label: "First Name", sortFn: getAlphabeticalSortFn("firstName") },
          ]}
        />
      </>
    );
  }

  return (
    <div id="overall-results">
      <Section>{content}</Section>
    </div>
  );
}
