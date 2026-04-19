import React from "react";
import Row from "./row";
import type { TeamRunner } from "~/types";
import { SectionTable } from "~/components/section-rows";
import "./index.css";

interface Props {
  runners: TeamRunner[];
}
export default function Table({ runners }: Props) {
  return (
    <SectionTable>
      {runners.map((runner, index) => (
        <Row key={runner.runnerId} runner={runner} index={index} />
      ))}
    </SectionTable>
  );
}
