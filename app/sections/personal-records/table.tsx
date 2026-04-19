import React from "react";
import { SectionTable } from "~/components/section-rows";
import "./index.css";

interface SortParams<T> {
  index: number;
  sortFn: (a: T, b: T) => number;
  label: string;
}

interface TableProps<T> {
  rows: T[];
  renderRow: (row: T) => React.ReactNode;
  sort?: SortParams<T>[];
}
export default function Table<T>({ rows, renderRow }: TableProps<T>) {
  // const [sortParam, setSortParam] = React.useState<SortParams>();
  const [data] = React.useState(rows);

  // useEffect(() => {
  //   if (sortParam) {
  //     const sortedData = [...data].sort(sortParam.sortFn);
  //     setData(sortedData);
  //   }
  // }, [sortParam]);

  return (
    <div>
      {/* {sort && (
        <div style={{ display: "flex", gap: "1em" }}>
          {sort.map((param) => (
            <button key={param.index} onClick={() => setSortParam(param)}>
              Sort by {param.label}
            </button>
          ))}
        </div>
      )} */}
      <SectionTable>
        {data.map((row, index) => (
          <div key={index}>{renderRow(row)}</div>
        ))}
      </SectionTable>
    </div>
  );
}
