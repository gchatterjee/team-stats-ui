import React from "react";
import type { Loadable, TeamRunner } from "~/types";
import type { SectionProps } from "../props";
import RunnerIdSection from "../runner-id";
import { PlaceCellRenderer } from "../overall/table";
import type { ColDef } from "ag-grid-community";

interface TopTenFinishersProps extends SectionProps {
  finisherIds: Loadable<number[]>;
}
export default function TopTenFinishers({
  data,
  finisherIds,
}: TopTenFinishersProps) {
  const columns: ColDef<TeamRunner>[] = [
    {
      headerName: "Age Group Place",
      field: "ageGroupPlace",
      cellRenderer: PlaceCellRenderer,
    },
    { headerName: "First Name", field: "firstName" },
    { headerName: "Last Name", field: "lastName" },
    { headerName: "Age", field: "age" },
    { headerName: "Gender", field: "gender" },
    { headerName: "Overall Time", field: "overallTime" },
  ];

  return (
    <RunnerIdSection
      finisherIds={finisherIds}
      title="Top Ten Finishers"
      columns={columns}
      data={data}
    />
  );
}
