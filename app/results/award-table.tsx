import React from "react";
import { AgGridReact } from "ag-grid-react";
import { type ColDef } from "ag-grid-community";
import type { TeamAwardRunner } from "~/nyrr-api-client/types";
import { formatTime } from "./util";

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
  return (
    <div>
      <AgGridReact
        rowData={runners}
        columnDefs={columns}
        autoSizeStrategy={{ type: "fitCellContents" }}
        domLayout="autoHeight"
      />
    </div>
  );
}
