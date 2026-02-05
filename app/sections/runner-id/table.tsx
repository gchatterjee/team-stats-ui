import React from "react";
import Table from "~/components/table";
import type { ApiResponse, TeamRunner } from "~/types";
import type { ColDef } from "ag-grid-community";

interface RunnerIdTableProps {
  results: ApiResponse<TeamRunner>;
  finisherIds: number[];
  columns: ColDef<TeamRunner>[];
}
export default function RunnerIdTable({
  results,
  finisherIds,
  columns,
}: RunnerIdTableProps) {
  const runners: TeamRunner[] = finisherIds
    .map((id) => results.items.find((runner) => runner.runnerId === id))
    .filter((x) => x !== undefined) as TeamRunner[];

  return <Table columnDefs={columns} rowData={runners} />;
}
