import React from "react";
import { AgGridReact } from "ag-grid-react";
import { type ColDef } from "ag-grid-community";

export const LARGE_DEFINITION = 12;

interface TableProps<T> {
  rowData: T[];
  columnDefs: ColDef<T>[];
}
export default function Table<T>({ rowData, columnDefs }: TableProps<T>) {
  const isLarge = rowData.length > LARGE_DEFINITION;
  return (
    <div className={isLarge ? "table-container-large" : "table-container"}>
      <AgGridReact
        tooltipShowDelay={0}
        rowData={rowData}
        columnDefs={columnDefs}
        autoSizeStrategy={{ type: "fitCellContents" }}
        domLayout={isLarge ? "normal" : "autoHeight"}
      />
    </div>
  );
}
