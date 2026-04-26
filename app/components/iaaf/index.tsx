import React from "react";
import CODES from "./codes";

interface Props {
  code: string;
}
export function Iaaf({ code }: Props) {
  const emoji = CODES[code];
  return emoji ? <>{emoji}</> : <></>;
}
