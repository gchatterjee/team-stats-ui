import React from "react";
import Table from "~/components/table";
import type { TeamRunner } from "~/types";
import type { ColDef } from "ag-grid-community";

interface RunnerIdTableProps {
  runners: TeamRunner[];
  columns: ColDef<TeamRunner>[];
}
export default function RunnerIdTable({
  runners,
  columns,
}: RunnerIdTableProps) {
  return <Table columnDefs={columns} rowData={runners} />;
}
