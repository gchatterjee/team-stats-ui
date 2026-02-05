import React from "react";
import "./index.css";
import c from "classnames";

interface CountBadgeProps {
  count: number;
  className?: string;
}
export default function CountBadge({ count, className }: CountBadgeProps) {
  return <div className={c("count-badge", className)}>{count}</div>;
}
