import React from "react";
import { AgGridReact } from "ag-grid-react";
import { type ColDef } from "ag-grid-community";
import { formatTime } from "./util";
import type { TeamAwardRunner } from "~/types";

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
  const isLarge = runners.length > 12;

  return (
    <div className={isLarge ? "table-container-large" : "table-container"}>
      <AgGridReact
        rowData={runners}
        columnDefs={columns}
        autoSizeStrategy={{ type: "fitCellContents" }}
        domLayout={isLarge ? "normal" : "autoHeight"}
      />
    </div>
  );
}
