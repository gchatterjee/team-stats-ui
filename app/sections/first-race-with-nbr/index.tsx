import React from "react";
import type { Loadable } from "~/types";
import type { SectionProps } from "../props";
import RunnerIdSection from "../runner-id";
import RunnerIdChips from "../runner-id/chips";

interface FirstRaceWithNBRProps extends SectionProps {
  finisherIds: Loadable<number[]>;
}
export default function FirstRaceWithNBR({
  data,
  finisherIds,
}: FirstRaceWithNBRProps) {
  return (
    <RunnerIdSection
      finisherIds={finisherIds}
      title="First Race With NBR"
      data={data}
      renderData={RunnerIdChips}
    />
  );
}
