import React from "react";
import { getOrdinal } from "~/results/util";

interface PlaceProps {
  n: number;
  ordinal: boolean;
}
export default function Place({ n, ordinal = false }: PlaceProps) {
  return (
    <span className="place">
      {n}
      {ordinal ? getOrdinal(n) : ""}
    </span>
  );
}
