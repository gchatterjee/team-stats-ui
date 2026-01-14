import React from "react";
import { AgGridReact } from "ag-grid-react";
import { type ColDef } from "ag-grid-community";
import type { TeamRunner } from "~/nyrr-api-client/types";
import Place from "~/components/place";

const PlaceCellRenderer = (props: { value: number }) => {
  return <Place n={props.value} ordinal={false} />;
};
const columns: ColDef<TeamRunner>[] = [
  {
    headerName: "Place Overall",
    field: "overallPlace",
    cellRenderer: PlaceCellRenderer,
  },
  {
    headerName: "Place in Gender",
    field: "genderPlace",
    cellRenderer: PlaceCellRenderer,
  },
  {
    headerName: "Place in Age Group",
    field: "ageGroupPlace",
    cellRenderer: PlaceCellRenderer,
  },
  { headerName: "First Name", field: "firstName" },
  { headerName: "Last Name", field: "lastName" },
  { headerName: "Gender", field: "gender" },
  { headerName: "Pace", field: "pace" },
  { headerName: "Overall Time", field: "overallTime" },
  { headerName: "Age", field: "age" },
  { headerName: "Place in Gender (Age Graded)", field: "ageGradePlace" },
  { headerName: "Percent (Age Graded)", field: "ageGradePercent" },
  { headerName: "City", field: "city" },
  { headerName: "State", field: "stateProvince" },
  { headerName: "Country", field: "countryCode" },
];

interface FullResultTableProps {
  results: TeamRunner[];
}

export default function FullResultTable({ results }: FullResultTableProps) {
  return (
    <div>
      <AgGridReact
        rowData={results}
        columnDefs={columns}
        autoSizeStrategy={{ type: "fitCellContents" }}
        domLayout="autoHeight"
      />
    </div>
  );
}
