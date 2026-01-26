import React from "react";
import { formatTime, GENDER_LABELS } from "./util";
import AwardTable from "./award-table";
import Place from "~/components/place";
import type {
  AugmentedRunnerRace,
  AugmentedTeamAward,
  Loadable,
} from "~/types";

interface AwardsProps {
  awards: Loadable<AugmentedTeamAward[]>;
  runners: Loadable<Record<number, AugmentedRunnerRace[]>>;
}
export default function Awards({ awards }: AwardsProps) {
  if (awards === undefined)
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  if (awards === null)
    return (
      <section>
        <p>Error loading awards</p>
      </section>
    );
  if (awards.length === 0) return <></>;

  return (
    <section>
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
    </section>
  );
}
