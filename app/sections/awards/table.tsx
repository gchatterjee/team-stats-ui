import React from "react";
import { type ColDef } from "ag-grid-community";
import { formatTime } from "../../results/util";
import type { TeamAwardRunner } from "~/types";
import Table from "~/components/table";

const columns: ColDef<TeamAwardRunner>[] = [
  { headerName: "First Name", field: "firstName" },
  { headerName: "Last Name", field: "lastName" },
  {
    headerName: "Finish Time",
    field: "finishTime",
    valueFormatter: (params) => formatTime(params.value),
  },
];

interface AwardTableProps {
  runners: TeamAwardRunner[];
}
export default function AwardTable({ runners }: AwardTableProps) {
  return <Table rowData={runners} columnDefs={columns} />;
}
