import React, { useEffect } from "react";
import { SectionTable } from "~/components/section-rows";
import { CONTROL, CONTROL_SELECTED } from "../../sections/common";
import c from "classnames";
import "./index.css";

const enum SortState {
  DESC,
  ASC,
}

interface SortParams<T> {
  sortFn: (asc: boolean) => (a: T, b: T) => number;
  label: string;
}

interface FilterParams<T> {
  labeler: (item: T) => Set<string>;
}

interface SortDirectionProps<T> {
  state: SortState;
  sortParam: SortParams<T>;
  label: string;
}
function SortDirection<T>({ state, sortParam, label }: SortDirectionProps<T>) {
  let text = "▾";
  const classNames = ["tbl-sort-arrow"];
  if (sortParam.label !== label) classNames.push("tbl-sort-arrow-hidden");
  else if (state === SortState.DESC) text = "▾";
  else /* if (state === SortState.ASC) */ text = "▴";
  return <span className={c(classNames)}>{text}</span>;
}

const toggleSortState = (old: SortState) => {
  if (old === SortState.DESC) return SortState.ASC;
  else /* if (old === SortState.ASC) */ return SortState.DESC;
};

const getAllFilterLabels = <T,>({ labeler }: FilterParams<T>, items: T[]) => {
  const result = new Set<string>();
  items.forEach((item) => {
    const labels = labeler(item);
    labels.forEach((label) => result.add(label));
  });
  return result;
};

interface TableProps<T> {
  rows: T[];
  renderRow: (row: T, index: number) => React.ReactNode;
  sort?: SortParams<T>[];
  filter?: FilterParams<T>[];
}
export default function Table<T>({
  rows,
  renderRow,
  sort,
  filter,
}: TableProps<T>) {
  const [data, setData] = React.useState(rows);

  const [[sortParam, sortState], setSort] = React.useState<
    [SortParams<T> | null, SortState]
  >([sort?.length ? sort[0] : null, SortState.DESC]);

  useEffect(() => {
    if (sortParam) {
      setData((old) =>
        [...old].sort(sortParam.sortFn(sortState === SortState.ASC)),
      );
    }
  }, [sortParam, sortState]);

  const [filterGroups, setFilterGroups] = React.useState<
    [string, boolean][][] | undefined
  >(
    filter?.map((params) =>
      [...getAllFilterLabels(params, rows)].map((label): [string, boolean] => [
        label,
        true,
      ]),
    ),
  );

  useEffect(() => {
    if (filterGroups) {
      let result = rows;
      filterGroups.forEach((group, i) => {
        const { labeler } = filter![i];
        result = result.filter((row) =>
          group.reduce((acc, [label, isEnabled]) => {
            return acc || (isEnabled && labeler(row).has(label));
          }, false),
        );
      });
      if (sortParam) {
        const sortedData = result.sort(
          sortParam.sortFn(sortState === SortState.ASC),
        );
        setData(sortedData);
      } else setData(result);
    }
  }, [filterGroups]);

  return (
    <>
      {filter && (
        <div className="tbl-control">
          <div className="tbl-control-title">Filter By</div>
          {filterGroups?.map((group, i) => (
            <div key={i} className="tbl-filter-group">
              {group.map(([label, toggle], j) => (
                <button
                  key={j}
                  className={c(
                    "tbl-control-element",
                    "tbl-filter-element",
                    toggle ? CONTROL_SELECTED : CONTROL,
                  )}
                  onClick={() =>
                    setFilterGroups((old) => {
                      if (!old) return old;
                      const result = [...old];
                      result[i][j] = [label, !toggle];
                      return result;
                    })
                  }
                >
                  {label}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
      {sort && (
        <div className="tbl-control">
          <div className="tbl-control-title">Sort By</div>
          {sort.map((param, i) => (
            <button
              key={i}
              onClick={() => {
                setSort(([oldParam, oldState]) => [
                  param,
                  oldParam?.label === param.label
                    ? toggleSortState(oldState)
                    : SortState.DESC,
                ]);
              }}
              className={c(
                "tbl-control-element",
                "tbl-sort-element",
                sortParam?.label === param.label ? CONTROL_SELECTED : CONTROL,
              )}
            >
              {param.label}{" "}
              <SortDirection
                state={sortState}
                label={param.label}
                sortParam={sortParam!} /* this will not be null if `sort` has *
                 * length more than 0                                         */
              />
            </button>
          ))}
        </div>
      )}
      <SectionTable>
        {data.map((row, index) => (
          <div key={index}>{renderRow(row, index)}</div>
        ))}
      </SectionTable>
    </>
  );
}
