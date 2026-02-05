import React from "react";
import type { PersonalRecord } from "../highlights/types";
import { type ColDef } from "ag-grid-community";
import Table from "~/components/table";

const getSecondsFromTimeString = (timeStr: string): number => {
  const parts = timeStr.split(":").map(Number);
  let seconds = 0;
  if (parts.length === 3) {
    // HH:MM:SS
    seconds += parts[0] * 3600; // hours
    seconds += parts[1] * 60; // minutes
    seconds += parts[2]; // seconds
  } else if (parts.length === 2) {
    // MM:SS
    seconds += parts[0] * 60; // minutes
    seconds += parts[1]; // seconds
  } else if (parts.length === 1) {
    // SS
    seconds += parts[0]; // seconds
  }
  return seconds;
};

const getElapsedTimeStringFromSeconds = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [
    hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0"),
  ].join(":");
};

const columns: ColDef<PersonalRecord>[] = [
  { headerName: "First Name", field: "finisher.firstName" },
  { headerName: "Last Name", field: "finisher.lastName" },
  { headerName: "PR Time", field: "finisher.overallTime" },
  {
    headerName: "Previous Fastest Time",
    field: "fastestPreviousRace.actualTime",
  },
  {
    headerName: "Previous Fastest Race",
    field: "fastestPreviousRace.eventName",
  },
  {
    headerName: "Date of Previous Fastest Race",
    field: "fastestPreviousRace.startDateTime",
    valueFormatter: (params) => {
      const date = new Date(params.value);
      return date.toLocaleDateString();
    },
  },
  {
    headerName: "Improvement",
    valueGetter: (params) => {
      const prTime = params.data?.finisher?.overallTime;
      const previousTime = params.data?.fastestPreviousRace?.actualTime;
      if (prTime && previousTime) {
        const prSeconds = getSecondsFromTimeString(prTime);
        const previousSeconds = getSecondsFromTimeString(previousTime);
        const improvementSeconds = previousSeconds - prSeconds;
        return improvementSeconds;
      }
      return 0;
    },
    valueFormatter: (params) => {
      const improvementSeconds = params.value as number;
      if (improvementSeconds > 0) {
        return getElapsedTimeStringFromSeconds(improvementSeconds);
      }
      return "N/A";
    },
  },
];

interface PersonalRecordsTableProps {
  personalRecords: PersonalRecord[];
}
export default function PersonalRecordsTable({
  personalRecords,
}: PersonalRecordsTableProps) {
  return <Table columnDefs={columns} rowData={personalRecords} />;
}
