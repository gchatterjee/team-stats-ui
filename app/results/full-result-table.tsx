import React from "react";
import { AgGridReact } from "ag-grid-react";
import { type ColDef } from "ag-grid-community";
import Place from "~/components/place";
import type { AugmentedRunnerRace, TeamRunner } from "~/types";
import { isFirstRaceWithTeam } from "./util";
import { TEAM_CODE } from "~/constants";

const PlaceCellRenderer = (props: { value: number }) => (
  <Place n={props.value} ordinal={false} />
);
const WelcomeCellRenderer = (props: { value: boolean }) =>
  props.value ? <span className="welcome-symbol">👋</span> : <></>;
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
  eventCode: string;
  results: TeamRunner[];
  runners: Record<number, AugmentedRunnerRace[]>;
}

export default function FullResultTable({
  eventCode,
  results,
  runners,
}: FullResultTableProps) {
  const firstNbrRaceColDef: ColDef<TeamRunner> = {
    valueGetter: (params) => {
      const runnerId = params.data?.runnerId;
      if (runnerId === undefined) return false;
      const runnerRaces = runners[runnerId];
      return isFirstRaceWithTeam(eventCode, runnerRaces, TEAM_CODE);
    },
    cellRenderer: WelcomeCellRenderer,
    tooltipValueGetter: (params) =>
      params.value ? "First race with NBR!" : "",
  };

  const isLarge = results.length > 12;

  return (
    <div className={isLarge ? "table-container-large" : "table-container"}>
      <AgGridReact
        tooltipShowDelay={0}
        rowData={results}
        columnDefs={[firstNbrRaceColDef, ...columns]}
        autoSizeStrategy={{ type: "fitCellContents" }}
        domLayout={isLarge ? "normal" : "autoHeight"}
      />
    </div>
  );
}
