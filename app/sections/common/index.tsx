import React, { type PropsWithChildren } from "react";

export default function Section({ children }: PropsWithChildren) {
  return (
    <section className="bg-stone-200 dark:bg-stone-800">{children}</section>
  );
}
