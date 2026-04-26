import React from "react";
import type { Loadable } from "~/types";
import type { SectionProps } from "../props";
import RunnerIdSection from "../runner-id";
import Table from "./table";

interface TopTenFinishersProps extends SectionProps {
  finisherIds: Loadable<number[]>;
}
export default function TopTenFinishers({
  data,
  finisherIds,
}: TopTenFinishersProps) {
  return (
    <RunnerIdSection
      finisherIds={finisherIds}
      title="Top Ten Finishers"
      data={data}
      renderData={Table}
    />
  );
}
