import React from "react";
import { getOrdinal } from "~/results/util";

const SYMBOLS: Partial<Record<number, string>> = {
  1: "🥇",
  2: "🥈",
  3: "🥉",
};

interface PlaceProps {
  n: number;
  ordinal: boolean;
}
export default function Place({ n, ordinal = false }: PlaceProps) {
  return (
    <span className="place">
      {SYMBOLS[n] ? SYMBOLS[n] + " " : ""}
      {n}
      {ordinal ? getOrdinal(n) : ""}
    </span>
  );
}
