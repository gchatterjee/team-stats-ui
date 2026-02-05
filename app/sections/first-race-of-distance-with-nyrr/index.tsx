import React from "react";
import type { Loadable, TeamRunner } from "~/types";
import type { SectionProps } from "../props";
import RunnerIdSection from "../runner-id";
import type { ColDef } from "ag-grid-community";

interface FirstRaceOfDistanceWithNyrrProps extends SectionProps {
  finisherIds: Loadable<number[]>;
}
export default function FirstRaceOfDistanceWithNyrr({
  data,
  finisherIds,
}: FirstRaceOfDistanceWithNyrrProps) {
  const columns: ColDef<TeamRunner>[] = [
    { headerName: "First Name", field: "firstName" },
    { headerName: "Last Name", field: "lastName" },
  ];

  return (
    <RunnerIdSection
      finisherIds={finisherIds}
      title={`First ${data?.document.event.distanceUnitCode} With NYRR`}
      columns={columns}
      data={data}
    />
  );
}
