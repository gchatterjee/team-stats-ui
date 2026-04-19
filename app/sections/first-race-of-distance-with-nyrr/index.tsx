import React from "react";
import type { Loadable } from "~/types";
import type { SectionProps } from "../props";
import RunnerIdSection from "../runner-id";
import RunnerIdChips from "../runner-id/chips";

interface FirstRaceOfDistanceWithNyrrProps extends SectionProps {
  finisherIds: Loadable<number[]>;
}
export default function FirstRaceOfDistanceWithNyrr({
  data,
  finisherIds,
}: FirstRaceOfDistanceWithNyrrProps) {
  return (
    <RunnerIdSection
      finisherIds={finisherIds}
      title={`First ${data?.document.event.distanceName} With NYRR`}
      data={data}
      renderData={RunnerIdChips}
    />
  );
}
