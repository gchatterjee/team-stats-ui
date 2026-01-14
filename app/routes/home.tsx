import React from "react";
import { Welcome } from "../welcome/welcome";

export function meta() {
  return [
    { title: "Team Stats | North Brooklyn Runners" },
    {
      name: "description",
      content: "The next iteration of the Team Stats emails",
    },
  ];
}

export default function Home() {
  return <Welcome />;
}
